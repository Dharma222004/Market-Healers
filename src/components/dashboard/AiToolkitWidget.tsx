"use client";

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
} from "lucide-react";

export const AiToolkitWidget: React.FC = () => {
  const tools = [
    {
      id: "ruzhaa",
      name: "Ruzhaa AI",
      role: "Financial Learning Assistant",
      status: "Live",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      cta: "Launch Tutor ↗",
      href: "https://www.ruzhaa.online/",
      icon: MessageSquare,
      accent: "text-[#00A88F] bg-teal-50",
      isExternal: true,
    },
    {
      id: "dhaleo",
      name: "Dhaleo AI",
      role: "Stock Screener for Discovery",
      status: "Live",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      cta: "Launch Screener ↗",
      href: "https://dhaleo.vercel.app/",
      icon: Filter,
      accent: "text-blue-600 bg-blue-50",
      isExternal: true,
    },
    {
      id: "determind",
      name: "Determind AI",
      role: "Personal Growth & Investor Profile",
      status: "Live",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      cta: "Open Profiler ↗",
      href: "https://determind.online/",
      icon: Compass,
      accent: "text-purple-600 bg-purple-50",
      isExternal: true,
    },
    {
      id: "jaro",
      name: "Jaro AI",
      role: "Stock Analysis Workspace",
      status: "Coming Soon",
      statusColor: "text-amber-800 bg-amber-50 border-amber-300",
      cta: "Coming Soon",
      href: "/ai-tools/jaro",
      icon: LineChart,
      accent: "text-indigo-600 bg-indigo-50",
      isComingSoon: true,
    },
    {
      id: "dhruvan",
      name: "Dhruvan AI",
      role: "LSTM Prediction Research",
      status: "Coming Soon",
      statusColor: "text-amber-800 bg-amber-50 border-amber-300",
      cta: "Coming Soon",
      href: "/ai-tools/dhruvan",
      icon: Cpu,
      accent: "text-amber-600 bg-amber-50",
      isComingSoon: true,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-left">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              INTELLIGENCE TERMINALS
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#0B1F3A] mt-0.5">
            Your Market Healers AI Toolkit
          </h3>
        </div>
        <Link
          href="/ai-tools"
          className="text-xs font-semibold text-[#00A88F] hover:underline flex items-center gap-1"
        >
          <span>All 5 Engines</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {tools.map((t) => {
          const Icon = t.icon;
          const cardContent = (
            <>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${t.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${t.statusColor}`}>
                    {t.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#0B1F3A] group-hover:text-[#00A88F] transition-colors">
                  {t.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {t.role}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-[#0B1F3A] group-hover:text-[#00A88F]">
                <span>{t.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </>
          );

          if (t.isExternal) {
            return (
              <a
                key={t.id}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-lg bg-[#F6F8FA] border border-slate-200 hover:border-teal-300 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                {cardContent}
              </a>
            );
          }

          return (
            <Link
              key={t.id}
              href={t.href}
              className="p-4 rounded-lg bg-[#F6F8FA] border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
