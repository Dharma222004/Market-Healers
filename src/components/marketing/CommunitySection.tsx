import React from "react";
import Link from "next/link";
import { Users, Video, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";

export const CommunitySection: React.FC = () => {
  const communityPillars = [
    {
      title: "Pedagogical Learning Cohorts",
      description:
        "Structured study groups aligned by course level. Review balance sheets and chart structures together with peer accountability.",
      icon: Users,
      meta: "Peer-driven & moderated",
      badgeColor: "bg-teal-50 border-teal-200 text-[#00A88F]",
    },
    {
      title: "Weekly Market Breakdown Webinars",
      description:
        "Deep-dive sessions deconstructing the week's macroeconomic announcements, index price structure, and sectoral shifts.",
      icon: Video,
      meta: "Every Saturday 11:00 AM IST",
      badgeColor: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      title: "Direct Mentor Query Sessions",
      description:
        "Get your technical and fundamental research frameworks reviewed. Constructive feedback on risk allocation and trade journals.",
      icon: MessageSquare,
      meta: "Dedicated office hours",
      badgeColor: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
  ];

  return (
    <section id="community" className="py-12 sm:py-16 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-xs font-mono font-bold uppercase tracking-widest text-[#00A88F] mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F]" />
            MENTORSHIP & COLLABORATIVE RIGOR
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight text-balance">
            An Education-Centric <span className="text-[#00A88F]">Community.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
            We deliberately avoid noisy social feeds, speculative tip groups, and meme culture. Our community is built exclusively for serious learners committed to empirical financial mastery.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {communityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between hover:border-[#00A88F]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${pillar.badgeColor} shadow-2xs`}>
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight mb-2.5 sm:mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-5 sm:mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-medium">{pillar.meta}</span>
                  <span className="text-[#00A88F] font-bold">&bull; Active Cohorts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Code of Conduct / Anti-Hype pledge */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-7 lg:p-8 rounded-2xl bg-gradient-to-r from-amber-50/70 via-slate-50 to-teal-50/40 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 shadow-xs text-left">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0 border border-amber-200 shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-[#0B1F3A]">Strict "No-Tips / No-Hype" Policy</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
                Market Healers prohibits stock tipping, buy/sell call spam, or speculative gambling. All discussions must center around verifiable research methodologies, risk parameters, and financial mechanics.
              </p>
            </div>
          </div>
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] w-full md:w-auto bg-[#0B1F3A] hover:bg-[#132742] text-white text-sm font-bold rounded-xl shrink-0 transition-all hover:scale-[1.02] shadow-md"
          >
            <span>Join Learning Community</span>
            <ArrowRight className="w-4 h-4 text-[#00A88F]" />
          </Link>
        </div>

      </div>
    </section>
  );
};

