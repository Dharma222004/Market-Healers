"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, CircleDot, Lock, ArrowRight } from "lucide-react";

export const LearningPathProgression: React.FC = () => {
  const stages = [
    {
      id: "foundation",
      title: "Foundation",
      level: "Level 01",
      status: "completed" as const,
      description: "Exchange mechanics, orders, clearing",
    },
    {
      id: "technical",
      title: "Technical Analysis",
      level: "Level 02",
      status: "in_progress" as const,
      description: "Support, resistance, EMAs, volume",
    },
    {
      id: "fundamental",
      title: "Fundamental Analysis",
      level: "Level 03",
      status: "in_progress" as const,
      description: "Balance sheets, cash flows, ROCE",
    },
    {
      id: "portfolio",
      title: "Portfolio Construction",
      level: "Level 04",
      status: "locked" as const,
      description: "Asset allocation & drawdown caps",
    },
    {
      id: "advanced",
      title: "Advanced Analysis",
      level: "Level 05 & 06",
      status: "locked" as const,
      description: "Macro liquidity & machine learning",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-left">
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            CURRICULUM MILESTONES
          </span>
          <h3 className="text-lg font-bold text-[#0B1F3A]">
            Your Learning Path Progression
          </h3>
        </div>
        <Link
          href="/learn"
          className="text-xs font-semibold text-[#00A88F] hover:underline flex items-center gap-1"
        >
          <span>View Curriculum Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {stages.map((stg) => (
          <div
            key={stg.id}
            className={`p-4 rounded-lg border flex flex-col justify-between transition-all ${
              stg.status === "completed"
                ? "bg-teal-50/50 border-teal-200"
                : stg.status === "in_progress"
                ? "bg-white border-[#00A88F] ring-1 ring-[#00A88F]/20"
                : "bg-slate-50 border-slate-200 opacity-60"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {stg.level}
                </span>
                {stg.status === "completed" && (
                  <CheckCircle2 className="w-4 h-4 text-[#00A88F]" />
                )}
                {stg.status === "in_progress" && (
                  <CircleDot className="w-4 h-4 text-[#00A88F] animate-pulse" />
                )}
                {stg.status === "locked" && (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>

              <h4 className="text-xs font-bold text-[#0B1F3A] mb-1">
                {stg.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-snug">
                {stg.description}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] font-mono font-semibold uppercase">
              {stg.status === "completed" && (
                <span className="text-emerald-700">Completed</span>
              )}
              {stg.status === "in_progress" && (
                <span className="text-[#00A88F]">In Progress</span>
              )}
              {stg.status === "locked" && (
                <span className="text-slate-400">Locked</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
