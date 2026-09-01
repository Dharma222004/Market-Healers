import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Filter,
  Compass,
  LineChart,
  Cpu,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "AI Tools Hub — Market Healers",
  description: "Your Market Intelligence Toolkit: Ruzhaa, Dhaleo, Determind, Jaro, and Dhruvan.",
};

export default function AiToolsHubPage() {
  const tools = [
    {
      stage: "UNDERSTAND",
      id: "ruzhaa",
      name: "Ruzhaa AI",
      role: "Personal Financial Learning Assistant",
      tagline: "Clarify market terminology, query balance sheets, and accelerate concept mastery.",
      capabilities: [
        "Plain-English explanations of complex filings",
        "Contextual assistant inside course lessons",
        "Demystify financial acronyms (EBITDA, ROCE, PE)",
      ],
      access: "Free & Pro Tiers",
      href: "/ai-tools/ruzhaa",
      icon: MessageSquare,
      accent: "border-teal-200 bg-teal-50 text-[#00A88F]",
    },
    {
      stage: "DISCOVER",
      id: "dhaleo",
      name: "Dhaleo AI",
      role: "Stock Screener for Smarter Discovery",
      tagline: "Filter the 2,400+ Indian equity universe by disciplined quantitative metrics.",
      capabilities: [
        "Multi-factor criteria: ROCE, P/E, Debt-to-Equity",
        "52-Week high breakout proximity filters",
        "Pre-built value & compounding strategy presets",
      ],
      access: "Free (Top 100) & Pro (All)",
      href: "/ai-tools/dhaleo",
      icon: Filter,
      accent: "border-blue-200 bg-blue-50 text-blue-700",
    },
    {
      stage: "REFLECT",
      id: "determind",
      name: "Determind AI",
      role: "Personal Growth & Investor Profiler",
      tagline: "Diagnostic behavioral assessment to understand your emotional risk endurance.",
      capabilities: [
        "6-step diagnostic evaluation of risk tolerance",
        "Drawdown anxiety & cognitive bias identification",
        "Personalized learning trajectory recommendations",
      ],
      access: "Free & Pro Tiers",
      href: "/ai-tools/determind",
      icon: Compass,
      accent: "border-purple-200 bg-purple-50 text-purple-700",
    },
    {
      stage: "ANALYZE",
      id: "jaro",
      name: "Jaro AI",
      role: "AI-Powered Stock Analysis Workspace",
      tagline: "Consolidated equity dossiers synthesizing fundamentals, technicals, and risks.",
      capabilities: [
        "Automated financial statement health scoring",
        "Support/resistance and EMA technical regimen",
        "Peer comparison tables & regulatory risks",
      ],
      access: "Investor Pro & Alpha",
      href: "/ai-tools/jaro",
      icon: LineChart,
      accent: "border-indigo-200 bg-indigo-50 text-indigo-700",
    },
    {
      stage: "RESEARCH",
      id: "dhruvan",
      name: "Dhruvan AI",
      role: "LSTM-Based Prediction Research",
      tagline: "Multi-layer recurrent neural network studying historical sequential price-volume cycles.",
      capabilities: [
        "Next-session probabilistic movement vector",
        "Confidence metrics & Gaussian volatility bands",
        "Historical backtest window validation",
      ],
      access: "Institutional Alpha",
      href: "/ai-tools/dhruvan",
      icon: Cpu,
      accent: "border-amber-200 bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C9A227]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
            DECISION SUPPORT ECOSYSTEM
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight mt-1">
          Your Market Intelligence Toolkit
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Different questions require different tools. Progress from conceptual understanding to data screening and research.
        </p>
      </div>

      {/* Sequential Pipeline Flow Indicator */}
      <div className="hidden md:flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-lg text-xs font-mono">
        {["UNDERSTAND (Ruzhaa)", "DISCOVER (Dhaleo)", "REFLECT (Determind)", "ANALYZE (Jaro)", "RESEARCH (Dhruvan)"].map((step, idx) => (
          <React.Fragment key={step}>
            <span className="font-semibold text-slate-700">{step}</span>
            {idx < 4 && <ArrowRight className="w-4 h-4 text-slate-300" />}
          </React.Fragment>
        ))}
      </div>

      {/* Tool Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${tool.accent}`}>
                    {tool.stage}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {tool.access}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${tool.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1F3A]">
                      {tool.name}
                    </h3>
                    <div className="text-xs text-[#00A88F] font-medium">
                      {tool.role}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed my-3">
                  {tool.tagline}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    Capabilities:
                  </div>
                  {tool.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F] mt-1.5 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={tool.href}
                  className="w-full py-2.5 rounded-md bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <span>Launch {tool.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
