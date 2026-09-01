"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MarketIndexQuote } from "@/types";
import { marketDataService } from "@/lib/market/marketService";
import { TrendingUp, TrendingDown, Radio, ArrowRight } from "lucide-react";

export const MarketOverviewWidget: React.FC = () => {
  const [quotes, setQuotes] = useState<MarketIndexQuote[]>([]);

  useEffect(() => {
    marketDataService.getIndexQuotes().then(setQuotes);
    const unsub = marketDataService.subscribeToTicker(setQuotes);
    return () => unsub();
  }, []);

  const sparklinePaths: Record<string, string> = {
    "NIFTY 50": "M0,25 Q15,10 30,18 T60,8 T90,14 T120,4",
    SENSEX: "M0,22 Q20,12 40,16 T80,10 T100,6 T120,2",
    "BANK NIFTY": "M0,6 Q20,18 40,12 T80,24 T100,16 T120,26",
    "INDIA VIX": "M0,8 Q20,16 40,24 T80,18 T100,28 T120,25",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-left flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A88F] animate-ping" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              REAL-TIME MARKET INDICES
            </span>
          </div>
          <Link
            href="/markets/overview"
            className="text-xs font-semibold text-[#00A88F] hover:underline flex items-center gap-1"
          >
            <span>Terminal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {quotes.slice(0, 3).map((q) => {
            const isPos = q.change >= 0;
            const path = sparklinePaths[q.symbol] || "M0,15 L120,15";

            return (
              <div
                key={q.symbol}
                className="p-3 rounded-lg bg-[#F6F8FA] border border-slate-200 flex items-center justify-between font-tabular"
              >
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">{q.name}</div>
                  <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">
                    ₹{q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Mini Sparkline SVG */}
                <div className="hidden sm:block w-24 h-8">
                  <svg viewBox="0 0 120 30" className="w-full h-full overflow-visible">
                    <path
                      d={path}
                      fill="none"
                      stroke={isPos ? "#0B9B72" : "#D64545"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-flex items-center text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      isPos ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                    }`}
                  >
                    {isPos ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {isPos ? "+" : ""}
                    {q.changePercent.toFixed(2)}%
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    {isPos ? "+" : ""}
                    {q.change.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>NSE/BSE Real-Time Simulated Feed</span>
        <span>Synced with Market Hours</span>
      </div>
    </div>
  );
};
