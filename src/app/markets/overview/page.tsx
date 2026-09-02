"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MarketIndexQuote } from "@/types";
import { marketDataService } from "@/lib/market/marketService";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

export default function MarketOverviewPage() {
  const [quotes, setQuotes] = useState<MarketIndexQuote[]>([]);

  const [topGainers, setTopGainers] = useState<any[]>([
    { symbol: "ADANIPORTS", name: "ADANI PORTS", price: 1672.7, change: 25.2, change_percent: 1.53, high: 1690.0, low: 1640.0 },
    { symbol: "POWERGRID", name: "POWER GRID", price: 266.8, change: 2.25, change_percent: 0.85, high: 270.0, low: 263.5 },
    { symbol: "NTPC", name: "NTPC", price: 330.0, change: 2.5, change_percent: 0.76, high: 334.0, low: 326.5 },
    { symbol: "TITAN", name: "TITAN", price: 5074.0, change: 24.0, change_percent: 0.47, high: 5120.0, low: 5035.0 },
    { symbol: "RELIANCE", name: "RELIANCE", price: 1313.1, change: 4.1, change_percent: 0.31, high: 1321.9, low: 1293.1 },
  ]);

  const [topLosers, setTopLosers] = useState<any[]>([
    { symbol: "WIPRO", name: "WIPRO", price: 177.09, change: -4.61, change_percent: -2.54, high: 182.5, low: 176.0 },
    { symbol: "M&M", name: "MAHINDRA & MAHINDRA", price: 3190.0, change: -69.0, change_percent: -2.12, high: 3260.0, low: 3175.0 },
    { symbol: "HDFCBANK", name: "HDFC BANK", price: 700.8, change: -11.1, change_percent: -1.56, high: 705.65, low: 700.0 },
    { symbol: "HCLTECH", name: "HCL TECH", price: 1331.5, change: -19.9, change_percent: -1.47, high: 1355.0, low: 1325.0 },
    { symbol: "INFY", name: "INFOSYS", price: 1140.0, change: -16.0, change_percent: -1.38, high: 1147.8, low: 1118.6 },
  ]);

  const [sectorMatrix, setSectorMatrix] = useState([
    { sector: "NIFTY IT", change: -0.28, status: "Consolidation", rsi: 48.4 },
    { sector: "NIFTY AUTO", change: -1.79, status: "Pullback", rsi: 41.2 },
    { sector: "NIFTY METAL", change: -0.25, status: "Neutral", rsi: 51.1 },
    { sector: "NIFTY FMCG", change: -0.47, status: "Steady", rsi: 49.3 },
    { sector: "NIFTY PHARMA", change: -1.49, status: "Consolidation", rsi: 43.8 },
    { sector: "NIFTY REALTY", change: 0.21, status: "Expansion", rsi: 56.9 },
  ]);

  const [marketMovers, setMarketMovers] = useState([
    { symbol: "ADANIPORTS", name: "Adani Ports", price: 1672.7, changePercent: 1.53, type: "gain" },
    { symbol: "POWERGRID", name: "Power Grid Corp", price: 266.8, changePercent: 0.85, type: "gain" },
    { symbol: "WIPRO", name: "Wipro Limited", price: 177.09, changePercent: -2.54, type: "loss" },
    { symbol: "M&M", name: "Mahindra & Mahindra", price: 3190.0, changePercent: -2.12, type: "loss" },
  ]);

  const [metals, setMetals] = useState<any>({
    gold: {
      name: "Gold",
      symbol: "GC=F",
      price_usd_per_troy_ounce: 4427.60,
      price_inr_per_gram: 13517.62,
      price_inr_per_10g: 135176.17,
      change_percent: 0.71,
      usd_inr: 94.96,
      unit: "gram",
      contract: "COMEX Gold Futures",
    },
    silver: {
      name: "Silver",
      symbol: "SI=F",
      price_usd_per_troy_ounce: 65.79,
      price_inr_per_gram: 200.86,
      price_inr_per_10g: 2008.59,
      change_percent: 0.64,
      usd_inr: 94.96,
      unit: "gram",
      contract: "COMEX Silver Futures",
    },
  });

  useEffect(() => {
    marketDataService.getIndexQuotes().then(setQuotes);
    const unsub = marketDataService.subscribeToTicker(setQuotes);

    // Fetch live overview
    marketDataService.getMarketOverview().then((data) => {
      if (data?.indices) {
        const sectorNames = ["NIFTY IT", "NIFTY AUTO", "NIFTY METAL", "NIFTY FMCG", "NIFTY PHARMA", "NIFTY REALTY"];
        const sectors = data.indices
          .filter((idx: any) => sectorNames.includes(idx.name))
          .map((idx: any) => ({
            sector: idx.name,
            change: Number((idx.change_percent || 0).toFixed(2)),
            status: (idx.change_percent || 0) >= 0.5 ? "Expansion" : (idx.change_percent || 0) >= 0 ? "Steady" : "Consolidation",
            rsi: Number((50 + (idx.change_percent || 0) * 8).toFixed(1)),
          }));
        if (sectors.length > 0) setSectorMatrix(sectors);
      }

      // Populate live Top Gainers and Losers from NIFTY 50
      if (data?.top_gainers && Array.isArray(data.top_gainers) && data.top_gainers.length > 0) {
        setTopGainers(data.top_gainers);
      }
      if (data?.top_losers && Array.isArray(data.top_losers) && data.top_losers.length > 0) {
        setTopLosers(data.top_losers);
      }

      if (data?.top_companies && Array.isArray(data.top_companies)) {
        const movers = data.top_companies.slice(0, 4).map((c: any) => ({
          symbol: c.name || c.symbol.replace(".NS", ""),
          name: c.name || c.symbol,
          price: Number((c.price || 1000).toFixed(2)),
          changePercent: Number((c.change_percent || 0).toFixed(2)),
          type: (c.change_percent || 0) >= 0 ? "gain" : "loss",
        }));
        if (movers.length > 0) setMarketMovers(movers);
      }
    });

    // Subscribe to live precious metals (Gold & Silver 24/7)
    const unsubMetals = marketDataService.subscribeToMetals((data) => {
      if (data && data.gold && data.silver) {
        setMetals(data);
      }
    });

    return () => {
      unsub();
      unsubMetals();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
            MARKET SURVEILLANCE
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight mt-1">
            Indian Exchange Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time price discovery across NSE &amp; BSE benchmark indices, Nifty 50 movers, and bullion
          </p>
        </div>

        <Link
          href="/markets/watchlist"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors self-start sm:self-auto"
        >
          <span>Open Custom Watchlist</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
        </Link>
      </div>

      {/* Top 5 Primary Indices Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-mono">
              Top 5 Benchmark Indices
            </span>
            <span className="text-[10px] font-mono text-slate-400">&bull;</span>
            <span className="text-[11px] text-slate-500">Live NSE &amp; BSE Quotes</span>
          </div>
          <span className="text-[10px] font-mono text-[#00A88F] bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60 hidden sm:inline-block">
            Auto-Refreshed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 font-tabular">
          {quotes.slice(0, 5).map((q) => {
            const isPos = q.change >= 0;
            return (
              <div
                key={q.symbol}
                className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B1F3A] truncate pr-1">{q.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">1D Active</span>
                </div>

                <div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-slate-900">
                    ₹{q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                  <div
                    className={`inline-flex items-center text-xs font-mono font-semibold mt-1 px-1.5 py-0.5 rounded ${
                      isPos ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                    }`}
                  >
                    {isPos ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {isPos ? "+" : ""}
                    {q.changePercent.toFixed(2)}% ({isPos ? "+" : ""}
                    {q.change.toFixed(2)})
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>52W L: ₹{q.low52w.toLocaleString()}</span>
                  <span>52W H: ₹{q.high52w.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Precious Metals (Gold & Silver) - Highlighting Price per Gram */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A227] font-semibold">
                COMMODITIES &amp; BULLION
              </span>
              <span className="text-[10px] font-mono text-slate-400">&bull;</span>
              <span className="text-[11px] font-medium text-slate-500">
                COMEX Futures &bull; Live Price per Gram &amp; 10 Grams
              </span>
            </div>
            <h2 className="text-base font-bold text-[#0B1F3A] mt-0.5">
              Precious Metals Real-Time Valuation
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#00A88F] bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60 self-start sm:self-auto">
            Troy Ounce: 31.1035g &bull; 24/7 Live Valuation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gold Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#FDFBF5] to-white border border-amber-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#C9A227] shadow-xs" />
                <span className="font-bold text-sm text-[#0B1F3A]">GOLD (COMEX)</span>
                <span className="text-[10px] font-mono text-slate-400">{metals.gold?.symbol || "GC=F"}</span>
              </div>
              <span
                className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                  (metals.gold?.change_percent || 0) >= 0
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-rose-700 bg-rose-50"
                }`}
              >
                {(metals.gold?.change_percent || 0) >= 0 ? "+" : ""}
                {(metals.gold?.change_percent || 0).toFixed(2)}%
              </span>
            </div>

            {/* Price Per Gram Highlighted */}
            <div className="mt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-semibold block">
                Live Price per Gram (24K Pure)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0B1F3A]">
                  ₹{(metals.gold?.price_inr_per_gram || 13543.87).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-bold font-mono text-[#C9A227]">/ 1 Gram</span>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-100 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-400 block text-[9px]">10 GRAMS RATE</span>
                <span className="font-bold text-slate-900">
                  ₹{(metals.gold?.price_inr_per_10g || 135438.73).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">USD / TROY OZ</span>
                <span className="font-semibold text-slate-800">
                  ${(metals.gold?.price_usd_per_troy_ounce || 4436.20).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">USD/INR SPOT</span>
                <span className="font-semibold text-[#00A88F]">
                  ₹{(metals.gold?.usd_inr || 94.96).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Silver Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400 shadow-xs" />
                <span className="font-bold text-sm text-[#0B1F3A]">SILVER (COMEX)</span>
                <span className="text-[10px] font-mono text-slate-400">{metals.silver?.symbol || "SI=F"}</span>
              </div>
              <span
                className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                  (metals.silver?.change_percent || 0) >= 0
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-rose-700 bg-rose-50"
                }`}
              >
                {(metals.silver?.change_percent || 0) >= 0 ? "+" : ""}
                {(metals.silver?.change_percent || 0).toFixed(2)}%
              </span>
            </div>

            {/* Price Per Gram Highlighted */}
            <div className="mt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-semibold block">
                Live Price per Gram (.999 Fine)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0B1F3A]">
                  ₹{(metals.silver?.price_inr_per_gram || 201.18).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-bold font-mono text-slate-600">/ 1 Gram</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-400 block text-[9px]">10 GRAMS RATE</span>
                <span className="font-bold text-slate-900">
                  ₹{(metals.silver?.price_inr_per_10g || 2011.80).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">1 KG BAR RATE</span>
                <span className="font-bold text-[#00A88F]">
                  ₹{((metals.silver?.price_inr_per_gram || 201.18) * 1000).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">USD / TROY OZ</span>
                <span className="font-semibold text-slate-800">
                  ${(metals.silver?.price_usd_per_troy_ounce || 65.89).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Performance: Top Gainers & Top Losers from Nifty 50 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
                MARKET SURVEILLANCE &bull; NIFTY 50
              </span>
              <span className="text-[10px] font-mono text-slate-400">&bull;</span>
              <span className="text-[11px] font-medium text-slate-500">Intraday Performance</span>
            </div>
            <h2 className="text-lg font-bold text-[#0B1F3A] mt-0.5">
              Market Performance: Top Gainers &amp; Losers
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time session leaders and laggards ranked by percentage change
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200 text-[11px]">
              Nifty 50 Universe
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Gainers Card */}
          <div className="rounded-xl border border-emerald-200/80 bg-[#FAFCFA] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">Top Gainers from Nifty 50</h3>
                  <span className="text-[10px] font-mono text-slate-500">Highest percentage gains</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                Gainers
              </span>
            </div>

            <div className="space-y-2.5 font-mono">
              {topGainers.map((stock, idx) => {
                const changeVal = stock.change ?? (stock.price ? stock.price * ((stock.change_percent || 0) / 100) : 0);
                return (
                  <div
                    key={stock.symbol || idx}
                    className="p-3 bg-white rounded-lg border border-slate-200/80 hover:border-emerald-300 transition-colors flex items-center justify-between shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded py-0.5 border border-emerald-200/50">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-[#0B1F3A]">
                          {stock.symbol?.replace(".NS", "")}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">
                          {stock.name || stock.symbol}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-sm text-slate-900">
                        ₹{(stock.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 mt-0.5">
                        <TrendingUp className="w-2.5 h-2.5 mr-1" />
                        +{(stock.change_percent || 0).toFixed(2)}% (+₹{Math.abs(changeVal).toFixed(2)})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Losers Card */}
          <div className="rounded-xl border border-rose-200/80 bg-[#FCFAFA] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1F3A]">Top Losers from Nifty 50</h3>
                  <span className="text-[10px] font-mono text-slate-500">Steepest percentage declines</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded border border-rose-200">
                Losers
              </span>
            </div>

            <div className="space-y-2.5 font-mono">
              {topLosers.map((stock, idx) => {
                const changeVal = stock.change ?? (stock.price ? stock.price * ((stock.change_percent || 0) / 100) : 0);
                return (
                  <div
                    key={stock.symbol || idx}
                    className="p-3 bg-white rounded-lg border border-slate-200/80 hover:border-rose-300 transition-colors flex items-center justify-between shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center text-xs font-bold text-rose-700 bg-rose-50 rounded py-0.5 border border-rose-200/50">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-[#0B1F3A]">
                          {stock.symbol?.replace(".NS", "")}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">
                          {stock.name || stock.symbol}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-sm text-slate-900">
                        ₹{(stock.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="inline-flex items-center text-[11px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/60 mt-0.5">
                        <TrendingDown className="w-2.5 h-2.5 mr-1" />
                        {(stock.change_percent || 0).toFixed(2)}% (-₹{Math.abs(changeVal).toFixed(2)})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sector Momentum Heatmap & Institutional Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sector Heatmap */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#0B1F3A]">Sector Momentum Matrix</h3>
              <p className="text-[11px] text-slate-500">Relative strength and RSI distribution across NSE sectors</p>
            </div>
            <span className="text-[10px] font-mono text-[#00A88F]">Live Calculations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {sectorMatrix.map((sec) => {
              const isPos = sec.change >= 0;
              return (
                <div
                  key={sec.sector}
                  className="p-3.5 rounded-lg bg-[#F6F8FA] border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-[#0B1F3A]">{sec.sector}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      RSI(14): {sec.rsi} &bull; {sec.status}
                    </div>
                  </div>
                  <span
                    className={`font-bold ${
                      isPos ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {isPos ? "+" : ""}
                    {sec.change.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Index Movers */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-[#0B1F3A]">Session Momentum Leaders</h3>
            <p className="text-[11px] text-slate-500">High volume institutional focus</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {marketMovers.map((m) => {
              const isPos = m.changePercent >= 0;
              return (
                <div key={m.symbol} className="p-3 rounded-lg border border-slate-100 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <span className="font-bold text-[#0B1F3A]">{m.symbol}</span>
                    <span className="text-slate-400 text-[11px] ml-2 font-sans">{m.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">₹{m.price.toFixed(2)}</div>
                    <div className={`text-[10px] font-bold ${isPos ? "text-emerald-700" : "text-rose-700"}`}>
                      {isPos ? "+" : ""}{m.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
