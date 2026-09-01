import React from "react";
import Link from "next/link";
import { BarChart3, Database, ShieldAlert, Cpu, Check, Layers } from "lucide-react";

export const AnalysisTools: React.FC = () => {
  return (
    <section id="market-analysis" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00A88F]">
              INTEGRATED TERMINAL ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight leading-tight">
              Institutional Analysis Without Institutional Overhead.
            </h2>
            <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
              Traditional market tools are either fragmented or cost thousands of dollars per month. Market Healers aggregates balance sheet analytics, screener queries, technical indicators, and machine learning models in a clean, high-density environment.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-teal-50 text-[#00A88F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0B1F3A]">Multi-Factor Equity Screening</h4>
                  <p className="text-xs text-slate-500">Run combinatorial filters across P/E, ROCE, debt-to-equity, and 52-week momentum.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-teal-50 text-[#00A88F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0B1F3A]">Real-Time Market Indicators</h4>
                  <p className="text-xs text-slate-500">Clean candlestick and volume profiles with moving average crossovers and Bollinger bands.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-teal-50 text-[#00A88F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0B1F3A]">Automated Company Dossiers</h4>
                  <p className="text-xs text-slate-500">Consolidated financial health scores, margin trends, and regulatory warning flags.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md transition-colors"
              >
                <span>Launch Analysis Workspace</span>
                <span className="text-[#00A88F]">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: High Density Terminal Preview */}
          <div className="lg:col-span-7 bg-[#08111F] rounded-xl border border-[#1E2D44] p-6 text-slate-200 shadow-2xl font-mono text-xs">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2D44] text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#00A88F]" />
                <span className="text-white font-semibold">WORKSPACE_VIEW // NIFTY_ANALYSIS</span>
              </div>
              <span className="text-emerald-400">ENGINE STATUS: OPTIMAL</span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              <div className="p-3 bg-[#0E1A2B] border border-[#1E2D44] rounded">
                <div className="text-[10px] uppercase text-slate-500">PE Median (Nifty)</div>
                <div className="text-sm font-bold text-white mt-0.5">22.4x</div>
                <div className="text-[10px] text-emerald-400">Fair Value Zone</div>
              </div>
              <div className="p-3 bg-[#0E1A2B] border border-[#1E2D44] rounded">
                <div className="text-[10px] uppercase text-slate-500">India VIX</div>
                <div className="text-sm font-bold text-white mt-0.5">13.42</div>
                <div className="text-[10px] text-emerald-400">Low Volatility</div>
              </div>
              <div className="p-3 bg-[#0E1A2B] border border-[#1E2D44] rounded">
                <div className="text-[10px] uppercase text-slate-500">FII Net Flow (1D)</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">+₹1,420 Cr</div>
                <div className="text-[10px] text-slate-400">Inflow</div>
              </div>
              <div className="p-3 bg-[#0E1A2B] border border-[#1E2D44] rounded">
                <div className="text-[10px] uppercase text-slate-500">DII Net Flow (1D)</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">+₹2,180 Cr</div>
                <div className="text-[10px] text-slate-400">Inflow</div>
              </div>
            </div>

            {/* Terminal Content Table */}
            <div className="bg-[#0A1321] rounded border border-[#18263A] p-3 space-y-2">
              <div className="text-[11px] font-semibold text-slate-300 pb-1 border-b border-slate-800">
                ACTIVE SECTOR MOMENTUM MATRIX
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                  <span className="text-white">NIFTY IT</span>
                  <span className="text-emerald-400">+1.65%</span>
                  <span className="text-slate-400">RSI(14): 62.4</span>
                  <span className="text-[#00A88F]">ACCUMULATION</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                  <span className="text-white">NIFTY AUTO</span>
                  <span className="text-emerald-400">+0.82%</span>
                  <span className="text-slate-400">RSI(14): 58.1</span>
                  <span className="text-slate-300">CONSOLIDATION</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/40">
                  <span className="text-white">NIFTY FMCG</span>
                  <span className="text-rose-400">-0.24%</span>
                  <span className="text-slate-400">RSI(14): 44.8</span>
                  <span className="text-slate-500">NEUTRAL</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-white">NIFTY METAL</span>
                  <span className="text-emerald-400">+1.14%</span>
                  <span className="text-slate-400">RSI(14): 66.2</span>
                  <span className="text-[#00A88F]">MOMENTUM</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 text-[10px] text-slate-500 flex items-center justify-between">
              <span>Latency: 42ms &bull; Cleaned Institutional Data</span>
              <span className="text-[#C9A227]">Terminal Abstraction: v4.2</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
