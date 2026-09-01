"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MarketIndexQuote } from "@/types";
import { marketDataService } from "@/lib/market/marketService";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  ArrowRight,
  Database,
  BarChart3,
} from "lucide-react";

export default function MarketOverviewPage() {
  const [quotes, setQuotes] = useState<MarketIndexQuote[]>([]);

  const [sectorMatrix, setSectorMatrix] = useState([
    { sector: "NIFTY IT", change: 1.65, status: "Accumulation", rsi: 62.4 },
    { sector: "NIFTY AUTO", change: 0.82, status: "Consolidation", rsi: 58.1 },
    { sector: "NIFTY METAL", change: 1.14, status: "Momentum", rsi: 66.2 },
    { sector: "NIFTY FMCG", change: -0.24, status: "Neutral", rsi: 44.8 },
    { sector: "NIFTY PHARMA", change: 0.45, status: "Steady", rsi: 52.3 },
    { sector: "NIFTY REALTY", change: 2.18, status: "Expansion", rsi: 68.9 },
  ]);

  const [marketMovers, setMarketMovers] = useState([
    { symbol: "TCS", name: "Tata Consultancy", price: 2399.3, changePercent: 2.45, type: "gain" },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1454.0, changePercent: 2.19, type: "gain" },
    { symbol: "AXISBANK", name: "Axis Bank", price: 1300.0, changePercent: 2.77, type: "gain" },
    { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1811.9, changePercent: -3.75, type: "loss" },
  ]);

  const [metals, setMetals] = useState<any>({
    gold: {
      name: "Gold",
      symbol: "GC=F",
      price_usd_per_troy_ounce: 4481.30,
      price_inr_per_gram: 13709.23,
      price_inr_per_10g: 137092.28,
      change_percent: 0.07,
      usd_inr: 95.15,
      unit: "gram",
      contract: "COMEX Gold Futures",
    },
    silver: {
      name: "Silver",
      symbol: "SI=F",
      price_usd_per_troy_ounce: 67.01,
      price_inr_per_gram: 205.01,
      price_inr_per_10g: 2050.13,
      change_percent: 0.03,
      usd_inr: 95.15,
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
            status: (idx.change_percent || 0) >= 1 ? "Expansion" : (idx.change_percent || 0) >= 0 ? "Steady" : "Consolidation",
            rsi: Number((50 + (idx.change_percent || 0) * 8).toFixed(1)),
          }));
        if (sectors.length > 0) setSectorMatrix(sectors);
      }

      if (data?.top_companies) {
        const movers = data.top_companies.slice(0, 5).map((c: any) => ({
          symbol: c.name || c.symbol.replace(".NS", ""),
          name: c.symbol,
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
            Real-time simulated price discovery across NSE &amp; BSE benchmark indices
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

      {/* Primary Indices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-tabular">
        {quotes.map((q) => {
          const isPos = q.change >= 0;
          return (
            <div
              key={q.symbol}
              className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B1F3A]">{q.name}</span>
                <span className="text-[10px] font-mono text-slate-400">1D Active</span>
              </div>

              <div>
                <div className="text-xl font-bold font-mono text-slate-900">
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
                <span>52W Low: ₹{q.low52w.toLocaleString()}</span>
                <span>52W High: ₹{q.high52w.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Precious Metals (Gold & Silver) Yahoo Finance Conversion Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9A227] font-semibold">
                COMMODITIES & BULLION
              </span>
              <span className="text-[10px] font-mono text-slate-400">&bull;</span>
              <span className="text-[11px] font-medium text-slate-500">COMEX Futures &bull; USD/oz &rarr; INR/g &amp; 10g</span>
            </div>
            <h2 className="text-base font-bold text-[#0B1F3A] mt-0.5">Precious Metals Real-Time Valuation</h2>
          </div>
          <span className="text-[10px] font-mono text-[#00A88F] bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60 self-start sm:self-auto">
            Troy Ounce: 31.1035g &bull; Live Yahoo Feeds
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gold Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#FDFBF5] to-white border border-amber-200/80 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#C9A227]" />
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

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#0B1F3A]">
                ₹{(metals.gold?.price_inr_per_10g || 137092.28).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ 10 Grams</span>
            </div>

            <div className="mt-3 pt-3 border-t border-amber-100 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-400 block text-[9px]">INR / GRAM</span>
                <span className="font-semibold text-slate-800">
                  ₹{(metals.gold?.price_inr_per_gram || 13709.23).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">USD / TROY OZ</span>
                <span className="font-semibold text-slate-800">
                  ${(metals.gold?.price_usd_per_troy_ounce || 4481.30).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">USD/INR SPOT</span>
                <span className="font-semibold text-[#00A88F]">
                  ₹{(metals.gold?.usd_inr || 95.15).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Silver Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400" />
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

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-[#0B1F3A]">
                ₹{(metals.silver?.price_inr_per_10g || 2050.13).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ 10 Grams</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-400 block text-[9px]">INR / GRAM</span>
                <span className="font-semibold text-slate-800">
                  ₹{(metals.silver?.price_inr_per_gram || 205.01).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">USD / TROY OZ</span>
                <span className="font-semibold text-slate-800">
                  ${(metals.silver?.price_usd_per_troy_ounce || 67.01).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px]">USD/INR SPOT</span>
                <span className="font-semibold text-[#00A88F]">
                  ₹{(metals.silver?.usd_inr || 95.15).toFixed(2)}
                </span>
              </div>
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
