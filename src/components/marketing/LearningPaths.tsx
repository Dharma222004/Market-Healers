import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Award } from "lucide-react";

export const LearningPaths: React.FC = () => {
  const tracks = [
    {
      id: "beginner",
      title: "Foundational Investor Track",
      subtitle: "For individuals taking their first structured steps into capital markets.",
      duration: "4 - 6 Weeks",
      focus: "Market literacy, demystifying jargon, balance sheet essentials, avoiding common emotional traps.",
      milestones: [
        "Read corporate annual reports & balance sheets without confusion",
        "Understand market orders, limits, and exchange mechanics",
        "Formulate an objective, zero-debt personal risk tolerance plan",
      ],
      recommendedFor: "Beginners & early career professionals",
    },
    {
      id: "intermediate",
      title: "Fundamental & Technical Equity Analyst",
      subtitle: "For investors seeking self-directed portfolio creation and stock analysis.",
      duration: "8 - 10 Weeks",
      focus: "P/E and ROCE valuation, cash flow models, multi-timeframe chart structure, peer comparisons.",
      milestones: [
        "Construct independent financial valuation models",
        "Screen high-quality compounding companies with Dhaleo",
        "Identify high-probability technical confluence zones",
      ],
      recommendedFor: "Retail participants wanting systematic analysis",
    },
    {
      id: "advanced",
      title: "Strategic Portfolio & Risk Specialist",
      subtitle: "For experienced market participants managing larger allocations and downside volatility.",
      duration: "10 - 12 Weeks",
      focus: "Macro liquidity cycles, sector rotation, derivative hedging without speculative gambling.",
      milestones: [
        "Implement risk budgeting and portfolio draw-down caps",
        "Execute volatility hedges during macro uncertainties",
        "Synthesize machine learning probabilities with Dhruvan",
      ],
      recommendedFor: "Experienced participants & portfolio managers",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-[#F6F8FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold uppercase tracking-widest text-[#00A88F] mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F]" />
            PROGRESSION FRAMEWORKS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight text-balance">
            Tailored Pathways for <span className="text-[#00A88F]">Every Stage.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
            No cookie-cutter courses. Select the learning pathway tailored to your current market knowledge and capital objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#00A88F]/40 transition-all duration-300 hover:-translate-y-1 text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold border border-slate-200">
                    {track.duration}
                  </span>
                  <Award className="w-5 h-5 text-[#C9A227]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2.5">
                  {track.title}
                </h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed font-normal">
                  {track.subtitle}
                </p>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs sm:text-sm text-slate-700 mb-6">
                  <strong className="text-[#0B1F3A] font-bold block mb-1">Core Focus:</strong>
                  <span className="text-slate-600 leading-relaxed">{track.focus}</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Target Milestones:
                  </div>
                  {track.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {track.recommendedFor}
                </span>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00A88F] hover:text-[#0B1F3A] transition-colors"
                >
                  <span>Enroll Pathway</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

