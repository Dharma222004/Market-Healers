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
        gold_24k: {
          name: "24K Gold",
          karat: "24K",
          purity: "99.9% Pure Gold",
          price_per_gram: 15202,
          price_per_8g: 121616,
          price_per_10g: 152020,
          change: 108,
          change_percent: 0.71,
          currency: "INR",
        },
        gold_22k: {
          name: "22K Gold",
          karat: "22K",
          purity: "91.6% Hallmark Gold",
          price_per_gram: 13935,
          price_per_8g: 111480,
          price_per_10g: 139350,
          change: 99,
          change_percent: 0.71,
          currency: "INR",
        },
        silver: {
          name: "Silver",
          symbol: "SI=F",
          purity: ".999 Fine Silver",
          price_per_gram: 250,
          price_per_10g: 2500,
          price_per_kg: 250000,
          price_inr_per_gram: 250,
          price_inr_per_10g: 2500,
          change: 1.60,
          change_percent: 0.64,
          unit: "gram",
        },
        gold: {
          name: "Gold",
          symbol: "GC=F",
          price_inr_per_gram: 15202,
          price_inr_per_10g: 152020,
          price_22k_per_gram: 13935,
          change_percent: 0.71,
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

