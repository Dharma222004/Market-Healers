"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";
import { Award, Flame, BookOpen, CheckCircle, ArrowRight, ShieldAlert } from "lucide-react";

export const DashboardHero: React.FC = () => {
  const { user } = useAuth();

  const isNewUser = !user?.experienceLevel || user.experienceLevel === "Beginner" && !user.riskProfile;

  if (isNewUser) {
    return (
      <div className="bg-[#08111F] border border-[#1E2D44] rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0E1A2B] border border-slate-700 text-xs font-mono text-[#00A88F]">
            <span>ONBOARDING STEP</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Let's build your personalized learning path.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Complete your investor profile questionnaire to calibrate your risk tolerance and calibrate your starting course.
          </p>
        </div>
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00A88F] hover:bg-[#008B76] text-white text-xs font-semibold rounded-md shadow-xs transition-colors shrink-0"
        >
          <span>Complete Your Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#08111F] border border-[#1E2D44] rounded-xl p-6 text-white shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1E2D44]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
            YOUR MARKET JOURNEY
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
            Investor Discipline Matrix
          </h2>
          <div className="text-xs text-slate-400 mt-1">
            Current Tier: <span className="text-white font-semibold">{user.experienceLevel || "Intermediate"}</span> &bull; Strategy Track:{" "}
            <span className="text-[#00A88F] font-semibold">{user.primaryGoal || "Learn investing"}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1A2B] border border-[#1E2D44] text-xs font-mono text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>7 DAYS STREAK</span>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        <div className="p-3 bg-[#0E1A2B] rounded-lg border border-[#1E2D44]">
          <div className="text-[10px] uppercase font-mono text-slate-400">Overall Progress</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">34%</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#00A88F] h-full rounded-full" style={{ width: "34%" }} />
          </div>
        </div>

        <div className="p-3 bg-[#0E1A2B] rounded-lg border border-[#1E2D44]">
          <div className="text-[10px] uppercase font-mono text-slate-400">Courses Completed</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">2</div>
          <div className="text-[10px] text-slate-400 mt-1">Foundations & Technicals</div>
        </div>

        <div className="p-3 bg-[#0E1A2B] rounded-lg border border-[#1E2D44]">
          <div className="text-[10px] uppercase font-mono text-slate-400">Certificates Earned</div>
          <div className="text-2xl font-bold font-mono text-[#C9A227] mt-1">1</div>
          <div className="text-[10px] text-slate-400 mt-1">Level 01 Verified</div>
        </div>

        <div className="p-3 bg-[#0E1A2B] rounded-lg border border-[#1E2D44]">
          <div className="text-[10px] uppercase font-mono text-slate-400">Financial Discipline</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">81%</div>
          <div className="text-[10px] text-slate-400 mt-1">Determind Metric</div>
        </div>
      </div>
    </div>
  );
};
