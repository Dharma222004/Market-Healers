import React from "react";
import { MessageSquare, Filter, Compass, LineChart, Cpu, ArrowRight, Sparkles } from "lucide-react";

export const AiEcosystem: React.FC = () => {
  const tools = [
    {
      id: "ruzhaa",
      name: "Ruzhaa AI",
      step: "01",
      phase: "UNDERSTAND",
      role: "Financial Learning Assistant",
      summary: "Clarify market terminology, query complex balance sheet concepts, and receive instant pedagogical guidance.",
      icon: MessageSquare,
      theme: {
        iconBg: "bg-teal-500/15 text-teal-300 border-teal-500/40",
        pill: "text-teal-300 border-teal-500/30 bg-teal-950/50",
        accentGlow: "from-teal-500 to-emerald-600",
        roleColor: "text-teal-400",
      },
      externalUrl: "https://www.ruzhaa.online/",
      cta: "Launch Ruzhaa AI",
    },
    {
      id: "dhaleo",
      name: "Dhaleo AI",
      step: "02",
      phase: "DISCOVER",
      role: "Intelligent Screener",
      summary: "Filter thousands of listed equities by empirical criteria: ROCE, P/E, 52W breakouts, and operating margin expansions.",
      icon: Filter,
      theme: {
        iconBg: "bg-blue-500/15 text-blue-300 border-blue-500/40",
        pill: "text-blue-300 border-blue-500/30 bg-blue-950/50",
        accentGlow: "from-blue-500 to-indigo-600",
        roleColor: "text-blue-400",
      },
      externalUrl: "https://dhaleo.vercel.app/",
      cta: "Open Dhaleo Screener",
    },
    {
      id: "determind",
      name: "Determind AI",
      step: "03",
      phase: "REFLECT",
      role: "Behavioral & Risk Profiler",
      summary: "Evaluate your psychological risk tolerance, identify personal emotional biases, and construct customized position guardrails.",
      icon: Compass,
      theme: {
        iconBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
        pill: "text-emerald-300 border-emerald-500/30 bg-emerald-950/50",
        accentGlow: "from-emerald-500 to-teal-500",
        roleColor: "text-emerald-400",
      },
      externalUrl: "https://determind.online/",
      cta: "Launch Determind AI",
    },
    {
      id: "jaro",
      name: "Jaro AI",
      step: "04",
      phase: "ANALYZE",
      role: "Company Analysis Workspace",
      summary: "Synthesize fundamental filings, debt ratios, peer comparisons, and technical structure into one unified analyst terminal.",
      icon: LineChart,
      theme: {
        iconBg: "bg-indigo-500/15 text-indigo-300 border-indigo-500/40",
        pill: "text-indigo-300 border-indigo-500/30 bg-indigo-950/50",
        accentGlow: "from-indigo-500 to-purple-600",
        roleColor: "text-indigo-400",
      },
      isComingSoon: true,
      cta: "Coming Soon",
    },
    {
      id: "dhruvan",
      name: "Dhruvan AI",
      step: "05",
      phase: "RESEARCH",
      role: "LSTM Machine Learning Lab",
      summary: "Explore probabilistic multi-variate time-series forecasts trained on thousands of sequential market cycles.",
      icon: Cpu,
      theme: {
        iconBg: "bg-amber-500/15 text-amber-300 border-amber-500/40",
        pill: "text-amber-300 border-amber-500/30 bg-amber-950/50",
        accentGlow: "from-amber-500 to-orange-500",
        roleColor: "text-amber-400",
      },
      isComingSoon: true,
      cta: "Coming Soon",
    },
  ];

  return (
    <section
      id="ai-ecosystem"
      className="scroll-mt-20 py-24 sm:py-28 lg:py-32 bg-[#08111F] text-slate-100 border-b border-[#1E2D44] relative overflow-hidden"
    >
      {/* Subtle dark financial grid and ambient light */}
      <div className="absolute inset-0 bg-financial-grid-dark opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[350px] bg-[#00A88F]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1A2B] border border-slate-700/80 text-xs font-mono font-bold text-[#00A88F] uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00A88F]" />
            <span>DECISION SUPPORT INFRASTRUCTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
            One Ecosystem. <br className="hidden sm:inline" />
            <span className="text-[#00A88F]">Multiple Ways to Think Better.</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Market Healers avoids disjointed single-purpose bots. Our five specialized AI products are sequentially aligned to support every phase of your market decision process.
          </p>
        </div>

        {/* Visual Pipeline Bar Aligned Exactly With 5 Cards */}
        <div className="mb-12 hidden lg:grid grid-cols-5 gap-3 p-3.5 bg-[#0E1A2B]/90 backdrop-blur-sm border border-[#1E2D44] rounded-xl shadow-lg">
          {tools.map((tool, idx) => (
            <div key={tool.id} className="flex items-center justify-center gap-2.5 px-2 py-1.5 rounded-lg bg-[#142339]/60 border border-slate-800">
              <span className="w-6 h-6 rounded-full bg-[#00A88F]/20 text-[#00A88F] text-xs font-mono flex items-center justify-center font-bold border border-[#00A88F]/40">
                {tool.step}
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                {tool.phase}
              </span>
            </div>
          ))}
        </div>

        {/* 5 High-Impact AI Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group relative bg-[#0E1A2B] border border-[#1E2D44] hover:border-[#00A88F]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_36px_rgba(0,168,143,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Accent Glowing Line on Hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.theme.accentGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Phase Badge & Step Number */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-md border font-bold tracking-wider uppercase ${tool.theme.pill}`}>
                      {tool.phase}
                    </span>
                    <span className="text-sm font-mono text-slate-500 group-hover:text-slate-300 font-bold transition-colors">
                      {tool.step}
                    </span>
                  </div>

                  {/* Icon Container with Radiant Theme */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300 ${tool.theme.iconBg}`}>
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  {/* Tool Name with Prominent Headline Size */}
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1.5 group-hover:text-white transition-colors">
                    {tool.name}
                  </h3>

                  {/* Specialized Role Tagline */}
                  <div className={`text-xs sm:text-sm font-bold tracking-tight mb-3.5 ${tool.theme.roleColor}`}>
                    {tool.role}
                  </div>

                  {/* High-Contrast, Highly Readable Description */}
                  <p className="text-sm text-slate-300 font-normal leading-relaxed">
                    {tool.summary}
                  </p>
                </div>

                {/* Card Bottom: Action CTA or Coming Soon Badge */}
                <div className="mt-7 pt-4 border-t border-[#1E2D44]">
                  {tool.isComingSoon ? (
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-3 py-2.5 rounded-lg border border-amber-800/60 shadow-xs">
                      <span>COMING SOON</span>
                      <span className="text-[11px] text-amber-400 font-medium">In Engineering</span>
                    </div>
                  ) : (
                    <a
                      href={tool.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-white flex items-center justify-between group/btn bg-[#16273e] hover:bg-[#00A88F] px-3.5 py-2.5 rounded-lg transition-all border border-slate-700/80 hover:border-[#00A88F] shadow-sm"
                    >
                      <span>{tool.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-[#00A88F] group-hover/btn:text-white" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

