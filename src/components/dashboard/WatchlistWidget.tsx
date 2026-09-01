"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DBWatchlistItem } from "@/types/database";
import { watchlistService } from "@/lib/services/watchlistService";
import { TrendingUp, TrendingDown, Plus, Trash2, ArrowRight, Search } from "lucide-react";

export const WatchlistWidget: React.FC = () => {
  const [items, setItems] = useState<DBWatchlistItem[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableResults, setAvailableResults] = useState<any[]>([]);

  const loadWatchlist = () => {
    watchlistService.getWatchlist().then(setItems);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    watchlistService.searchAvailableStocks(q).then(setAvailableResults);
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
    loadWatchlist();
  };

  const handleRemove = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await watchlistService.removeStock(id);
    loadWatchlist();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-left flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              EQUITY TRACKING
            </span>
            <h3 className="text-lg font-bold text-[#0B1F3A]">
              My Watchlist
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsAddOpen(!isAddOpen);
                if (!isAddOpen) handleSearch("");
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
            <Link
              href="/markets/watchlist"
              className="text-xs font-semibold text-[#00A88F] hover:underline flex items-center gap-1"
            >
              <span>Full List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Add Modal Popover */}
        {isAddOpen && (
          <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search symbol (e.g. INFY, SBIN)..."
                className="w-full focus:outline-none text-xs"
              />
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1">
              {availableResults.map((s) => (
                <div
                  key={s.symbol}
                  onClick={() => handleAdd(s)}
                  className="p-2 rounded hover:bg-slate-200/60 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <span className="font-bold font-mono text-[#0B1F3A]">{s.symbol}</span>
                    <span className="text-slate-500 ml-2">{s.name}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-800">
                    ₹{s.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Watchlist Items */}
        {items.length === 0 ? (
          <div className="py-8 text-center space-y-2 border border-dashed border-slate-200 rounded-lg">
            <p className="text-xs text-slate-500 font-medium">Your watchlist is empty.</p>
            <button
              onClick={() => {
                setIsAddOpen(true);
                handleSearch("");
              }}
              className="text-xs font-semibold text-[#00A88F] hover:underline"
            >
              Add your first stock
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {items.slice(0, 4).map((item) => {
              const isPos = item.change >= 0;
              return (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-[#0B1F3A]">
                        {item.symbol}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                        {item.companyName}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.sector}</div>
                  </div>

                  <div className="flex items-center gap-3 font-tabular">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-slate-900">
                        ₹{item.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[10px] font-mono font-semibold ${
                          isPos ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {isPos ? "+" : ""}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleRemove(item.id, e)}
                      title="Remove from watchlist"
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
        Informational tracking only &bull; No investment advice provided
      </div>
    </div>
  );
};
