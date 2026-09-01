"use client";

import React, { useEffect, useState } from "react";
import { MarketIndexQuote } from "@/types";
import { marketDataService, PreciousMetalsOverview } from "@/lib/market/marketService";
import { TrendingUp, TrendingDown } from "lucide-react";

export const MarketTicker: React.FC = () => {
  const [quotes, setQuotes] = useState<MarketIndexQuote[]>([]);
  const [metals, setMetals] = useState<PreciousMetalsOverview | null>(null);

  useEffect(() => {
    // Initial fetch of benchmark indices
    marketDataService.getIndexQuotes().then(setQuotes);

    // Initial fetch of precious metals (Gold & Silver converted to INR)
    marketDataService.getPreciousMetals().then(setMetals);

    // Subscribe to auto-updates for equity benchmarks
    const unsubscribeTicker = marketDataService.subscribeToTicker((updatedQuotes) => {
      setQuotes(updatedQuotes);
    });

    // Subscribe to 24/7 auto-updates for Gold & Silver
    const unsubscribeMetals = marketDataService.subscribeToMetals((updatedMetals) => {
      setMetals(updatedMetals);
    });

    return () => {
      unsubscribeTicker();
      unsubscribeMetals();
    };
  }, []);

  if (quotes.length === 0) return null;

  const goldPrice = metals?.gold?.price_inr_per_10g || 135001.19;
  const goldChange = metals?.gold?.change_percent ?? -0.19;
  const isGoldPositive = goldChange >= 0;

  const silverPrice = metals?.silver?.price_inr_per_10g || 2004.96;
  const silverChange = metals?.silver?.change_percent ?? -0.81;
  const isSilverPositive = silverChange >= 0;

  const renderSequence = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center gap-5 sm:gap-12 shrink-0 pr-5 sm:pr-12">
      {/* Benchmark Indices (NIFTY 50, BANK NIFTY, SENSEX, INDIA VIX) */}
      {quotes.map((q) => {
        const isPositive = q.change >= 0;
        return (
          <div key={`${keyPrefix}-${q.symbol}`} className="flex items-center gap-2.5 font-tabular shrink-0">
            <span className="font-bold text-slate-300 text-xs sm:text-[13px] tracking-wide whitespace-nowrap">
              {q.name}:
            </span>
            <span className="font-mono font-bold text-slate-100 text-xs sm:text-[13px] whitespace-nowrap">
              {q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`inline-flex items-center text-[11px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded shadow-2xs whitespace-nowrap ${
                isPositive
                  ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
                  : "text-rose-300 bg-rose-950/60 border border-rose-500/30"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 mr-1 inline" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-1 inline" />
              )}
              {isPositive ? "+" : ""}
              {q.changePercent.toFixed(2)}%
            </span>
          </div>
        );
      })}

      {/* Separator Bullet */}
      <span className="text-slate-600 font-bold select-none shrink-0">•</span>

      {/* GOLD (10g) */}
      <div className="flex items-center gap-2.5 font-tabular shrink-0">
        <span className="font-bold text-amber-400 text-xs sm:text-[13px] tracking-wide flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#C9A227] shadow-[0_0_8px_rgba(201,162,39,0.7)]" />
          GOLD (10g):
        </span>
        <span className="font-mono font-bold text-white text-xs sm:text-[13px] whitespace-nowrap">
          ₹{goldPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </span>
        <span
          className={`inline-flex items-center text-[11px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded shadow-2xs whitespace-nowrap ${
            isGoldPositive
              ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
              : "text-rose-300 bg-rose-950/60 border border-rose-500/30"
          }`}
        >
          {isGoldPositive ? (
            <TrendingUp className="w-3.5 h-3.5 mr-1 inline" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 mr-1 inline" />
          )}
          {isGoldPositive ? "+" : ""}
          {goldChange.toFixed(2)}%
        </span>
      </div>

      {/* Separator Bullet */}
      <span className="text-slate-600 font-bold select-none shrink-0">•</span>

      {/* SILVER (10g) */}
      <div className="flex items-center gap-2.5 font-tabular shrink-0">
        <span className="font-bold text-slate-300 text-xs sm:text-[13px] tracking-wide flex items-center gap-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-slate-300 shadow-[0_0_8px_rgba(226,232,240,0.7)]" />
          SILVER (10g):
        </span>
        <span className="font-mono font-bold text-white text-xs sm:text-[13px] whitespace-nowrap">
          ₹{silverPrice.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </span>
        <span
          className={`inline-flex items-center text-[11px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded shadow-2xs whitespace-nowrap ${
            isSilverPositive
              ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
              : "text-rose-300 bg-rose-950/60 border border-rose-500/30"
          }`}
        >
          {isSilverPositive ? (
            <TrendingUp className="w-3.5 h-3.5 mr-1 inline" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 mr-1 inline" />
          )}
          {isSilverPositive ? "+" : ""}
          {silverChange.toFixed(2)}%
        </span>
      </div>

      {/* Separator Bullet */}
      <span className="text-slate-600 font-bold select-none shrink-0">•</span>
    </div>
  );

  return (
    <div className="bg-[#08111F] text-slate-200 border-b border-[#1E2D44] py-2 sm:py-2.5 select-none w-full overflow-hidden relative">
      {/* Left/Right Edge Fading Vignette */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#08111F] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#08111F] to-transparent z-10" />

      {/* Infinite Seamless Moving Track (Right to Left) */}
      <div className="animate-ticker-marquee flex items-center">
        {renderSequence("seq-1")}
        {renderSequence("seq-2")}
        {renderSequence("seq-3")}
        {renderSequence("seq-4")}
      </div>
    </div>
  );
};
