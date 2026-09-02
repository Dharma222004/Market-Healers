import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { fetchLivePreciousMetals } from "@/lib/market/yahooFinanceNative";

const DATA_FILE = path.join(process.cwd(), "public", "data", "precious_metals.json");

let cachedMetalsData: any = null;
let inFlightMetalsPromise: Promise<any> | null = null;

async function refreshMetalsData(): Promise<any> {
  if (inFlightMetalsPromise) {
    return inFlightMetalsPromise;
  }

  inFlightMetalsPromise = (async () => {
    try {
      const liveData = await fetchLivePreciousMetals();
      if (liveData && liveData.gold && liveData.silver) {
        cachedMetalsData = liveData;
        try {
          fs.writeFileSync(DATA_FILE, JSON.stringify(liveData, null, 2), "utf-8");
        } catch {
          // Ignored on read-only serverless runtimes
        }
        return liveData;
      }
    } catch (scriptErr) {
      console.warn("Live metals fetch warning:", scriptErr);
    } finally {
      inFlightMetalsPromise = null;
    }
    return null;
  })();

  return inFlightMetalsPromise;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get("refresh") === "true";

  try {
    let metalsData: any = cachedMetalsData;

    // 1. Check if cached file exists if memory is empty
    if (!metalsData && fs.existsSync(DATA_FILE)) {
      try {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        metalsData = JSON.parse(fileContent);
        cachedMetalsData = metalsData;
      } catch (err) {
        console.warn("Failed to parse cached precious metals data:", err);
      }
    }

    // 2. Gold & Silver trade 24 hours round the clock
    // Check if cached data is older than 15 minutes
    const now = Date.now();
    const cachedTime = metalsData?.updated_at ? new Date(metalsData.updated_at).getTime() : 0;
    const elapsedMs = now - cachedTime;
    const isStale = elapsedMs >= 15 * 60 * 1000;

    if (!metalsData || forceRefresh || isStale) {
      const refreshedData = await refreshMetalsData();
      if (refreshedData) {
        metalsData = refreshedData;
      }
    }

    // 3. Fallback if still empty
    if (!metalsData) {
      metalsData = {
        updated_at: new Date().toISOString(),
        gold: {
          name: "Gold",
          symbol: "GC=F",
          price_usd_per_troy_ounce: 2740.5,
          price_inr_per_gram: 7450.0,
          price_inr_per_10g: 74500.0,
          change_percent: 0.45,
          usd_inr: 84.4,
          unit: "gram",
        },
        silver: {
          name: "Silver",
          symbol: "SI=F",
          price_usd_per_troy_ounce: 32.8,
          price_inr_per_gram: 89.2,
          price_inr_per_10g: 892.0,
          change_percent: 0.85,
          usd_inr: 84.4,
          unit: "gram",
        },
      };
    }

    const nextUpdateMs = (metalsData?.updated_at ? new Date(metalsData.updated_at).getTime() : now) + 15 * 60 * 1000;

    const responsePayload = {
      ...metalsData,
      trading_schedule: {
        type: "24_HOURS_COMMODITY",
        interval: "15m",
        status: "ACTIVE",
        next_update_at: new Date(nextUpdateMs).toISOString(),
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
    console.error(">>> ERROR in metals GET:", error);
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}

