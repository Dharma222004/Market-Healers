"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { dhaleoServiceExtended, IScreenerFilter } from "@/lib/services/aiServicesExtended";
import {
  Filter,
  SlidersHorizontal,
  RefreshCw,
  Search,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

export default function DhaleoScreenerPage() {
  const [results, setResults] = useState<any[]>([]);
  const [sector, setSector] = useState<string>("All");
  const [maxPe, setMaxPe] = useState<number>(40);
  const [minRoe, setMinRoe] = useState<number>(15);
  const [minRoce, setMinRoce] = useState<number>(15);
  const [maxDebt, setMaxDebt] = useState<number>(1.0);
  const [loading, setLoading] = useState(false);

  const runScreen = () => {
    setLoading(true);
    dhaleoServiceExtended
      .screenStocks({
        sector: sector === "All" ? undefined : sector,
        maxPe,
        minRoe,
        minRoce,
        maxDebtToEquity: maxDebt,
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    runScreen();
  }, [sector, maxPe, minRoe, minRoce, maxDebt]);

  const handleReset = () => {
    setSector("All");
    setMaxPe(50);
    setMinRoe(10);
    setMinRoce(10);
    setMaxDebt(1.5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/ai-tools" className="p-1.5 rounded text-slate-500 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00A88F]" />
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                Dhaleo AI // Stock Screener
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical multi-factor quantitative discovery across 2,400+ Indian equities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Reset Filters
          </button>
          <button
            onClick={runScreen}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Run Screen</span>
          </button>
        </div>
      </div>

      {/* Standalone Official Website Launch Banner */}
      <div className="p-3.5 bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#0B1F3A]">Official Standalone Screener Platform</p>
            <p className="text-[11px] text-slate-500">Access the full standalone Dhaleo Screener at <strong className="text-blue-600">dhaleo.vercel.app</strong></p>
          </div>
        </div>
        <a
          href="https://dhaleo.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors self-start sm:self-auto"
        >
          <span>Open dhaleo.vercel.app ↗</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#00A88F]" />
        </a>
      </div>

      {/* Main Dual Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#00A88F]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Screener Parameters
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Strict Quantitative</span>
          </div>

          {/* Sector Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Sector Classification
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#00A88F] text-slate-800 bg-white"
            >
              <option value="All">All Sectors (Consolidated)</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Banking & Financials">Banking &amp; Financials</option>
              <option value="Energy & Conglomerate">Energy &amp; Conglomerate</option>
              <option value="Capital Goods & Infra">Capital Goods &amp; Infra</option>
              <option value="Consumer Discretionary">Consumer Discretionary</option>
            </select>
          </div>

          {/* Max P/E Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Maximum P/E Ratio:</span>
              <span className="font-mono text-[#0B1F3A]">&le; {maxPe}x</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={maxPe}
              onChange={(e) => setMaxPe(Number(e.target.value))}
              className="w-full accent-[#00A88F]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>10x (Deep Value)</span>
              <span>90x (High Growth)</span>
            </div>
          </div>

          {/* Min ROE Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Minimum ROE (%):</span>
              <span className="font-mono text-[#0B1F3A]">&ge; {minRoe}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="45"
              value={minRoe}
              onChange={(e) => setMinRoe(Number(e.target.value))}
              className="w-full accent-[#00A88F]"
            />
          </div>

          {/* Min ROCE Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Minimum ROCE (%):</span>
              <span className="font-mono text-[#0B1F3A]">&ge; {minRoce}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={minRoce}
              onChange={(e) => setMinRoce(Number(e.target.value))}
              className="w-full accent-[#00A88F]"
            />
          </div>

          {/* Max Debt to Equity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Max Debt-to-Equity:</span>
              <span className="font-mono text-[#0B1F3A]">&le; {maxDebt}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={maxDebt}
              onChange={(e) => setMaxDebt(Number(e.target.value))}
              className="w-full accent-[#00A88F]"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-relaxed">
            *Dhaleo screens based on historical quarterly audited filings. Does not guarantee future stock performance.
          </div>
        </div>

        {/* Right Results Table Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-[#0B1F3A]">Filtered Equities</span>
              <span className="text-xs text-slate-500 ml-2">
                ({results.length} companies match criteria)
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#00A88F]">NSE/BSE Database Connected</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No companies match the chosen parameters. Try easing P/E or ROE constraints.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Company</th>
                    <th className="py-2.5 px-3">Price</th>
                    <th className="py-2.5 px-3">P/E</th>
                    <th className="py-2.5 px-3">P/B</th>
                    <th className="py-2.5 px-3">ROE</th>
                    <th className="py-2.5 px-3">ROCE</th>
                    <th className="py-2.5 px-3">Debt/Eq</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map((item) => (
                    <tr key={item.symbol} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0B1F3A]">{item.symbol}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{item.name}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-slate-700">{item.pe}x</td>
                      <td className="py-3 px-3 text-slate-700">{item.pb}x</td>
                      <td className="py-3 px-3 text-emerald-700 font-bold">{item.roe}%</td>
                      <td className="py-3 px-3 text-emerald-700 font-bold">{item.roce}%</td>
                      <td className="py-3 px-3 text-slate-600">{item.debtToEquity}x</td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/ai-tools/jaro?symbol=${item.symbol}`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00A88F] hover:underline"
                        >
                          <span>Analyze in Jaro</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
