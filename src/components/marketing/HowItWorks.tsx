import React from "react";
import { BookOpen, Target, LineChart, TrendingUp, CheckCircle2 } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Learn",
      tagline: "Build the fundamentals.",
      description:
        "Master the structural language of financial markets—from price discovery, order books, and financial statements to valuation multiples and macro indicators.",
      deliverable: "Foundational conceptual clarity without speculation.",
      icon: BookOpen,
      badgeColor: "bg-teal-50/90 text-[#00A88F] border-teal-200/80",
      iconTheme: "bg-teal-50 border-teal-200/60 text-[#00A88F]",
      topAccent: "from-teal-500 to-emerald-600",
    },
    {
      step: "02",
      title: "Practice",
      tagline: "Apply what you learn.",
      description:
        "Engage with real-market simulations, balance sheet breakdowns, and structured chart pattern exercises without risking capital prematurely.",
      deliverable: "Hands-on competency in reading market structures.",
      icon: Target,
      badgeColor: "bg-blue-50/90 text-[#0B1F3A] border-blue-200/80",
      iconTheme: "bg-blue-50 border-blue-200/60 text-[#0B1F3A]",
      topAccent: "from-blue-600 to-[#0B1F3A]",
    },
    {
      step: "03",
      title: "Analyze",
      tagline: "Use tools and structured analysis.",
      description:
        "Deploy the Market Healers decision suite (Dhaleo screener, Jaro terminal, and Dhruvan research models) to examine fundamentals and historical probability distributions.",
      deliverable: "Data-driven clarity replacing emotional impulse.",
      icon: LineChart,
      badgeColor: "bg-amber-50/90 text-amber-800 border-amber-200/80",
      iconTheme: "bg-amber-50 border-amber-200/60 text-[#C9A227]",
      topAccent: "from-amber-500 to-orange-500",
    },
    {
      step: "04",
      title: "Grow",
      tagline: "Build better financial habits.",
      description:
        "Utilize Determind AI behavioral diagnostics to refine risk allocation, identify personal behavioral biases, and compound sustainable long-term decision discipline.",
      deliverable: "Long-term psychological and strategic mastery.",
      icon: TrendingUp,
      badgeColor: "bg-emerald-50/90 text-emerald-800 border-emerald-200/80",
      iconTheme: "bg-emerald-50 border-emerald-200/60 text-emerald-600",
      topAccent: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 bg-[#F6F8FA] border-b border-slate-200 overflow-hidden">
      {/* Precision Background Grid */}
      <div className="absolute inset-0 bg-financial-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold uppercase tracking-widest text-[#00A88F] mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F]" />
            METHODOLOGY & FRAMEWORK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-[1.12]">
            How Market Healers Works. <br />
            <span className="text-slate-500 font-medium text-2xl sm:text-3xl lg:text-4xl">
              From market noise to disciplined independence.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Financial markets penalize impulse and reward discipline. Our ecosystem bridges the gap between passive course consumption and active, institutional-grade decision support.
          </p>
        </div>

        {/* 4-Step Editorial Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 relative items-stretch">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_2px_12px_rgba(11,31,58,0.04)] hover:shadow-[0_18px_38px_rgba(11,31,58,0.09)] hover:border-[#00A88F]/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Accent Gradient on Hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.topAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Top Step Counter & Phase Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-slate-300 group-hover:text-[#0B1F3A]/60 transition-colors">
                      {item.step}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${item.badgeColor}`}>
                      Phase {idx + 1}
                    </span>
                  </div>

                  {/* Title & Icon Header */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-11 h-11 rounded-xl ${item.iconTheme} border flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1F3A] tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <div className="text-sm sm:text-base font-bold text-[#00A88F] mb-3.5 tracking-tight">
                    {item.tagline}
                  </div>

                  {/* Enlarged, Highly Legible Description */}
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Deliverable Section at Card Bottom */}
                <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5" />
                  <span>{item.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

