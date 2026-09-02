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
 * calculating Indian retail spot rates for 24K, 22K gold and silver per gram/kg.
 * Accounts for Indian customs import duty and GST matching GoodReturns/IBJA domestic prices.
 */
export async function fetchLivePreciousMetals(): Promise<{
  updated_at: string;
  gold_24k: any;
  gold_22k: any;
  gold_18k: any;
  silver: any;
  gold: any;
}> {
  const [goldQuote, silverQuote, inrQuote] = await Promise.all([
    fetchYahooQuote("GC=F", "Gold", "commodity"),
    fetchYahooQuote("SI=F", "Silver", "commodity"),
    fetchYahooQuote("INR=X", "USD/INR", "commodity"),
  ]);

  const usdInr = inrQuote?.price ?? 94.96;

  // Raw COMEX quote prices
  const goldUsdOz = goldQuote?.price ?? 4427.6;
  const goldChangePercent = goldQuote?.change_percent ?? 0.71;
  const silverUsdOz = silverQuote?.price ?? 65.79;
  const silverChangePercent = silverQuote?.change_percent ?? 0.64;

  // Indian import duty + GST + cess multiplier to match Indian retail spot (GoodReturns / IBJA)
  // ~1.1246 for Gold, ~1.2446 for Silver
  const rawGoldGram = (goldUsdOz / TROY_OUNCE_TO_GRAMS) * usdInr;
  const rawSilverGram = (silverUsdOz / TROY_OUNCE_TO_GRAMS) * usdInr;

  const gold24kPerGram = Math.round(rawGoldGram * 1.1246);
  const gold22kPerGram = Math.round(gold24kPerGram * (22 / 24));
  const gold18kPerGram = Math.round(gold24kPerGram * 0.771);

  const silverPerGram = Math.round(rawSilverGram * 1.2446);
  const silverPerKg = silverPerGram * 1000;

  const change24k = Math.round(gold24kPerGram * (goldChangePercent / 100));
  const change22k = Math.round(gold22kPerGram * (goldChangePercent / 100));
  const change18k = Math.round(gold18kPerGram * (goldChangePercent / 100));
  const changeSilver = Number((silverPerGram * (silverChangePercent / 100)).toFixed(2));

  return {
    updated_at: new Date().toISOString(),
    gold_24k: {
      name: "24K Gold",
      karat: "24K",
      purity: "99.9% Pure Gold",
      price_per_gram: gold24kPerGram,
      price_per_8g: gold24kPerGram * 8,
      price_per_10g: gold24kPerGram * 10,
      change: change24k,
      change_percent: goldChangePercent,
      currency: "INR",
      standard: "Investment & Bullion Bar Grade",
    },
    gold_22k: {
      name: "22K Gold",
      karat: "22K",
      purity: "91.6% Hallmark Gold",
      price_per_gram: gold22kPerGram,
      price_per_8g: gold22kPerGram * 8,
      price_per_10g: gold22kPerGram * 10,
      change: change22k,
      change_percent: goldChangePercent,
      currency: "INR",
      standard: "Standard Jewellery Hallmark",
    },
    gold_18k: {
      name: "18K Gold",
      karat: "18K",
      purity: "75.0% Standard",
      price_per_gram: gold18kPerGram,
      price_per_8g: gold18kPerGram * 8,
      price_per_10g: gold18kPerGram * 10,
      change: change18k,
      change_percent: goldChangePercent,
      currency: "INR",
      standard: "Diamond & Stone Setting Jewellery",
    },
    silver: {
      name: "Silver",
      purity: ".999 Fine Silver",
      price_per_gram: silverPerGram,
      price_per_10g: silverPerGram * 10,
      price_per_100g: silverPerGram * 100,
      price_per_kg: silverPerKg,
      change: changeSilver,
      change_percent: silverChangePercent,
      currency: "INR",
      standard: "Fine Silver Coin & 1 Kg Bar",
    },
    gold: {
      name: "Gold",
      symbol: "GC=F",
      price_inr_per_gram: gold24kPerGram,
      price_inr_per_10g: gold24kPerGram * 10,
      price_22k_per_gram: gold22kPerGram,
      price_22k_per_10g: gold22kPerGram * 10,
      change_percent: goldChangePercent,
      currency: "INR",
      unit: "gram",
    },
  };
}
