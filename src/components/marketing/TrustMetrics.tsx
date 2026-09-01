"use client";

import React, { useEffect, useState, useRef } from "react";
import { Users, Briefcase, Cpu, Clock, CheckCircle2 } from "lucide-react";

interface MetricItem {
  id: string;
  label: string;
  targetNumber: number;
  prefix: string;
  suffix: string;
  subtext: string;
  tag: string;
  icon: React.ElementType;
  theme: {
    iconBg: string;
    iconBorder: string;
    iconColor: string;
    tagBg: string;
    accentBar: string;
  };
}

export const TrustMetrics: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    advised: 0,
    holdings: 0,
    tools: 0,
    hours: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics: MetricItem[] = [
    {
      id: "advised",
      label: "People Advised & Mentored",
      targetNumber: 200,
      prefix: "",
      suffix: "+",
      subtext: "One-on-one & cohort learners guided through systematic market principles",
      tag: "Direct Cohorts",
      icon: Users,
      theme: {
        iconBg: "bg-emerald-500/10",
        iconBorder: "border-emerald-500/30",
        iconColor: "text-emerald-600",
        tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        accentBar: "from-emerald-500 to-teal-600",
      },
    },
    {
      id: "holdings",
      label: "Portfolio Holdings Analyzed",
      targetNumber: 20,
      prefix: "₹",
      suffix: "L+",
      subtext: "Verified direct portfolio holdings evaluated under strict risk metrics",
      tag: "Verified Capital",
      icon: Briefcase,
      theme: {
        iconBg: "bg-[#0B1F3A]/10",
        iconBorder: "border-[#0B1F3A]/25",
        iconColor: "text-[#0B1F3A]",
        tagBg: "bg-slate-100 text-slate-800 border-slate-200",
        accentBar: "from-[#0B1F3A] to-slate-700",
      },
    },
    {
      id: "tools",
      label: "AI-Powered Decision Suites",
      targetNumber: 5,
      prefix: "",
      suffix: " Suites",
      subtext: "Ruzhaa, Dhaleo, Determind, Jaro & Dhruvan institutional engines",
      tag: "Proprietary AI",
      icon: Cpu,
      theme: {
        iconBg: "bg-amber-500/10",
        iconBorder: "border-amber-500/30",
        iconColor: "text-amber-600",
        tagBg: "bg-amber-50 text-amber-800 border-amber-200/60",
        accentBar: "from-amber-500 to-orange-500",
      },
    },
    {
      id: "hours",
      label: "Hours of Learning Content",
      targetNumber: 50,
      prefix: "",
      suffix: "+",
      subtext: "Curated foundational to advanced modules built on market mechanics",
      tag: "Comprehensive",
      icon: Clock,
      theme: {
        iconBg: "bg-sky-500/10",
        iconBorder: "border-sky-500/30",
        iconColor: "text-sky-600",
        tagBg: "bg-sky-50 text-sky-800 border-sky-200/60",
        accentBar: "from-sky-500 to-blue-600",
      },
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth Count-Up Animation
  useEffect(() => {
    if (!inView) return;

    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [key: string]: number } = {};
      metrics.forEach((m) => {
        nextCounts[m.id] = Math.floor(easeProgress * m.targetNumber);
      });

      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const finalCounts: { [key: string]: number } = {};
        metrics.forEach((m) => {
          finalCounts[m.id] = m.targetNumber;
        });
        setCounts(finalCounts);
      }
    };

    requestAnimationFrame(animate);
  }, [inView]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#F8FAFC] to-white border-b border-slate-200/90 overflow-hidden font-sans"
    >
      {/* Precision Background Ambience */}
      <div className="absolute inset-0 bg-financial-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-[#00A88F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          
          {/* Institutional Badge with Brand Emblem */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs mb-4">
            <img
              src="/logo/emblem.png"
              alt="Market Healers Emblem"
              className="w-4 h-4 object-contain"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
              Empirical Foundations
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00A88F] animate-pulse" />
          </div>

          {/* Headline with High-Impact Typography & Perfect Alignment */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0B1F3A] tracking-tight leading-[1.2] text-balance">
            Built to help investors <br className="hidden sm:inline" />
            <span className="text-[#00A88F]">learn before they act.</span>
          </h2>

          {/* Subtitle with Increased Readability & Size */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed mt-4 max-w-2xl mx-auto text-balance">
            Independent financial education backed by rigorous market mechanics, institutional risk discipline, and intelligent analytical tooling.
          </p>
        </div>

        {/* 4 Professional Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const currentVal = inView ? counts[metric.id] ?? metric.targetNumber : 0;

            return (
              <div
                key={metric.id}
                className="group relative p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-[#00A88F]/50 shadow-[0_2px_12px_rgba(11,31,58,0.04)] hover:shadow-[0_16px_36px_rgba(11,31,58,0.09)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-left overflow-hidden"
              >
                {/* Top Accent Gradient Bar on Hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${metric.theme.accentBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Subtle Watermark Emblem in Background */}
                <img
                  src="/logo/emblem.png"
                  alt=""
                  className="absolute -right-5 -bottom-5 w-28 h-28 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none select-none"
                  aria-hidden="true"
                />

                {/* Card Top Row: Icon + Category Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${metric.theme.iconBg} border ${metric.theme.iconBorder} flex items-center justify-center ${metric.theme.iconColor} shadow-xs group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${metric.theme.tagBg}`}
                    >
                      {metric.tag}
                    </span>
                  </div>

                  {/* Primary Big Metric Number */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F3A] font-tabular tracking-tight leading-none">
                    <span>{metric.prefix}</span>
                    <span>{currentVal.toLocaleString("en-IN")}</span>
                    <span className="text-[#00A88F] ml-0.5">{metric.suffix}</span>
                  </div>

                  {/* Clear, Prominent Metric Label */}
                  <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] mt-3.5 leading-snug tracking-tight">
                    {metric.label}
                  </h3>
                </div>

                {/* Explanatory Context Subtext (Larger & High Contrast) */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 mt-0.5 opacity-80" />
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {metric.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

