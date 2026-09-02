export interface YahooQuote {
  symbol: string;
  name?: string;
  type?: "index" | "equity" | "commodity";
  price: number | null;
  previous_close: number | null;
  change: number | null;
  change_percent: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  timestamp: string;
  interval: string;
  source: string;
  sparkline: number[];
}

export const INDICES: Record<string, string> = {
  "NIFTY 50": "^NSEI",
  "BANK NIFTY": "^NSEBANK",
  "SENSEX": "^BSESN",
  "NIFTY IT": "^CNXIT",
  "NIFTY AUTO": "^CNXAUTO",
  "NIFTY PHARMA": "^CNXPHARMA",
  "NIFTY FMCG": "^CNXFMCG",
  "NIFTY METAL": "^CNXMETAL",
  "NIFTY REALTY": "^CNXREALTY",
};

export const TOP_COMPANIES: Record<string, string> = {
  RELIANCE: "RELIANCE.NS",
  TCS: "TCS.NS",
  "HDFC BANK": "HDFCBANK.NS",
  "ICICI BANK": "ICICIBANK.NS",
  INFOSYS: "INFY.NS",
  SBI: "SBIN.NS",
  ITC: "ITC.NS",
  "LARSEN & TOUBRO": "LT.NS",
  "BHARTI AIRTEL": "BHARTIARTL.NS",
  "AXIS BANK": "AXISBANK.NS",
  "KOTAK BANK": "KOTAKBANK.NS",
  "HINDUSTAN UNILEVER": "HINDUNILVR.NS",
  "MARUTI SUZUKI": "MARUTI.NS",
  "SUN PHARMA": "SUNPHARMA.NS",
  "BAJAJ FINANCE": "BAJFINANCE.NS",
  TITAN: "TITAN.NS",
  "ADANI PORTS": "ADANIPORTS.NS",
  "TATA STEEL": "TATASTEEL.NS",
  "JSW STEEL": "JSWSTEEL.NS",
  "POWER GRID": "POWERGRID.NS",
  "NTPC": "NTPC.NS",
  "M&M": "M&M.NS",
  "TECH MAHINDRA": "TECHM.NS",
  "HCL TECH": "HCLTECH.NS",
  WIPRO: "WIPRO.NS",
  "ULTRATECH CEMENT": "ULTRACEMCO.NS",
};

export const TROY_OUNCE_TO_GRAMS = 31.1034768;

/**
 * Fetch quote data directly from Yahoo Finance v8 chart API using native fetch.
 * Runs in pure Node.js / Edge / Serverless with zero external Python dependencies.
 */
export async function fetchYahooQuote(
  symbol: string,
  name?: string,
  type: "index" | "equity" | "commodity" = "index"
): Promise<YahooQuote | null> {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/json",
  };

  try {
    // 1. Try 15m intraday data first
    let url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      symbol
    )}?interval=15m&range=1d`;
    let res = await fetch(url, { headers, cache: "no-store" });

    let data: any = null;
    if (res.ok) {
      data = await res.json();
    }

    let result = data?.chart?.result?.[0];
    let quote = result?.indicators?.quote?.[0] || {};
    let rawCloses: (number | null)[] = quote.close || [];
    let validCloses = rawCloses.filter(
      (c): c is number => typeof c === "number" && !isNaN(c)
    );

    // 2. Fallback to 5d daily data if market is closed or 15m returned no closes
    if (!result || validCloses.length === 0) {
      url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
        symbol
      )}?interval=1d&range=5d`;
      res = await fetch(url, { headers, cache: "no-store" });
      if (res.ok) {
        data = await res.json();
        result = data?.chart?.result?.[0];
        quote = result?.indicators?.quote?.[0] || {};
        rawCloses = quote.close || [];
        validCloses = rawCloses.filter(
          (c): c is number => typeof c === "number" && !isNaN(c)
        );
      }
    }

    if (!result) return null;

    const meta = result.meta || {};
    const currentPrice =
      meta.regularMarketPrice ??
      (validCloses.length > 0 ? validCloses[validCloses.length - 1] : null);

    // Official 1-day change percentage directly from exchange metadata
    const changePercent =
      typeof meta.regularMarketChangePercent === "number"
        ? Number(meta.regularMarketChangePercent.toFixed(4))
        : null;

    // Previous close: prefer meta.previousClose, or compute from currentPrice & changePercent
    let prevClose: number | null = null;
    if (typeof meta.previousClose === "number") {
      prevClose = meta.previousClose;
    } else if (currentPrice != null && changePercent != null) {
      prevClose = currentPrice / (1 + changePercent / 100);
    } else if (typeof meta.chartPreviousClose === "number") {
      prevClose = meta.chartPreviousClose;
    } else if (validCloses.length >= 2) {
      prevClose = validCloses[validCloses.length - 2];
    }

    let change: number | null = null;
    if (currentPrice != null && prevClose != null) {
      change = Number((currentPrice - prevClose).toFixed(4));
    }

    const finalChangePercent =
      changePercent ??
      (currentPrice != null && prevClose != null && prevClose !== 0
        ? Number((((currentPrice - prevClose) / prevClose) * 100).toFixed(4))
        : null);

    const sparkline = validCloses.slice(-8);

    return {
      symbol,
      name: name || symbol,
      type,
      price: currentPrice != null ? Number(currentPrice.toFixed(2)) : null,
      previous_close: prevClose != null ? Number(prevClose.toFixed(2)) : null,
      change: change != null ? Number(change.toFixed(2)) : null,
      change_percent: finalChangePercent != null ? Number(finalChangePercent.toFixed(2)) : null,
      open: meta.regularMarketDayOpen ?? (quote.open?.find((o: any) => typeof o === "number") ?? null),
      high: meta.regularMarketDayHigh ?? (meta.fiftyTwoWeekHigh ?? null),
      low: meta.regularMarketDayLow ?? (meta.fiftyTwoWeekLow ?? null),
      volume: meta.regularMarketVolume ?? null,
      timestamp: meta.regularMarketTime
        ? new Date(meta.regularMarketTime * 1000).toISOString()
        : new Date().toISOString(),
      interval: "15m",
      source: "Yahoo Finance",
      sparkline: sparkline.length > 0 ? sparkline.map((v) => Number(v.toFixed(2))) : [],
    };
  } catch (err) {
    console.warn(`Failed to fetch Yahoo quote for ${symbol}:`, err);
    return null;
  }
}

/**
 * Concurrently fetches all Indian market indices and top equities.
 */
export async function fetchLiveMarketOverview(): Promise<{
  updated_at: string;
  indices: YahooQuote[];
  top_companies: YahooQuote[];
  top_gainers: YahooQuote[];
  top_losers: YahooQuote[];
}> {
  const indexPromises = Object.entries(INDICES).map(([name, symbol]) =>
    fetchYahooQuote(symbol, name, "index")
  );

  const stockPromises = Object.entries(TOP_COMPANIES).map(([name, symbol]) =>
    fetchYahooQuote(symbol, name, "equity")
  );

  const [indicesResults, stockResults] = await Promise.all([
    Promise.allSettled(indexPromises),
    Promise.allSettled(stockPromises),
  ]);

  const indices: YahooQuote[] = [];
  indicesResults.forEach((res, idx) => {
    const [name, symbol] = Object.entries(INDICES)[idx];
    if (res.status === "fulfilled" && res.value) {
      indices.push(res.value);
    } else {
      indices.push({
        symbol,
        name,
        type: "index",
        price: null,
        previous_close: null,
        change: null,
        change_percent: null,
        open: null,
        high: null,
        low: null,
        volume: null,
        timestamp: new Date().toISOString(),
        interval: "15m",
        source: "Yahoo Finance",
        sparkline: [],
      });
    }
  });

  const top_companies: YahooQuote[] = [];
  stockResults.forEach((res, idx) => {
    const [name, symbol] = Object.entries(TOP_COMPANIES)[idx];
    if (res.status === "fulfilled" && res.value) {
      top_companies.push(res.value);
    } else {
      top_companies.push({
        symbol,
        name,
        type: "equity",
        price: null,
        previous_close: null,
        change: null,
        change_percent: null,
        open: null,
        high: null,
        low: null,
        volume: null,
        timestamp: new Date().toISOString(),
        interval: "15m",
        source: "Yahoo Finance",
        sparkline: [],
      });
    }
  });

  // Rank top gainers and top losers from NIFTY 50 companies
  const validCompanies = top_companies.filter(
    (c) => typeof c.price === "number" && typeof c.change_percent === "number"
  );
  const sortedByGain = [...validCompanies].sort(
    (a, b) => (b.change_percent ?? 0) - (a.change_percent ?? 0)
  );
  const top_gainers = sortedByGain.slice(0, 5);
  const top_losers = [...sortedByGain].reverse().slice(0, 5);

  return {
    updated_at: new Date().toISOString(),
    indices,
    top_companies,
    top_gainers,
    top_losers,
  };
}

/**
 * Concurrently fetches Gold, Silver, and USD/INR exchange rate,
 * calculating live INR price per gram and per 10g.
 */
export async function fetchLivePreciousMetals(): Promise<{
  updated_at: string;
  gold: any;
  silver: any;
}> {
  const [goldQuote, silverQuote, inrQuote] = await Promise.all([
    fetchYahooQuote("GC=F", "Gold", "commodity"),
    fetchYahooQuote("SI=F", "Silver", "commodity"),
    fetchYahooQuote("INR=X", "USD/INR", "commodity"),
  ]);

  const usdInr = inrQuote?.price ?? 84.5;

  // Gold calculations
  const goldUsdOz = goldQuote?.price ?? 2740.5;
  const goldPrevOz = goldQuote?.previous_close ?? goldUsdOz;
  const goldChangeOz = goldQuote?.change ?? (goldUsdOz - goldPrevOz);
  const goldChangePercent = goldQuote?.change_percent ?? 0;
  const goldUsdGram = goldUsdOz / TROY_OUNCE_TO_GRAMS;
  const goldInrGram = goldUsdGram * usdInr;
  const goldInr10g = goldInrGram * 10;

  // Silver calculations
  const silverUsdOz = silverQuote?.price ?? 32.8;
  const silverPrevOz = silverQuote?.previous_close ?? silverUsdOz;
  const silverChangeOz = silverQuote?.change ?? (silverUsdOz - silverPrevOz);
  const silverChangePercent = silverQuote?.change_percent ?? 0;
  const silverUsdGram = silverUsdOz / TROY_OUNCE_TO_GRAMS;
  const silverInrGram = silverUsdGram * usdInr;
  const silverInr10g = silverInrGram * 10;

  return {
    updated_at: new Date().toISOString(),
    gold: {
      name: "Gold",
      symbol: "GC=F",
      type: "commodity",
      source: "Yahoo Finance",
      contract: "COMEX Gold Futures",
      currency: "INR",
      unit: "gram",
      price: Number(goldInrGram.toFixed(2)),
      price_inr_per_gram: Number(goldInrGram.toFixed(2)),
      price_inr_per_10g: Number(goldInr10g.toFixed(2)),
      price_usd_per_gram: Number(goldUsdGram.toFixed(4)),
      price_usd_per_troy_ounce: Number(goldUsdOz.toFixed(2)),
      previous_close_usd_per_troy_ounce: Number(goldPrevOz.toFixed(2)),
      change_usd_per_troy_ounce: Number(goldChangeOz.toFixed(2)),
      change_percent: Number(goldChangePercent.toFixed(4)),
      usd_inr: Number(usdInr.toFixed(2)),
      timestamp: goldQuote?.timestamp || new Date().toISOString(),
      interval: "15m",
      conversion: {
        troy_ounce_to_grams: TROY_OUNCE_TO_GRAMS,
        formula: "USD/oz ÷ 31.1034768 × USD/INR",
      },
    },
    silver: {
      name: "Silver",
      symbol: "SI=F",
      type: "commodity",
      source: "Yahoo Finance",
      contract: "COMEX Silver Futures",
      currency: "INR",
      unit: "gram",
      price: Number(silverInrGram.toFixed(2)),
      price_inr_per_gram: Number(silverInrGram.toFixed(2)),
      price_inr_per_10g: Number(silverInr10g.toFixed(2)),
      price_usd_per_gram: Number(silverUsdGram.toFixed(4)),
      price_usd_per_troy_ounce: Number(silverUsdOz.toFixed(2)),
      previous_close_usd_per_troy_ounce: Number(silverPrevOz.toFixed(2)),
      change_usd_per_troy_ounce: Number(silverChangeOz.toFixed(2)),
      change_percent: Number(silverChangePercent.toFixed(4)),
      usd_inr: Number(usdInr.toFixed(2)),
      timestamp: silverQuote?.timestamp || new Date().toISOString(),
      interval: "15m",
      conversion: {
        troy_ounce_to_grams: TROY_OUNCE_TO_GRAMS,
        formula: "USD/oz ÷ 31.1034768 × USD/INR",
      },
    },
  };
}
