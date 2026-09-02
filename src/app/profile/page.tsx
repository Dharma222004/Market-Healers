"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";
import { userDashboardService, UserDashboardData } from "@/lib/services/userDashboardService";
import {
  User,
  Award,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Calendar,
  CreditCard,
  TrendingUp,
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      userDashboardService.getUserDashboardData(user.id, user).then((data) => {
        setDashboardData(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user?.id, user]);

  const streakDays = dashboardData?.streakDays || 0;
  const isPro = dashboardData?.isPro || false;
  const hasActiveCourse = dashboardData?.hasActiveCourse || false;
  const currentCourseLevel = dashboardData?.currentCourse?.level || "Level 01";

  const riskUnderstanding = user?.riskProfile?.riskUnderstanding ?? 0;
  const financialDiscipline = user?.riskProfile?.financialDiscipline ?? 0;
  const archetype = user?.riskProfile?.level || "Pending Calibration";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      {/* Top Dossier Header */}
      <div className="bg-[#08111F] text-slate-200 border border-[#1E2D44] rounded-xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#15253C] border border-[#00A88F] text-[#00A88F] font-bold text-2xl flex items-center justify-center shadow-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {user?.name || "Market Participant"}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0E1A2B] text-[#00A88F] border border-slate-700 font-semibold">
                {isPro ? "PREMIUM_USER" : "FREE_USER"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {user?.email || "investor@markethealers.com"} &bull; Joined{" "}
              {new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        <Link
          href="/settings"
          className="px-4 py-2 bg-[#0E1A2B] hover:bg-[#15253C] border border-slate-700 text-white text-xs font-semibold rounded-md transition-colors"
        >
          Edit Settings
        </Link>
      </div>

      {/* Grid of Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Learning Profile & Objectives */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <BookOpen className="w-4 h-4 text-[#00A88F]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Learning Profile &amp; Objectives
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Experience Tier:</span>
              <span className="font-semibold text-slate-800">{user?.experienceLevel || "Beginner"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Primary Objective:</span>
              <span className="font-semibold text-[#00A88F]">{user?.primaryGoal || "Learn investing"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Curriculum Progression:</span>
              <span className="font-mono font-bold text-slate-800">
                {hasActiveCourse ? currentCourseLevel : "Level 01 (Not Started)"}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Learning Streak:</span>
              <span className={`font-mono font-bold ${streakDays > 0 ? "text-amber-600" : "text-slate-500"}`}>
                {streakDays} {streakDays === 1 ? "Day" : "Days"} Active
              </span>
            </div>
          </div>
        </div>

        {/* Behavioral Risk Profile */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-[#00A88F]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Determind Risk Assessment
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {riskUnderstanding > 0 ? (
              <>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-500">Risk Understanding</span>
                    <span className="font-mono font-bold text-[#0B1F3A]">{riskUnderstanding}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00A88F] h-full rounded-full" style={{ width: `${riskUnderstanding}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-500">Financial Discipline</span>
                    <span className="font-mono font-bold text-[#0B1F3A]">{financialDiscipline}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0B1F3A] h-full rounded-full" style={{ width: `${financialDiscipline}%` }} />
                  </div>
                </div>

                <div className="pt-2 flex justify-between text-slate-500">
                  <span>Archetype:</span>
                  <span className="font-semibold text-slate-800">{archetype}</span>
                </div>
              </>
            ) : (
              <div className="py-2 space-y-2 text-slate-500">
                <p>Investor risk calibration pending.</p>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A88F] hover:underline"
                >
                  <span>Calibrate Profile &rarr;</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Academic Certificates */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Award className="w-4 h-4 text-[#C9A227]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Issued Certificates
            </h3>
          </div>

          <div className="space-y-3">
            {dashboardData?.completedCoursesCount && dashboardData.completedCoursesCount > 0 ? (
              <div className="p-3 bg-[#F6F8FA] border border-slate-200 rounded-lg text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0B1F3A]">Level 01: Market Foundations &amp; Structure</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Honors
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Issued: {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="font-mono text-slate-400">ID: MH-2026-FND-8842</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#F6F8FA] border border-slate-200 rounded-lg text-xs text-slate-500 text-center">
                No certificates earned yet. Complete all lessons in a course to receive your verified credential.
              </div>
            )}
          </div>
        </div>

        {/* Subscription & Entitlements */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard className="w-4 h-4 text-[#00A88F]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Subscription &amp; Platform Access
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Active Membership:</span>
              <span className="font-mono font-bold text-[#00A88F]">
                {isPro ? "Investor Pro" : "Foundational Tier (Free)"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">AI Tool Credits:</span>
              <span className="font-mono text-slate-800">
                {isPro ? "Unlimited Pedagogical Access" : "Standard Pedagogical Access"}
              </span>
            </div>
            <div className="pt-2">
              <Link
                href="/subscription"
                className="text-xs font-semibold text-[#00A88F] hover:underline"
              >
                Manage subscription &amp; view plans &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
