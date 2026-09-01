"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { marketDataService } from "@/lib/market/marketService";
import { MarketIndexQuote } from "@/types";
import {
  TrendingUp,
  TrendingDown,
  Info,
  Layers,
  Sparkles,
  Compass,
} from "lucide-react";

export const MarketIntelligenceHeroVisual: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<"1D" | "1W" | "1M" | "1Y">("1D");
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number; price: number; time: string } | null>(null);
  const [quotes, setQuotes] = useState<MarketIndexQuote[]>([
    {
      symbol: "NIFTY 50",
      name: "NIFTY 50",
      price: 24080.40,
      change: -95.25,
      changePercent: -0.39,
      high52w: 26277.35,
      low52w: 21280.0,
      lastUpdated: "15m &bull; Yahoo Finance",
    },
    {
      symbol: "SENSEX",
      name: "BSE SENSEX",
      price: 76957.27,
      change: -307.23,
      changePercent: -0.40,
      high52w: 85978.25,
      low52w: 65120.0,
      lastUpdated: "15m &bull; Yahoo Finance",
    },
    {
      symbol: "BANK NIFTY",
      name: "NIFTY BANK",
      price: 58024.95,
      change: 528.65,
      changePercent: 0.92,
      high52w: 58500.0,
      low52w: 43229.6,
      lastUpdated: "15m &bull; Yahoo Finance",
    },
  ]);

  useEffect(() => {
    let isMounted = true;
    marketDataService.getIndexQuotes().then((data) => {
      if (isMounted && data && data.length >= 3) {
        setQuotes(data);
      }
    });

    const unsub = marketDataService.subscribeToTicker((updated) => {
      if (isMounted && updated && updated.length >= 3) {
        setQuotes(updated);
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  const niftyQuote = quotes.find((q) => q.symbol === "NIFTY 50") || quotes[0];
  const sensexQuote = quotes.find((q) => q.symbol === "SENSEX") || quotes[1];
  const bankNiftyQuote = quotes.find((q) => q.symbol === "BANK NIFTY") || quotes[2];

  // Editorial chart points for smooth line rendering across timeframes
  const chartDatasets: Record<"1D" | "1W" | "1M" | "1Y", { points: number[]; labels: string[]; basePrice: number }> = {
    "1D": {
      basePrice: 24000,
      points: [24050, 24040, 24020, 24035, 24060, 24055, 24075, 24080.4],
      labels: ["09:15", "10:00", "11:00", "12:00", "13:00", "14:00", "14:45", "15:30"],
    },
    "1W": {
      basePrice: 23900,
      points: [23880, 23920, 23960, 24010, 23990, 24040, 24080.4],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Mon", "Today"],
    },
    "1M": {
      basePrice: 23600,
      points: [23650, 23780, 23720, 23890, 24100, 24020, 24080.4],
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Current"],
    },
    "1Y": {
      basePrice: 21500,
      points: [21400, 22100, 22600, 23200, 23900, 24500, 24080.4],
      labels: ["Q1", "Q2", "Q3", "Q4", "Current"],
    },
  };

  const currentData = chartDatasets[activeTimeframe];
  const minVal = Math.min(...currentData.points) * 0.998;
  const maxVal = Math.max(...currentData.points) * 1.002;
  const range = maxVal - minVal || 1;

  const svgWidth = 480;
  const svgHeight = 150;

  // Convert points to SVG coordinates
  const coords = currentData.points.map((val, idx) => {
    const x = (idx / (currentData.points.length - 1)) * (svgWidth - 20) + 10;
    const y = svgHeight - 15 - ((val - minVal) / range) * (svgHeight - 35);
    return { x, y, price: val, time: currentData.labels[idx] || "" };
  });

  // Build SVG path
  const linePath = coords.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${svgHeight} L ${coords[0].x} ${svgHeight} Z`;

  return (
    <div className="relative w-full select-none text-left">
      {/* Background Precision Financial Data Grid */}
      <div className="absolute -inset-4 sm:-inset-6 border border-slate-200/80 rounded-2xl bg-white/40 shadow-xs pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGridPattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGridPattern)" />
        </svg>
      </div>

      {/* Layered Composition: Desktop Asymmetric Layout / Mobile Clean Stack */}
      <div className="relative z-10 space-y-4">
        
        {/* Row 1: Primary Market Chart Card (Main Foundation) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">
          
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  MARKET INTELLIGENCE &bull; BENCHMARK
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-teal-50 text-[#00A88F] border border-teal-200/50">
                  Live Discovery
                </span>
              </div>

              <div className="flex items-baseline gap-3 mt-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0B1F3A] tracking-tight">
                  NIFTY 50
                </span>
                <span className="text-xl sm:text-2xl font-semibold font-mono text-slate-800">
                  {niftyQuote.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`inline-flex items-center text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                    niftyQuote.change >= 0
                      ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60"
                      : "text-rose-700 bg-rose-50 border border-rose-200/60"
                  }`}
                >
                  {niftyQuote.change >= 0 ? "+" : ""}
                  {niftyQuote.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Clean Editorial Timeframe Filter */}
            <div className="flex items-center bg-slate-100/90 p-0.5 rounded-lg border border-slate-200/80 self-start sm:self-center">
              {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    activeTimeframe === tf
                      ? "bg-white text-[#0B1F3A] shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Smooth Line / Area Visualization */}
          <div className="relative pt-4 pb-1">
            {/* Subtle guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 px-2 py-4">
              <div className="border-b border-dashed border-slate-200 text-[9px] font-mono text-slate-400 text-right">
                {maxVal.toFixed(0)}
              </div>
              <div className="border-b border-dashed border-slate-200 text-[9px] font-mono text-slate-400 text-right">
                {((maxVal + minVal) / 2).toFixed(0)}
              </div>
              <div className="border-b border-dashed border-slate-200 text-[9px] font-mono text-slate-400 text-right">
                {minVal.toFixed(0)}
              </div>
            </div>

            {/* SVG Chart Line & Fill */}
            <div className="relative h-40 w-full">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                onMouseLeave={() => setHoverPoint(null)}
              >
                <defs>
                  <linearGradient id="niftyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00A88F" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#00A88F" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area under curve */}
                <path d={areaPath} fill="url(#niftyGradient)" />

                {/* Smooth Curve Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#00A88F"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />

                {/* Interactive Points on Line */}
                {coords.map((pt, i) => (
                  <g key={i}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="4"
                      className="fill-white stroke-[#00A88F] stroke-[2px] cursor-pointer hover:r-5 transition-all"
                      onMouseEnter={() => setHoverPoint(pt)}
                    />
                  </g>
                ))}

                {/* Hover indicator guideline */}
                {hoverPoint && (
                  <line
                    x1={hoverPoint.x}
                    y1={0}
                    x2={hoverPoint.x}
                    y2={svgHeight}
                    stroke="#0B1F3A"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.6"
                  />
                )}
              </svg>

              {/* Tooltip on Hover */}
              {hoverPoint && (
                <div
                  className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-8 bg-[#0B1F3A] text-white text-[10px] font-mono px-2.5 py-1 rounded shadow-md border border-slate-700"
                  style={{
                    left: `${(hoverPoint.x / svgWidth) * 100}%`,
                    top: `${(hoverPoint.y / svgHeight) * 100}%`,
                  }}
                >
                  <span className="text-slate-300">{hoverPoint.time}: </span>
                  <span className="font-bold text-[#00A88F]">₹{hoverPoint.price.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Time labels below chart */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-2 pt-2 border-t border-slate-100">
              {currentData.labels.map((lbl, idx) => (
                <span key={idx}>{lbl}</span>
              ))}
            </div>
          </div>

          {/* Education Connection Bar */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A88F] bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                UNDERSTAND THE MOVE
              </span>
              <span className="text-slate-600 font-medium text-[11px]">
                Learn what market movements mean, not just where prices move.
              </span>
            </div>
            <Link
              href="/learn/courses"
              className="text-[11px] font-semibold text-[#0B1F3A] hover:text-[#00A88F] flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <span>Explore Curriculum &rarr;</span>
            </Link>
          </div>

        </div>

        {/* Row 2: Secondary Overlapping Layer: Index Snapshots + Market Pulse + AI Intelligence */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          
          {/* Index Snapshot Cards (5 Cols) */}
          <div className="md:col-span-5 grid grid-cols-2 gap-2.5">
            {/* SENSEX Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="text-[10px] font-mono uppercase text-slate-400">BSE SENSEX</div>
              <div className="text-base font-bold font-mono text-[#0B1F3A] mt-0.5">
                {sensexQuote.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
              <div
                className={`inline-flex items-center text-[10px] font-mono font-medium mt-1 px-1.5 py-0.5 rounded ${
                  sensexQuote.change >= 0
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-rose-700 bg-rose-50"
                }`}
              >
                {sensexQuote.change >= 0 ? (
                  <TrendingUp className="w-2.5 h-2.5 mr-1 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-2.5 h-2.5 mr-1 text-rose-600" />
                )}
                {sensexQuote.change >= 0 ? "+" : ""}
                {sensexQuote.changePercent.toFixed(2)}%
              </div>
            </div>

            {/* BANK NIFTY Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="text-[10px] font-mono uppercase text-slate-400">BANK NIFTY</div>
              <div className="text-base font-bold font-mono text-[#0B1F3A] mt-0.5">
                {bankNiftyQuote.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
              <div
                className={`inline-flex items-center text-[10px] font-mono font-medium mt-1 px-1.5 py-0.5 rounded ${
                  bankNiftyQuote.change >= 0
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-rose-700 bg-rose-50"
                }`}
              >
                {bankNiftyQuote.change >= 0 ? (
                  <TrendingUp className="w-2.5 h-2.5 mr-1 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-2.5 h-2.5 mr-1 text-rose-600" />
                )}
                {bankNiftyQuote.change >= 0 ? "+" : ""}
                {bankNiftyQuote.changePercent.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Market Pulse (3 Cols) */}
          <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase font-semibold text-slate-500">
                MARKET PULSE
              </span>
              <span className="text-[9px] font-mono text-slate-400">NSE Breadth</span>
            </div>

            {/* Distribution Bar */}
            <div className="my-2">
              <div className="h-2 w-full rounded-full flex overflow-hidden bg-slate-100">
                <div style={{ width: "54%" }} className="bg-[#00A88F] h-full" title="Advancing: 1,284" />
                <div style={{ width: "39%" }} className="bg-rose-500/80 h-full" title="Declining: 932" />
                <div style={{ width: "7%" }} className="bg-slate-300 h-full" title="Unchanged: 146" />
              </div>
            </div>

            {/* Compact Numbers */}
            <div className="flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F]" />
                <span className="text-slate-600">Adv: 1,284</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="text-slate-600">Dec: 932</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-slate-400">146</span>
              </div>
            </div>
          </div>

          {/* Market Healers Intelligence Panel (4 Cols) */}
          <div className="md:col-span-4 bg-[#0B1F3A] border border-[#132742] rounded-xl p-3.5 text-white shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C9A227]" />
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-200">
                  MARKET HEALERS INTELLIGENCE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 font-medium leading-snug my-1.5">
              &ldquo;Markets are showing mixed momentum today.&rdquo;
            </p>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Powered by:</span>
              <span className="text-[#00A88F] font-semibold">
                Ruzhaa &bull; Dhaleo &bull; Jaro
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
