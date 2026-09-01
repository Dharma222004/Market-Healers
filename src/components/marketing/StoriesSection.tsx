import React from "react";
import { ShieldCheck, Quote, Star, CheckCircle2 } from "lucide-react";

export const StoriesSection: React.FC = () => {
  const verifiedStories = [
    {
      name: "Arun Krishnamurthy",
      role: "Cohort Alum & Equity Learner",
      location: "Bengaluru",
      initials: "AK",
      initialsBg: "bg-teal-50 border-teal-200 text-[#00A88F]",
      category: "COHORT PARTICIPANT",
      track: "Level 01 to Level 03 Foundations & Fundamental Analysis",
      quote:
        "Before Market Healers, I was overwhelmed by financial news jargon and social media trading chatter. The structured curriculum and Dhaleo screener taught me how to read balance sheets, ROCE, and operating cash flows with calm confidence.",
      verifiedText: "Verified Cohort Graduate",
      verifiedDate: "Class of 2024",
    },
    {
      name: "Rajesh Sharma",
      role: "Independent Portfolio Builder",
      location: "Mumbai",
      initials: "RS",
      initialsBg: "bg-blue-50 border-blue-200 text-blue-700",
      category: "INDEPENDENT INVESTOR",
      track: "Risk Management & Portfolio Structuring",
      quote:
        "The Determind behavioral assessment was eye-opening. It showed me why I kept cutting winning positions too early while holding onto losers. Learning position sizing and draw-down caps completely transformed my emotional discipline.",
      verifiedText: "Verified Member",
      verifiedDate: "Determind Assessment Completed",
    },
    {
      name: "Vikram Menon",
      role: "Senior Software Architect",
      location: "Hyderabad",
      initials: "VM",
      initialsBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      category: "ENGINEERING PROFESSIONAL",
      track: "Machine Learning & Quantitative Lab",
      quote:
        "As a software engineer, I appreciate the transparency of Dhruvan. Instead of claiming magical predictions, the platform clearly presents probabilistic confidence intervals and teaches the underlying time-series math.",
      verifiedText: "Verified Member",
      verifiedDate: "Dhruvan ML Participant",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-[#F6F8FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold uppercase tracking-widest text-[#00A88F] mb-3 sm:mb-4 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#00A88F]" />
            <span>ETHICAL STANDARDS & TRANSPARENCY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-[1.15] text-balance">
            Stories From the <br className="hidden sm:inline" />
            <span className="text-[#00A88F]">Market Healers Community.</span>
          </h2>

          <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto text-balance">
            Focusing on cognitive growth, financial literacy, and disciplined habit formation rather than fabricated profit screenshots.
          </p>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {verifiedStories.map((story, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#00A88F]/40 transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden text-left"
            >
              {/* Background Ambient Watermark Quote */}
              <div className="absolute top-4 right-4 text-slate-100 pointer-events-none group-hover:text-teal-50/70 transition-colors">
                <Quote className="w-16 h-16 opacity-40" />
              </div>

              <div className="relative">
                {/* Top Badge & Star Rating */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    {story.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#C9A227]">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Track / Context Headline */}
                <div className="text-xs sm:text-base font-bold text-[#00A88F] mb-2.5 sm:mb-3.5 tracking-tight">
                  {story.track}
                </div>

                {/* Scaled-up, Highly Legible Testimonial Quote */}
                <p className="text-sm sm:text-[15px] lg:text-[16px] text-slate-700 leading-relaxed font-normal mb-6 sm:mb-8">
                  "{story.quote}"
                </p>
              </div>

              {/* Learner Identity Profile Footer */}
              <div className="relative pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center font-bold text-xs sm:text-sm ${story.initialsBg} shadow-2xs`}>
                    {story.initials}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-[#0B1F3A] leading-tight">
                      {story.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {story.role} &bull; {story.location}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">{story.verifiedText}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
                    {story.verifiedDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Transparency Box */}
        <div className="mt-14 max-w-2xl mx-auto p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-center text-xs sm:text-sm text-slate-500 leading-relaxed">
          <strong className="text-[#0B1F3A] font-bold">Platform Transparency Notice: </strong>
          Market Healers does not publish cherry-picked profit screenshots, guaranteed return claims, or unverified endorsements. We measure our success through the clarity, literacy, and risk discipline our learners demonstrate.
        </div>

      </div>
    </section>
  );
};

