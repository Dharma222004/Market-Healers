import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export const FinalCta: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Background financial grid */}
      <div className="absolute inset-0 bg-financial-grid-dark opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15253C] border border-[#1E3352] text-xs font-semibold uppercase tracking-wider text-[#00A88F]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Heal Your Wealth. Build Your Freedom.</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight text-balance">
          Your Financial Journey Starts With Understanding.
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
          Learn the fundamentals. Build your skills. Use better tools. Make more informed decisions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full max-w-md sm:max-w-none mx-auto">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] text-sm font-bold text-white bg-[#00A88F] hover:bg-[#008B76] rounded-xl shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#ai-ecosystem"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] text-sm font-bold text-white bg-[#0E1A2B] hover:bg-[#15253C] border border-slate-700 rounded-xl transition-colors"
          >
            <span>Explore Market Healers</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#00A88F]" /> Zero Hype or Tips
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span>5 Institutional AI Suites</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>Self-Paced Structured Modules</span>
        </div>

      </div>
    </section>
  );
};
