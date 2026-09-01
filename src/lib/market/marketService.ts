import { MarketIndexQuote, ScreenerItem } from "@/types";

export interface PreciousMetalsQuote {
  name: string;
  symbol: string;
  price_inr_per_gram?: number;
  price_inr_per_10g?: number;
  price_usd_per_troy_ounce?: number;
  price_usd_per_gram?: number;
  change_percent?: number;
  usd_inr?: number;
  contract?: string;
  unit?: string;
  source?: string;
}

export interface PreciousMetalsOverview {
  updated_at: string;
  gold: PreciousMetalsQuote;
  silver: PreciousMetalsQuote;
}

export interface ScheduleStatus {
  market_status: "OPEN" | "CLOSED" | "PRE_MARKET";
  schedule_reason: string;
  next_scheduled_update: string | null;
  server_time_ist: string;
}

export interface IMarketDataService {
  getIndexQuotes(): Promise<MarketIndexQuote[]>;
  getScreenerStocks(): Promise<ScreenerItem[]>;
  getMarketOverview(): Promise<any>;
  getPreciousMetals(): Promise<PreciousMetalsOverview>;
  subscribeToTicker(callback: (quotes: MarketIndexQuote[]) => void): () => void;
  subscribeToMetals(callback: (metals: PreciousMetalsOverview) => void): () => void;
  getScheduleStatus(): ScheduleStatus | null;
}

class YahooMarketDataService implements IMarketDataService {
  private cachedQuotes: MarketIndexQuote[] = [
    {
      symbol: "NIFTY 50",
      name: "NIFTY 50",
      price: 24055.80,
      change: -24.60,
      changePercent: -0.10,
      high52w: 26277.35,
      low52w: 21280.0,
      lastUpdated: "15m interval &bull; Yahoo Finance",
    },
    {
      symbol: "BANK NIFTY",
      name: "NIFTY BANK",
      price: 57409.60,
      change: -615.35,
      changePercent: -1.06,
      high52w: 58500.0,
      low52w: 43229.6,
      lastUpdated: "15m interval &bull; Yahoo Finance",
    },
    {
      symbol: "SENSEX",
      name: "BSE SENSEX",
      price: 76944.28,
      change: -13.00,
      changePercent: -0.02,
      high52w: 85978.25,
      low52w: 65120.0,
      lastUpdated: "15m interval &bull; Yahoo Finance",
    },
    {
      symbol: "INDIA VIX",
      name: "India Volatility",
      price: 13.42,
      change: -0.45,
      changePercent: -3.24,
      high52w: 23.15,
      low52w: 10.05,
      lastUpdated: "15m interval &bull; Yahoo Finance",
    },
  ];

  private cachedMetals: PreciousMetalsOverview = {
    updated_at: new Date().toISOString(),
    gold: {
      name: "Gold",
      symbol: "GC=F",
      contract: "COMEX Gold Futures",
      price_usd_per_troy_ounce: 4422.80,
      price_usd_per_gram: 142.20,
      price_inr_per_gram: 13500.12,
      price_inr_per_10g: 135001.19,
      change_percent: -0.19,
      usd_inr: 94.94,
      unit: "gram",
      source: "Yahoo Finance",
    },
    silver: {
      name: "Silver",
      symbol: "SI=F",
      contract: "COMEX Silver Futures",
      price_usd_per_troy_ounce: 65.68,
      price_usd_per_gram: 2.11,
      price_inr_per_gram: 200.50,
      price_inr_per_10g: 2004.96,
      change_percent: -0.81,
      usd_inr: 94.94,
      unit: "gram",
      source: "Yahoo Finance",
    },
  };

  private cachedScreenerStocks: ScreenerItem[] = [
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      sector: "Information Technology",
      price: 2369.0,
      changePercent: -1.26,
      marketCapCr: 1516000,
      peRatio: 31.4,
      roePercent: 51.2,
      divYield: 1.34,
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      sector: "Energy & Conglomerate",
      price: 1309.0,
      changePercent: 2.51,
      marketCapCr: 2045000,
      peRatio: 27.2,
      roePercent: 9.8,
      divYield: 0.35,
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd",
      sector: "Banking & Financials",
      price: 711.9,
      changePercent: 0.41,
      marketCapCr: 1282000,
      peRatio: 18.9,
      roePercent: 17.1,
      divYield: 1.16,
    },
    {
      symbol: "INFY",
      name: "Infosys Ltd",
      sector: "Information Technology",
      price: 1156.0,
      changePercent: 1.96,
      marketCapCr: 765000,
      peRatio: 28.1,
      roePercent: 32.4,
      divYield: 2.1,
    },
    {
      symbol: "LT",
      name: "Larsen & Toubro",
      sector: "Capital Goods & Infra",
      price: 3980.1,
      changePercent: -1.60,
      marketCapCr: 497000,
      peRatio: 36.8,
      roePercent: 16.4,
      divYield: 0.95,
    },
  ];

  private scheduleStatus: ScheduleStatus | null = null;
  private tickerListeners: ((quotes: MarketIndexQuote[]) => void)[] = [];
  private metalsListeners: ((metals: PreciousMetalsOverview) => void)[] = [];
  private pollingIntervalId: NodeJS.Timeout | null = null;
  private microTickIntervalId: NodeJS.Timeout | null = null;
  private hasFetched = false;

  getScheduleStatus(): ScheduleStatus | null {
    return this.scheduleStatus;
  }

  async getMarketOverview(): Promise<any> {
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/market/overview", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.schedule_status) {
            this.scheduleStatus = data.schedule_status;
          }
          this.applyYahooData(data);
          this.notifyTickerListeners();
          return data;
        }
      } catch (err) {
        console.warn("Could not fetch live overview API:", err);
      }
    }
    return null;
  }

  async getPreciousMetals(): Promise<PreciousMetalsOverview> {
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/market/metals", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.gold && data.silver) {
            this.cachedMetals = data;
            this.notifyMetalsListeners();
          }
        }
      } catch (err) {
        console.warn("Could not fetch live metals API:", err);
      }
    }
    return this.cachedMetals;
  }

  private applyYahooData(data: any) {
    if (!data?.indices) return;

    const indexMap: Record<string, string> = {
      "^NSEI": "NIFTY 50",
      "^NSEBANK": "BANK NIFTY",
      "^BSESN": "SENSEX",
    };

    const newIndices: MarketIndexQuote[] = [];

    data.indices.forEach((idx: any) => {
      const mappedName = indexMap[idx.symbol] || idx.name;
      if (["NIFTY 50", "BANK NIFTY", "SENSEX"].includes(mappedName)) {
        newIndices.push({
          symbol: mappedName,
          name: mappedName === "SENSEX" ? "BSE SENSEX" : mappedName,
          price: Number(idx.price.toFixed(2)),
          change: Number((idx.change || 0).toFixed(2)),
          changePercent: Number((idx.change_percent || 0).toFixed(2)),
          high52w: idx.high ? Number(idx.high.toFixed(2)) : 26000,
          low52w: idx.low ? Number(idx.low.toFixed(2)) : 21000,
          lastUpdated: `Yahoo Finance 15m (${new Date(idx.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        });
      }
    });

    if (newIndices.length >= 3) {
      newIndices.push({
        symbol: "INDIA VIX",
        name: "India Volatility",
        price: 13.42,
        change: -0.45,
        changePercent: -3.24,
        high52w: 23.15,
        low52w: 10.05,
        lastUpdated: "Yahoo Finance",
      });
      this.cachedQuotes = newIndices;
    }

    if (data.top_companies && Array.isArray(data.top_companies)) {
      const updatedScreener: ScreenerItem[] = data.top_companies.slice(0, 8).map((c: any) => ({
        symbol: c.name || c.symbol.replace(".NS", ""),
        name: c.name || c.symbol,
        sector: "Indian Large Cap",
        price: Number((c.price || 1000).toFixed(2)),
        changePercent: Number((c.change_percent || 0).toFixed(2)),
        marketCapCr: 500000,
        peRatio: 28.5,
        roePercent: 22.4,
        divYield: 1.2,
      }));
      if (updatedScreener.length > 0) {
        this.cachedScreenerStocks = updatedScreener;
      }
    }
  }

  async getIndexQuotes(): Promise<MarketIndexQuote[]> {
    if (!this.hasFetched) {
      this.hasFetched = true;
      await Promise.allSettled([this.getMarketOverview(), this.getPreciousMetals()]);
    }
    return [...this.cachedQuotes];
  }

  async getScreenerStocks(): Promise<ScreenerItem[]> {
    if (!this.hasFetched) {
      this.hasFetched = true;
      await this.getMarketOverview();
    }
    return [...this.cachedScreenerStocks];
  }

  private notifyTickerListeners() {
    this.tickerListeners.forEach((cb) => cb([...this.cachedQuotes]));
  }

  private notifyMetalsListeners() {
    this.metalsListeners.forEach((cb) => cb({ ...this.cachedMetals }));
  }

  private startPollingIfNeeded() {
    if (!this.pollingIntervalId && typeof window !== "undefined") {
      // Poll overview and 24/7 metals every 30 seconds
      this.pollingIntervalId = setInterval(async () => {
        await Promise.allSettled([this.getMarketOverview(), this.getPreciousMetals()]);
      }, 30000);
    }

    if (!this.microTickIntervalId && typeof window !== "undefined") {
      // Micro-ticks only simulate market pulse during active trading hours
      this.microTickIntervalId = setInterval(() => {
        if (this.scheduleStatus?.market_status !== "OPEN") {
          return;
        }
        const updated = this.cachedQuotes.map((quote) => {
          const delta = (Math.random() - 0.49) * 0.4;
          return {
            ...quote,
            price: Number((quote.price + delta).toFixed(2)),
            change: Number((quote.change + delta).toFixed(2)),
          };
        });
        this.cachedQuotes = updated;
        this.notifyTickerListeners();
      }, 5000);
    }
  }

  private stopPollingIfNoListeners() {
    if (this.tickerListeners.length === 0 && this.metalsListeners.length === 0) {
      if (this.pollingIntervalId) {
        clearInterval(this.pollingIntervalId);
        this.pollingIntervalId = null;
      }
      if (this.microTickIntervalId) {
        clearInterval(this.microTickIntervalId);
        this.microTickIntervalId = null;
      }
    }
  }

  subscribeToTicker(callback: (quotes: MarketIndexQuote[]) => void): () => void {
    this.tickerListeners.push(callback);
    callback([...this.cachedQuotes]);
    this.startPollingIfNeeded();

    return () => {
      this.tickerListeners = this.tickerListeners.filter((cb) => cb !== callback);
      this.stopPollingIfNoListeners();
    };
  }

  subscribeToMetals(callback: (metals: PreciousMetalsOverview) => void): () => void {
    this.metalsListeners.push(callback);
    callback({ ...this.cachedMetals });
    this.startPollingIfNeeded();

    return () => {
      this.metalsListeners = this.metalsListeners.filter((cb) => cb !== callback);
      this.stopPollingIfNoListeners();
    };
  }
}

export const marketDataService = new YahooMarketDataService();

