import { DBWatchlistItem } from "@/types/database";
import { MOCK_WATCHLIST } from "@/lib/db/mockDb";

const STORAGE_KEY = "market_healers_watchlist";

export interface IWatchlistService {
  getWatchlist(): Promise<DBWatchlistItem[]>;
  addStock(item: Omit<DBWatchlistItem, "id" | "addedAt">): Promise<DBWatchlistItem>;
  removeStock(id: string): Promise<boolean>;
  searchAvailableStocks(query: string): Promise<any[]>;
}

const AVAILABLE_STOCKS = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Energy & Conglomerate", price: 3024.1, pe: 27.2, cap: 2045000 },
  { symbol: "TCS", name: "Tata Consultancy Services", sector: "Information Technology", price: 4192.5, pe: 31.4, cap: 1516000 },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking & Financials", price: 1684.2, pe: 18.9, cap: 1282000 },
  { symbol: "INFY", name: "Infosys Ltd", sector: "Information Technology", price: 1845.8, pe: 28.1, cap: 765000 },
  { symbol: "LT", name: "Larsen & Toubro", sector: "Capital Goods & Infra", price: 3620.0, pe: 36.8, cap: 497000 },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking & Financials", price: 1245.5, pe: 17.5, cap: 874000 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", sector: "Telecommunications", price: 1590.0, pe: 54.2, cap: 910000 },
  { symbol: "SBIN", name: "State Bank of India", sector: "Public Sector Banking", price: 812.4, pe: 10.4, cap: 725000 },
  { symbol: "TITAN", name: "Titan Company Ltd", sector: "Consumer Discretionary", price: 3510.4, pe: 84.2, cap: 311000 },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd", sector: "Automobile & EV", price: 984.6, pe: 14.8, cap: 362000 },
];

class WatchlistService implements IWatchlistService {
  private getStored(): DBWatchlistItem[] {
    if (typeof window === "undefined") return MOCK_WATCHLIST;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : MOCK_WATCHLIST;
    } catch {
      return MOCK_WATCHLIST;
    }
  }

  private save(items: DBWatchlistItem[]) {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async getWatchlist(): Promise<DBWatchlistItem[]> {
    return this.getStored();
  }

  async addStock(item: Omit<DBWatchlistItem, "id" | "addedAt">): Promise<DBWatchlistItem> {
    const list = this.getStored();
    const existing = list.find((i) => i.symbol === item.symbol);
    if (existing) return existing;

    const newItem: DBWatchlistItem = {
      ...item,
      id: "wl_" + Math.random().toString(36).substring(2, 7),
      addedAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newItem, ...list];
    this.save(updated);
    return newItem;
  }

  async removeStock(id: string): Promise<boolean> {
    const list = this.getStored();
    const filtered = list.filter((i) => i.id !== id && i.symbol !== id);
    this.save(filtered);
    return true;
  }

  async searchAvailableStocks(query: string): Promise<any[]> {
    const q = query.toLowerCase().trim();
    if (!q) return AVAILABLE_STOCKS.slice(0, 5);
    return AVAILABLE_STOCKS.filter(
      (s) => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q)
    );
  }
}

export const watchlistService = new WatchlistService();
