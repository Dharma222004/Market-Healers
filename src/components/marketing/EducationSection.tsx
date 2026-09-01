import React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, Clock, FileText, Award, ArrowRight } from "lucide-react";

export const EducationSection: React.FC = () => {
  const levels = [
    {
      level: "LEVEL 01",
      title: "Market Foundations",
      tagline: "The Architecture of Capital Markets",
      duration: "8 Hours",
      lessons: 14,
      topics: [
        "Exchange mechanics (NSE & BSE) and order books",
        "Bid-Ask dynamics, liquidity, and slippage",
        "Equity, indices, debt, and commodity structures",
        "Brokerage models, depository participants (CDSL/NDSL)",
      ],
      badge: "Essential",
      badgeColor: "bg-teal-50 text-[#00A88F] border-teal-200",
    },
    {
      level: "LEVEL 02",
      title: "Technical Analysis",
      tagline: "Price Action & Structural Trends",
      duration: "10 Hours",
      lessons: 18,
      topics: [
        "Support, resistance, and market cycle structure",
        "Candlestick dynamics and volume confirmation",
        "Moving averages (SMA/EMA) and momentum indicators",
        "Trendlines, channels, and multi-timeframe alignment",
      ],
      badge: "Core Technical",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      level: "LEVEL 03",
      title: "Fundamental Analysis",
      tagline: "Financial Statements & Valuation",
      duration: "12 Hours",
      lessons: 20,
      topics: [
        "Balance sheet, P&L, and cash flow interrogation",
        "Operating metrics: ROCE, ROE, debt-to-equity ratios",
        "Valuation frameworks: P/E, P/B, EV/EBITDA, and DCF",
        "Management governance, capital allocation, and moats",
      ],
      badge: "Core Fundamental",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      level: "LEVEL 04",
      title: "Portfolio Building",
      tagline: "Asset Allocation & Risk Budgeting",
      duration: "6 Hours",
      lessons: 12,
      topics: [
        "Core & satellite portfolio design methodology",
        "Position sizing rules and maximum allowable drawdowns",
        "Sector diversification vs. over-diversification",
        "Rebalancing discipline and tax efficiency awareness",
      ],
      badge: "Risk & Wealth",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      level: "LEVEL 05",
      title: "Advanced Strategies",
      tagline: "Hedging, Options & Market Volatility",
      duration: "8 Hours",
      lessons: 16,
      topics: [
        "Futures & options foundations without speculative leverage",
        "Understanding implied volatility (IV) and India VIX",
        "Hedging equity exposure during macro drawdowns",
        "Defined-risk option spreads (Spreads, Iron Condors)",
      ],
      badge: "Advanced",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      level: "LEVEL 06",
      title: "Professional Market Analysis",
      tagline: "Institutional Macro & Synthesis",
      duration: "10 Hours",
      lessons: 15,
      topics: [
        "Macroeconomic liquidity, RBI policy, and inflation cycles",
        "Sectoral rotation and global inter-market relationships",
        "Institutional flow tracking (FII / DII analysis)",
        "Constructing comprehensive equity research dossiers",
      ],
      badge: "Institutional",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    },
  ];

  return (
    <section id="courses" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00A88F] mb-3">
              STRUCTURED CURRICULUM
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0B1F3A] tracking-tight">
              Six Levels of Structured Mastery.
            </h2>
            <p className="mt-3 text-base text-[#667085] max-w-2xl">
              An institutional curriculum engineered to transition an absolute beginner into a methodical, self-reliant market participant.
            </p>
          </div>

          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#00A88F] group"
          >
            <span>Assess your starting level</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#00A88F]" />
          </Link>
        </div>

        {/* 6 Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map((item) => (
            <div
              key={item.level}
              className="bg-[#F6F8FA] border border-slate-200/90 rounded-lg p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#0B1F3A]">
                    {item.level}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">
                  {item.title}
                </h3>
                <div className="text-xs font-medium text-slate-500 mb-4">
                  {item.tagline}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-600 mb-5 pb-4 border-b border-slate-200">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    {item.lessons} Modules
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Core Curriculum Focus:
                  </div>
                  {item.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A88F] shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">Self-Paced + Mentorship</span>
                <Link
                  href="/onboarding"
                  className="text-xs font-semibold text-[#0B1F3A] hover:text-[#00A88F] flex items-center gap-1"
                >
                  View Syllabus &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
