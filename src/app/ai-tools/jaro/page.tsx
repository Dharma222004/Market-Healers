"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { jaroServiceExtended } from "@/lib/services/aiServicesExtended";
import {
  LineChart,
  Search,
  ArrowLeft,
  ShieldAlert,
  BarChart3,
  Layers,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function JaroWorkspacePage() {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams?.get("symbol") || "RELIANCE";

  const [symbolQuery, setSymbolQuery] = useState(initialSymbol);
  const [activeSymbol, setActiveSymbol] = useState(initialSymbol);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "fundamentals" | "technicals" | "peers" | "risks">("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    jaroServiceExtended.analyzeCompany(activeSymbol).then((data) => {
      setAnalysis(data);
      setLoading(false);
    });
  }, [activeSymbol]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbolQuery.trim()) return;
    setActiveSymbol(symbolQuery.toUpperCase().trim());
  };

  const quickPicks = ["RELIANCE", "TCS", "HDFCBANK", "INFY", "LT"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/ai-tools" className="p-1.5 rounded text-slate-500 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                Jaro AI // Analyst Workspace
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Consolidated equity dossiers synthesizing audited statements, technicals, and risks
            </p>
          </div>
        </div>

        {/* Company Search Input */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={symbolQuery}
              onChange={(e) => setSymbolQuery(e.target.value)}
              placeholder="Search ticker (e.g. TCS)..."
              className="pl-8 pr-3 py-1.5 text-xs font-mono border border-slate-300 rounded-md focus:outline-none focus:border-[#00A88F] text-slate-800 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md transition-colors"
          >
            Analyze
          </button>
        </form>
      </div>

      {/* Prominent Coming Soon Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border border-amber-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-amber-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
            Coming Soon
          </span>
          <div>
            <p className="text-xs font-bold text-slate-800">Jaro AI Analyst Workspace is Currently in Development</p>
            <p className="text-[11px] text-slate-500">Preview demo interface below. The full institutional version will be released soon.</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2.5 py-1 rounded font-semibold border border-amber-300 self-start sm:self-auto">
          In Active Engineering
        </span>
      </div>

      {/* Quick Symbol Chips */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold shrink-0">
          Quick Tickers:
        </span>
        {quickPicks.map((sym) => (
          <button
            key={sym}
            onClick={() => {
              setSymbolQuery(sym);
              setActiveSymbol(sym);
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors ${
              activeSymbol === sym
                ? "bg-[#0B1F3A] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {sym}
          </button>
        ))}
      </div>

      {loading || !analysis ? (
        <div className="py-20 text-center text-slate-400 text-xs font-mono animate-pulse">
          Generating Jaro composite equity dossier...
        </div>
      ) : (
        <div className="space-y-6">
          {/* Company Dossier Header Card */}
          <div className="bg-[#08111F] text-slate-200 border border-[#1E2D44] rounded-xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-mono text-white">
                  {analysis.symbol} // NSE
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#0E1A2B] border border-slate-700 text-slate-300">
                  {analysis.sector}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">{analysis.name}</div>
            </div>

            <div className="flex items-center gap-6 font-tabular">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">Current Price</div>
                <div className="text-xl font-bold font-mono text-white">
                  ₹{analysis.price.toFixed(2)}
                </div>
              </div>

              <div className="pl-6 border-l border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-400">Composite Health</div>
                <div className="text-xl font-bold font-mono text-[#00A88F]">
                  {analysis.overallHealthScore} / 10
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto scrollbar-none">
            {[
              { id: "overview", label: "Executive Overview" },
              { id: "fundamentals", label: "Fundamental Multiples" },
              { id: "technicals", label: "Technical Regime" },
              { id: "peers", label: "Peer Comparison" },
              { id: "risks", label: "Key Risk Factors" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#00A88F] text-[#0B1F3A] font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6 text-xs sm:text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                  <div className="p-4 rounded-lg bg-[#F6F8FA] border border-slate-200">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Valuation Regime</div>
                    <div className="text-sm font-bold text-[#0B1F3A] mt-1">{analysis.valuationAssessment}</div>
                    <p className="text-xs text-slate-500 mt-1 font-sans">
                      Trades at {analysis.fundamentals.pe}x P/E relative to 5-year median.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#F6F8FA] border border-slate-200">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Technical Alignment</div>
                    <div className="text-sm font-bold text-emerald-700 mt-1">Bullish Support</div>
                    <p className="text-xs text-slate-500 mt-1 font-sans">
                      {analysis.technicalRegime}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#F6F8FA] border border-slate-200">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Balance Sheet Moat</div>
                    <div className="text-sm font-bold text-[#00A88F] mt-1">
                      {analysis.fundamentals.debtToEquity < 0.5 ? "Low Leverage" : "Manageable Leverage"}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-sans">
                      Debt-to-equity of {analysis.fundamentals.debtToEquity}x.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Jaro Analyst Assessment Synthesis
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                    {analysis.name} demonstrates superior capital efficiency with an operating cash flow generation exceeding ₹{analysis.fundamentals.operatingCashFlowCr.toLocaleString()} Cr. The company continues to sustain industry-leading margins while investing heavily in digital and capital expansions.
                  </p>
                </div>
              </div>
            )}

            {/* FUNDAMENTALS TAB */}
            {activeTab === "fundamentals" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#0B1F3A]">Audited Financial Metrics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">P/E Ratio</span>
                    <div className="text-base font-bold text-[#0B1F3A] mt-0.5">{analysis.fundamentals.pe}x</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">P/B Ratio</span>
                    <div className="text-base font-bold text-[#0B1F3A] mt-0.5">{analysis.fundamentals.pb}x</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">ROE (%)</span>
                    <div className="text-base font-bold text-emerald-700 mt-0.5">{analysis.fundamentals.roe}%</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">ROCE (%)</span>
                    <div className="text-base font-bold text-emerald-700 mt-0.5">{analysis.fundamentals.roce}%</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">Debt / Equity</span>
                    <div className="text-base font-bold text-slate-800 mt-0.5">{analysis.fundamentals.debtToEquity}x</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">Dividend Yield</span>
                    <div className="text-base font-bold text-slate-800 mt-0.5">{analysis.fundamentals.dividendYield}%</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">Free Cash Flow Yield</span>
                    <div className="text-base font-bold text-slate-800 mt-0.5">{analysis.fundamentals.fcfYield}%</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">Operating Cash Flow</span>
                    <div className="text-base font-bold text-slate-800 mt-0.5">₹{analysis.fundamentals.operatingCashFlowCr / 1000}k Cr</div>
                  </div>
                </div>
              </div>
            )}

            {/* TECHNICALS TAB */}
            {activeTab === "technicals" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#0B1F3A]">Technical Structure & Moving Averages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">20 EMA (Short Momentum)</span>
                    <div className="text-sm font-bold text-[#0B1F3A] mt-1">₹2,990.50 (Support)</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">50 EMA (Medium Trend)</span>
                    <div className="text-sm font-bold text-[#00A88F] mt-1">₹2,940.20 (Active Base)</div>
                  </div>
                  <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase">200 EMA (Macro Floor)</span>
                    <div className="text-sm font-bold text-slate-700 mt-1">₹2,780.00 (Anchor)</div>
                  </div>
                </div>
              </div>
            )}

            {/* PEERS TAB */}
            {activeTab === "peers" && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0B1F3A]">Sector Peer Benchmark</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                        <th className="py-2 px-3">Ticker</th>
                        <th className="py-2 px-3">P/E</th>
                        <th className="py-2 px-3">ROE</th>
                        <th className="py-2 px-3 text-right">Market Cap</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {analysis.peers.map((peer: any) => (
                        <tr key={peer.symbol} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-[#0B1F3A]">{peer.symbol}</td>
                          <td className="py-2.5 px-3 text-slate-700">{peer.pe}x</td>
                          <td className="py-2.5 px-3 text-emerald-700 font-semibold">{peer.roe}%</td>
                          <td className="py-2.5 px-3 text-right text-slate-700">{peer.mcap}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* RISKS TAB */}
            {activeTab === "risks" && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-rose-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Identified Risk Factors</span>
                </h3>
                <div className="space-y-2">
                  {analysis.risks.map((risk: string, i: number) => (
                    <div key={i} className="p-3 bg-rose-50/50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
