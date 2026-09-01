"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Filter,
  Compass,
  LineChart,
  Cpu,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  X,
} from "lucide-react";

export const AiProductsShowcase: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    "ruzhaa" | "dhaleo" | "determind" | "jaro" | "dhruvan"
  >("ruzhaa");

  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const tabs = [
    { id: "ruzhaa", name: "Ruzhaa AI", role: "Learning Assistant", icon: MessageSquare, badge: "Live ↗", isLive: true },
    { id: "dhaleo", name: "Dhaleo AI", role: "Stock Screener", icon: Filter, badge: "Live ↗", isLive: true },
    { id: "determind", name: "Determind AI", role: "Behavioral Profiler", icon: Compass, badge: "Live ↗", isLive: true },
    { id: "jaro", name: "Jaro AI", role: "Analyst Terminal", icon: LineChart, badge: "Coming Soon", isComingSoon: true },
    { id: "dhruvan", name: "Dhruvan AI", role: "LSTM Research", icon: Cpu, badge: "Coming Soon", isComingSoon: true },
  ];

  return (
    <section id="ai-showcase" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-mono font-bold uppercase tracking-widest text-[#00A88F] mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F]" />
            PRODUCT SUITE DEMO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
            Institutional Tooling. <span className="text-[#00A88F]">Purpose-Built.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Explore each specialized intelligence product in the Market Healers workspace. Select a tool to preview its actual dedicated interface.
          </p>
        </div>

        {/* Product Tabs Navigation */}
        <div className="flex items-center gap-2 sm:gap-2.5 border-b border-slate-200 pb-4 overflow-x-auto mb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedProduct === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedProduct(tab.id as any)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#0B1F3A] text-white shadow-md scale-[1.02]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#00A88F]" : "text-slate-500"}`} />
                <span>{tab.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    tab.isComingSoon
                      ? "bg-amber-100 text-amber-800 border border-amber-300/80"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-300/80"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display of the Selected Product */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs">
          
          {/* 1. RUZHAA AI (with 100% Fully Visible Real Product Screenshot) */}
          {selectedProduct === "ruzhaa" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center text-left">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-xs font-mono font-bold text-[#00A88F]">
                  <span>UNDERSTAND // RUZHAA AI</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1F3A] tracking-tight leading-tight">
                  Your Personal Financial Learning Assistant.
                </h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Ruzhaa helps users demystify market jargon, explain complex financial filings, and provide context-aware pedagogical answers without confusing abbreviations.
                </p>
                <div className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
                    <span>Explain market concepts, balance sheet mechanics & ratios</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
                    <span>Context-aware assistance inside courses & learning modules</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
                    <span>Plain-language summaries of regulatory company disclosures</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="https://www.ruzhaa.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#132742] text-white text-sm font-bold rounded-xl shadow-md transition-all hover:scale-[1.02]"
                  >
                    <span>Launch Ruzhaa AI Portal</span>
                    <ArrowRight className="w-4 h-4 text-[#00A88F]" />
                  </a>
                  <a
                    href="https://www.ruzhaa.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#00A88F] font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>www.ruzhaa.online</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Real Ruzhaa Product Interface - Fully Visible Without Cropping */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-[#08111F] shadow-2xl group transition-all duration-300 hover:border-[#00A88F]/60">
                  {/* Browser Window Title Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0B1728] border-b border-slate-800 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="ml-2 text-slate-300 text-[11px] hidden sm:inline">
                        https://www.ruzhaa.online
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/50">
                      LIVE PRODUCT INTERFACE
                    </span>
                  </div>

                  {/* Fully Visible Screenshot Container */}
                  <div
                    onClick={() => setLightboxImage({ src: "/images/products/ruzhaa-preview.png", title: "Ruzhaa AI - Live Interface" })}
                    className="relative w-full bg-[#08111F] cursor-zoom-in group/img"
                  >
                    <img
                      src="/images/products/ruzhaa-preview.png"
                      alt="Ruzhaa AI Live Product Interface"
                      className="w-full h-auto block object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#0B1F3A]/95 text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-700 shadow-xl backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-[#00A88F]" /> Click to view full screen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. DHALEO AI (with 100% Fully Visible Real Product Screenshot) */}
          {selectedProduct === "dhaleo" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center text-left">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
                  <span>DISCOVER // DHALEO AI</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1F3A] tracking-tight leading-tight">
                  Stock Screener for Smarter Discovery.
                </h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Filter thousands of listed equities by empirical quantitative criteria: ROCE, P/E, 52W breakouts, and operating margin expansions. No speculative hype.
                </p>
                <div className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Multi-factor screener laboratory across Nifty 50 & broad indices</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Technical signal definitions: Golden Cross, Momentum Up, Breakouts</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Real-time Indian market intelligence hub with zero noise</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="https://dhaleo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#132742] text-white text-sm font-bold rounded-xl shadow-md transition-all hover:scale-[1.02]"
                  >
                    <span>Launch Dhaleo Screener</span>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </a>
                  <a
                    href="https://dhaleo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-600 font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>dhaleo.vercel.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Real Dhaleo Product Interface - Fully Visible Without Cropping */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-[#08111F] shadow-2xl group transition-all duration-300 hover:border-blue-500/60">
                  {/* Browser Window Title Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0B1728] border-b border-slate-800 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="ml-2 text-slate-300 text-[11px] hidden sm:inline">
                        https://dhaleo.vercel.app
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-950/70 text-blue-400 border border-blue-800/50">
                      LIVE PRODUCT INTERFACE
                    </span>
                  </div>

                  {/* Fully Visible Screenshot Container */}
                  <div
                    onClick={() => setLightboxImage({ src: "/images/products/dhaleo-preview.png", title: "Dhaleo AI - Live Screener Lab" })}
                    className="relative w-full bg-[#08111F] cursor-zoom-in group/img"
                  >
                    <img
                      src="/images/products/dhaleo-preview.png"
                      alt="Dhaleo AI Live Product Interface"
                      className="w-full h-auto block object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#0B1F3A]/95 text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-700 shadow-xl backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-blue-400" /> Click to view full screen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. DETERMIND AI (with 100% Fully Visible Real Product Screenshot) */}
          {selectedProduct === "determind" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center text-left">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-700">
                  <span>REFLECT // DETERMIND AI</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1F3A] tracking-tight leading-tight">
                  Understand Yourself Before You Invest.
                </h3>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Most investing mistakes stem from psychology rather than financial formulas. Determind diagnostics evaluate risk endurance, emotional discipline, and cognitive blind spots.
                </p>
                <div className="space-y-3 pt-2 text-sm text-slate-700 font-medium">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Comprehensive behavioral risk assessment & human capital analytics</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Personalized learning progression roadmap & executive reports</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Emotional bias detection & real-time drawdown resilience scoring</span>
                  </div>
                </div>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="https://determind.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3A] hover:bg-[#132742] text-white text-sm font-bold rounded-xl shadow-md transition-all hover:scale-[1.02]"
                  >
                    <span>Launch Determind AI Portal</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </a>
                  <a
                    href="https://determind.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>determind.online</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Real Determind Product Interface - Fully Visible Without Cropping */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-[#08111F] shadow-2xl group transition-all duration-300 hover:border-emerald-500/60">
                  {/* Browser Window Title Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0B1728] border-b border-slate-800 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="ml-2 text-slate-300 text-[11px] hidden sm:inline">
                        https://determind.online
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/50">
                      LIVE PRODUCT INTERFACE
                    </span>
                  </div>

                  {/* Fully Visible Screenshot Container */}
                  <div
                    onClick={() => setLightboxImage({ src: "/images/products/determind-preview.png", title: "Determind AI - Human Capital Platform" })}
                    className="relative w-full bg-[#08111F] cursor-zoom-in group/img"
                  >
                    <img
                      src="/images/products/determind-preview.png"
                      alt="Determind AI Live Product Interface"
                      className="w-full h-auto block object-contain transition-transform duration-300 group-hover/img:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all flex items-center justify-center pointer-events-none">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-[#0B1F3A]/95 text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-700 shadow-xl backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-emerald-400" /> Click to view full screen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* 4. JARO AI */}
          {selectedProduct === "jaro" && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 mb-2">
                    <span>ANALYZE // JARO AI</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1F3A]">
                    Your AI-Powered Stock Analysis Workspace.
                  </h3>
                  <p className="text-base text-slate-600 mt-1">
                    Comprehensive equity research dossiers combining company fundamentals, balance sheet health, valuation, and technical structure.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-300 rounded-xl text-amber-800 text-xs font-bold shrink-0 self-start md:self-auto shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-mono uppercase text-[11px] font-bold">Coming Soon</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-[11px] text-amber-700 font-medium">In Active Engineering</span>
                </div>
              </div>

              {/* Analyst Terminal Card */}
              <div className="bg-[#08111F] rounded-2xl border border-[#1E2D44] p-6 shadow-xl text-slate-200">
                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#1E2D44] gap-2">
                  <div className="flex items-center gap-3">
                    <div className="text-base font-bold text-white font-mono">RELIANCE // NSE</div>
                    <span className="text-xs text-slate-400">Reliance Industries Ltd</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span>PRICE: <strong className="text-white">₹3,024.10</strong></span>
                    <span className="text-emerald-400">+0.85%</span>
                    <span className="text-slate-400">P/E: 27.2</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
                  <div className="bg-[#0E1A2B] border border-[#1E2D44] p-4 rounded-xl">
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Fundamental Health</div>
                    <div className="text-sm font-bold text-emerald-400 mb-2">High Institutional Grade</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Net debt-to-equity is contained at 0.38x with robust operating cash flows across refining, telecom, and retail verticals.
                    </p>
                  </div>

                  <div className="bg-[#0E1A2B] border border-[#1E2D44] p-4 rounded-xl">
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Technical Structure</div>
                    <div className="text-sm font-bold text-slate-200 mb-2">Ascending Base Pattern</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Trading above the 50-day and 200-day simple moving averages. Volume expansion on breakout attempts near ₹3,050.
                    </p>
                  </div>

                  <div className="bg-[#0E1A2B] border border-[#1E2D44] p-4 rounded-xl">
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Key Risk Factors</div>
                    <div className="text-sm font-bold text-amber-400 mb-2">Macro Volatility</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Global gross refining margin cyclicality and ongoing heavy capital expenditures in green energy transitions.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1E2D44] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Data synchronized with corporate regulatory filings</span>
                  <span className="text-slate-200 font-bold">Jaro Composite Health: 8.2 / 10</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. DHRUVAN AI */}
          {selectedProduct === "dhruvan" && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-800 mb-2">
                    <span>RESEARCH // DHRUVAN AI</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1F3A]">
                    LSTM-Based Market Prediction Research.
                  </h3>
                  <p className="text-base text-slate-600 mt-1">
                    Long Short-Term Memory (LSTM) machine learning model examining historical price-volume patterns.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-300 rounded-xl text-amber-800 text-xs font-bold shrink-0 self-start md:self-auto shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-mono uppercase text-[11px] font-bold">Coming Soon</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-[11px] text-amber-700 font-medium">In Active Engineering</span>
                </div>
              </div>

              {/* Model Notice */}
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-amber-900 leading-relaxed">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">MANDATORY MODEL NOTICE: </strong>
                  Model output is probabilistic and should not be treated as investment advice. Machine learning models identify historical statistical tendencies, not guaranteed market outcomes.
                </div>
              </div>

              {/* Dhruvan Research Interface */}
              <div className="bg-[#08111F] rounded-2xl border border-[#1E2D44] p-6 shadow-xl text-slate-200">
                <div className="flex items-center justify-between pb-4 border-b border-[#1E2D44] text-xs font-mono text-slate-400">
                  <span>MODEL: MULTI-LAYER RECURRENT LSTM (EPOCH 340)</span>
                  <span className="text-emerald-400 font-bold">HISTORICAL ACCURACY: 64.2%</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 font-mono">
                  <div className="p-4 rounded-xl bg-[#0E1A2B] border border-slate-800">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Target Asset</div>
                    <div className="text-base font-bold text-white mt-1">NIFTY 50 INDEX</div>
                    <div className="text-xs text-slate-500 mt-0.5">Lookback: 1,250 Sessions</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0E1A2B] border border-slate-800">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Next-Day Probabilistic Vector</div>
                    <div className="text-base font-bold text-emerald-400 mt-1">Upward Bias (+0.35%)</div>
                    <div className="text-xs text-slate-500 mt-0.5">Confidence: 68%</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0E1A2B] border border-slate-800">
                    <div className="text-[10px] uppercase text-slate-400 font-bold">Volatility Distribution</div>
                    <div className="text-base font-bold text-slate-200 mt-1">Controlled (IV: 13.4)</div>
                    <div className="text-xs text-slate-500 mt-0.5">Gaussian Std Dev: 0.62%</div>
                  </div>
                </div>

                <div className="p-3 bg-[#0A1321] rounded-lg border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between font-mono">
                  <span>Input Features: Multi-timeframe Volume + Normalized Price Delays + India VIX</span>
                  <span className="text-[#00A88F] font-bold">Research Sandbox Active</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Full-Screen Lightbox Modal for Crisp Detailed View */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] bg-[#0E1A2B] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#08111F] border-b border-slate-800 text-slate-300">
              <span className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A88F]" />
                {lightboxImage.title}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close full view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Modal Full Image Content */}
            <div className="overflow-auto p-2 sm:p-4 bg-slate-950 flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

