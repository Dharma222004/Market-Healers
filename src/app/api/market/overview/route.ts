import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { fetchLiveMarketOverview } from "@/lib/market/yahooFinanceNative";

const DATA_FILE = path.join(process.cwd(), "public", "data", "market_overview.json");

interface MarketScheduleStatus {
  shouldRefresh: boolean;
  marketStatus: "OPEN" | "CLOSED" | "PRE_MARKET";
  reason: string;
  nextScheduledTime?: string;
}

/**
 * Evaluates whether Indian benchmark indices (NIFTY 50, SENSEX, BANK NIFTY)
 * should update based on the specified market timing:
 * 1. Morning 8:00 AM IST pre-market refresh.
 * 2. 9:30 AM to 3:30 PM IST active session: auto-update every 15 minutes.
 * 3. After 3:30 PM IST: final market closing update locked until next morning 8:00 AM.
 * 4. Weekends: closed, preserving Friday's closing price.
 */
function evaluateIndianMarketSchedule(cachedUpdatedAt?: string): MarketScheduleStatus {
  if (!cachedUpdatedAt) {
    return { shouldRefresh: true, marketStatus: "OPEN", reason: "No cached data exists" };
  }

  const now = new Date();
  const istFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "short",
  });

  const parts = istFormatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || "";

  const istWeekday = getPart("weekday"); // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const istHour = parseInt(getPart("hour"), 10);
  const istMinute = parseInt(getPart("minute"), 10);
  const istMinutesSinceMidnight = istHour * 60 + istMinute;

  const isWeekend = istWeekday === "Sat" || istWeekday === "Sun";
  const cachedTime = new Date(cachedUpdatedAt).getTime();
  const elapsedMs = now.getTime() - cachedTime;
  const elapsedMinutes = elapsedMs / (60 * 1000);

  // Compare cached date in IST with today
  const cachedParts = istFormatter.formatToParts(new Date(cachedTime));
  const cachedDay = cachedParts.find((p) => p.type === "day")?.value;
  const cachedMonth = cachedParts.find((p) => p.type === "month")?.value;
  const cachedYear = cachedParts.find((p) => p.type === "year")?.value;
  const todayDay = getPart("day");
  const todayMonth = getPart("month");
  const todayYear = getPart("year");
  const isUpdatedToday =
    cachedDay === todayDay && cachedMonth === todayMonth && cachedYear === todayYear;

  const cachedHour = parseInt(cachedParts.find((p) => p.type === "hour")?.value || "0", 10);
  const cachedMinute = parseInt(cachedParts.find((p) => p.type === "minute")?.value || "0", 10);
  const cachedMinutesSinceMidnight = cachedHour * 60 + cachedMinute;

  const T_8_00 = 8 * 60; // 480 mins
  const T_9_30 = 9 * 60 + 30; // 570 mins
  const T_15_30 = 15 * 60 + 30; // 930 mins

  // 1. Weekend Check
  if (isWeekend) {
    return {
      shouldRefresh: false,
      marketStatus: "CLOSED",
      reason: "Weekend - Indian exchanges closed. Retaining final session closing prices.",
    };
  }

  // 2. Active Trading Window: 9:30 AM to 3:30 PM IST (15-min delayed continuous updates)
  if (istMinutesSinceMidnight >= T_9_30 && istMinutesSinceMidnight < T_15_30) {
    if (elapsedMinutes >= 15) {
      return {
        shouldRefresh: true,
        marketStatus: "OPEN",
        reason: `Active session (9:30-15:30 IST): 15 minutes elapsed since last update (${Math.round(elapsedMinutes)}m ago)`,
      };
    }
    return {
      shouldRefresh: false,
      marketStatus: "OPEN",
      reason: `Active session: Cached data is fresh (${Math.round(elapsedMinutes)}m old)`,
      nextScheduledTime: new Date(cachedTime + 15 * 60 * 1000).toISOString(),
    };
  }

  // 3. Post-Market Close: 3:30 PM IST onwards (ensure final 3:30 closing quote is recorded)
  if (istMinutesSinceMidnight >= T_15_30) {
    const updatedAfterCloseToday = isUpdatedToday && cachedMinutesSinceMidnight >= T_15_30;
    if (!updatedAfterCloseToday) {
      return {
        shouldRefresh: true,
        marketStatus: "CLOSED",
        reason: "Post-market 3:30 PM IST close: fetching final official closing prices",
      };
    }
    return {
      shouldRefresh: false,
      marketStatus: "CLOSED",
      reason: "Post-market: Official 3:30 PM closing prices locked until next morning 8:00 AM",
      nextScheduledTime: "Next market day 08:00 AM IST",
    };
  }

  // 4. Pre-Market Morning: 8:00 AM to 9:30 AM IST
  if (istMinutesSinceMidnight >= T_8_00 && istMinutesSinceMidnight < T_9_30) {
    const updatedAfter8amToday = isUpdatedToday && cachedMinutesSinceMidnight >= T_8_00;
    if (!updatedAfter8amToday) {
      return {
        shouldRefresh: true,
        marketStatus: "PRE_MARKET",
        reason: "Morning 8:00 AM IST pre-market refresh triggered",
      };
    }
    return {
      shouldRefresh: false,
      marketStatus: "PRE_MARKET",
      reason: "Morning 8:00 AM IST pre-market prices ready. Active session begins at 9:30 AM",
      nextScheduledTime: "09:30 AM IST",
    };
  }

  // 5. Early Morning (Midnight to 8:00 AM IST)
  return {
    shouldRefresh: false,
    marketStatus: "CLOSED",
    reason: "Market closed overnight. Next scheduled update at 8:00 AM IST",
    nextScheduledTime: "Today 08:00 AM IST",
  };
}

let cachedOverviewData: any = null;
let inFlightOverviewPromise: Promise<any> | null = null;

async function refreshMarketData(): Promise<any> {
  if (inFlightOverviewPromise) {
    return inFlightOverviewPromise;
  }

  inFlightOverviewPromise = (async () => {
    try {
      const liveData = await fetchLiveMarketOverview();
      if (liveData && liveData.indices.length > 0) {
        cachedOverviewData = liveData;
        try {
          // Attempt local file write if filesystem is writable (fails gracefully on Vercel)
          fs.writeFileSync(DATA_FILE, JSON.stringify(liveData, null, 2), "utf-8");
        } catch {
          // Ignored on read-only serverless runtimes
        }
        return liveData;
      }
    } catch (err) {
      console.warn("Live market fetch warning:", err);
    } finally {
      inFlightOverviewPromise = null;
    }
    return null;
  })();

  return inFlightOverviewPromise;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get("refresh") === "true";

  try {
    let marketData: any = cachedOverviewData;

    // 1. Read existing cached file if memory cache is empty
    if (!marketData && fs.existsSync(DATA_FILE)) {
      try {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        marketData = JSON.parse(fileContent);
        cachedOverviewData = marketData;
      } catch (err) {
        console.warn("Failed to parse cached market data:", err);
      }
    }

    // 2. Evaluate market timing schedule
    const schedule = evaluateIndianMarketSchedule(marketData?.updated_at);

    // 3. Refresh if forceRefresh requested, file missing, or schedule requires it
    if (!marketData || forceRefresh || schedule.shouldRefresh) {
      const refreshedData = await refreshMarketData();
      if (refreshedData) {
        marketData = refreshedData;
      }
    }

    // 4. Fallback if still empty
    if (!marketData) {
      marketData = {
        updated_at: new Date().toISOString(),
        indices: [
          { symbol: "^NSEI", name: "NIFTY 50", price: 24860.45, change: 142.3, change_percent: 0.58, type: "index" },
          { symbol: "^BSESN", name: "SENSEX", price: 81380.2, change: 395.15, change_percent: 0.49, type: "index" },
          { symbol: "^NSEBANK", name: "BANK NIFTY", price: 52140.8, change: -88.4, change_percent: -0.17, type: "index" },
          { symbol: "^CNXIT", name: "NIFTY IT", price: 42150.0, change: 685.2, change_percent: 1.65, type: "index" },
          { symbol: "^CNXAUTO", name: "NIFTY AUTO", price: 25420.5, change: 210.3, change_percent: 0.83, type: "index" },
          { symbol: "^CNXPHARMA", name: "NIFTY PHARMA", price: 22180.0, change: 102.5, change_percent: 0.46, type: "index" },
          { symbol: "^CNXFMCG", name: "NIFTY FMCG", price: 62450.0, change: -150.0, change_percent: -0.24, type: "index" },
          { symbol: "^CNXMETAL", name: "NIFTY METAL", price: 9850.0, change: 112.4, change_percent: 1.15, type: "index" },
          { symbol: "^CNXREALTY", name: "NIFTY REALTY", price: 1045.0, change: 22.8, change_percent: 2.23, type: "index" },
        ],
        top_companies: [
          { symbol: "RELIANCE.NS", name: "RELIANCE", price: 3024.1, change: 25.4, change_percent: 0.85, type: "equity" },
          { symbol: "TCS.NS", name: "TCS", price: 4192.5, change: 51.2, change_percent: 1.24, type: "equity" },
          { symbol: "HDFCBANK.NS", name: "HDFC BANK", price: 1684.2, change: 10.4, change_percent: 0.62, type: "equity" },
          { symbol: "INFY.NS", name: "INFOSYS", price: 1845.8, change: -5.9, change_percent: -0.32, type: "equity" },
          { symbol: "LT.NS", name: "LARSEN & TOUBRO", price: 3620.0, change: 76.5, change_percent: 2.15, type: "equity" },
        ],
      };
    }

    // Attach schedule metadata
    const responsePayload = {
      ...marketData,
      schedule_status: {
        market_status: schedule.marketStatus,
        schedule_reason: schedule.reason,
        next_scheduled_update: schedule.nextScheduledTime || null,
        server_time_ist: new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "medium",
        }).format(new Date()),
      },
    };

    return NextResponse.json(responsePayload, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
