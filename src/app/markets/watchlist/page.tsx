"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DBWatchlistItem } from "@/types/database";
import { watchlistService } from "@/lib/services/watchlistService";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Search,
  ArrowRight,
  ListTree,
  AlertCircle,
} from "lucide-react";

export default function FullWatchlistPage() {
  const [watchlist, setWatchlist] = useState<DBWatchlistItem[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableStocks, setAvailableStocks] = useState<any[]>([]);

  const loadData = () => {
    watchlistService.getWatchlist().then(setWatchlist);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    watchlistService.searchAvailableStocks(q).then(setAvailableStocks);
  };

  const handleAdd = async (stock: any) => {
    await watchlistService.addStock({
      userId: "demo_user",
      symbol: stock.symbol,
      companyName: stock.name,
      sector: stock.sector,
      price: stock.price,
      change: stock.price * 0.008,
      changePercent: 0.8,
      sparkline: [stock.price * 0.98, stock.price * 0.99, stock.price],
      high52w: stock.price * 1.15,
      low52w: stock.price * 0.85,
      marketCapCr: stock.cap,
    });
    setIsAddOpen(false);
    setSearchQuery("");
    loadData();
  };

  const handleRemove = async (id: string) => {
    await watchlistService.removeStock(id);
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ListTree className="w-4 h-4 text-[#00A88F]" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
              PORTFOLIO SURVEILLANCE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight mt-1">
            Custom Equity Watchlist
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor and benchmark companies you are actively researching
          </p>
        </div>

        <button
          onClick={() => {
            setIsAddOpen(true);
            handleSearch("");
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#00A88F]" />
          <span>Add Stock to Watchlist</span>
        </button>
      </div>

      {/* Add Stock Modal Popover */}
      {isAddOpen && (
        <div className="p-4 bg-white border border-slate-300 rounded-xl shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#0B1F3A] uppercase font-mono">
              Add Ticker to Tracking
            </h3>
            <button
              onClick={() => setIsAddOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by company or symbol (e.g. TITAN, TATAMOTORS)..."
              className="w-full bg-transparent focus:outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {availableStocks.map((s) => (
              <div
                key={s.symbol}
                onClick={() => handleAdd(s)}
                className="p-2.5 rounded-lg border border-slate-200 hover:border-[#00A88F] hover:bg-teal-50/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <div className="font-bold font-mono text-[#0B1F3A]">{s.symbol}</div>
                  <div className="text-[10px] text-slate-500 truncate">{s.name}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-semibold text-slate-900">₹{s.price.toFixed(2)}</div>
                  <span className="text-[10px] text-[#00A88F] font-bold">+ Add</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Watchlist Table / Empty State */}
      {watchlist.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ListTree className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0B1F3A]">Your watchlist is empty.</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Track the companies you're researching. Add equities to monitor real-time price changes and initiate Jaro dossiers.
          </p>
          <button
            onClick={() => {
              setIsAddOpen(true);
              handleSearch("");
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A88F] hover:underline"
          >
            <span>Add your first stock</span> &rarr;
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px]">
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Current Price</th>
                  <th className="py-3 px-4">1D Change</th>
                  <th className="py-3 px-4">52W Range</th>
                  <th className="py-3 px-4">Market Cap</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {watchlist.map((stock) => {
                  const isPos = stock.change >= 0;
                  return (
                    <tr key={stock.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0B1F3A]">{stock.symbol}</div>
                        <div className="text-[11px] text-slate-400 font-sans">{stock.companyName}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-sans">{stock.sector}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        ₹{stock.price.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center font-bold px-1.5 py-0.5 rounded ${
                            isPos ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                          }`}
                        >
                          {isPos ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        ₹{stock.low52w.toFixed(0)} - ₹{stock.high52w.toFixed(0)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        ₹{(stock.marketCapCr / 1000).toFixed(0)}k Cr
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          href={`/ai-tools/jaro?symbol=${stock.symbol}`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00A88F] hover:underline"
                        >
                          <span>Analyze</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => handleRemove(stock.id)}
                          title="Remove"
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors inline-block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Non-Recommendation Disclosure */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-500 leading-relaxed">
        <strong>Tracking Disclosure: </strong>
        Watchlists are personal data management tools. Market Healers does not provide investment recommendations, buy/sell ratings, or portfolio management advisory services.
      </div>

    </div>
  );
}
