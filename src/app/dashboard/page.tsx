"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";
import { userDashboardService, UserDashboardData } from "@/lib/services/userDashboardService";
import { marketDataService } from "@/lib/market/marketService";
import { MarketIndexQuote } from "@/types";
import {
  Play,
  ArrowRight,
  Clock,
  Sparkles,
  Flame,
  BookOpen,
  RotateCcw,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quotes, setQuotes] = useState<MarketIndexQuote[]>([]);
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  // 1. Fetch Dynamic User Dashboard Data
  const loadDashboardData = async () => {
    if (!user && isAuthLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const activeUserId = user?.id || "anonymous_learner";
      const data = await userDashboardService.getUserDashboardData(activeUserId, user || undefined);
      setDashboardData(data);
    } catch (err: any) {
      console.error("Dashboard dynamic load error:", err);
      setError("Unable to load your personalized learning progress.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthLoading) {
      loadDashboardData();
    }
  }, [user?.id, isAuthLoading]);

  // 2. Fetch Live Market Quotes
  useEffect(() => {
    marketDataService.getIndexQuotes().then((q) => {
      setQuotes(q.slice(0, 3));
    });

    const unsubQuotes = marketDataService.subscribeToTicker((q) => {
      setQuotes(q.slice(0, 3));
    });

    const checkMarketHours = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 3600000 * 5.5);
      const day = ist.getDay();
      if (day === 0 || day === 6) {
        setIsMarketOpen(false);
        return;
      }
      const mins = ist.getHours() * 60 + ist.getMinutes();
      setIsMarketOpen(mins >= 9 * 60 + 15 && mins <= 15 * 60 + 30);
    };

    checkMarketHours();

    return () => {
      unsubQuotes();
    };
  }, []);

  // --------------------------------------------------------------------------
  // SKELETON LOADER (Never flash fake static values while waiting for Supabase)
  // --------------------------------------------------------------------------
  if (isLoading || isAuthLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-pulse">
        <div className="h-16 bg-slate-200/80 rounded-xl w-full" />
        <div className="h-44 bg-slate-200/80 rounded-xl w-full" />
        <div className="h-28 bg-slate-200/80 rounded-xl w-full" />
        <div className="h-32 bg-slate-200/80 rounded-xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-36 bg-slate-200/80 rounded-xl" />
          <div className="h-36 bg-slate-200/80 rounded-xl" />
        </div>
        <div className="h-32 bg-slate-200/80 rounded-xl w-full" />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // ERROR STATE
  // --------------------------------------------------------------------------
  if (error || !dashboardData) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-rose-200 rounded-2xl text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <RotateCcw className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Dashboard Unavailable</h2>
        <p className="text-xs text-slate-500">{error || "Could not retrieve your learning progress."}</p>
        <button
          onClick={loadDashboardData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  // Fallback quotes if market feed is connecting
  const snapshotQuotes =
    quotes.length >= 3
      ? quotes
      : [
          { symbol: "NIFTY 50", name: "NIFTY 50", price: 23914.45, change: -142.1, changePercent: -0.59 },
          { symbol: "BSE SENSEX", name: "SENSEX", price: 76570.35, change: -377.2, changePercent: -0.49 },
          { symbol: "BANK NIFTY", name: "BANK NIFTY", price: 57172.0, change: -235.4, changePercent: -0.41 },
        ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-left">
      {/* 1. HEADER */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight">
          Good morning, {dashboardData.userName}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Continue your learning journey.
        </p>
      </div>

      {/* 2. PROFILE COMPLETION (Only shown if user's profile is incomplete) */}
      {!dashboardData.isProfileComplete && (
        <div className="bg-[#08111F] border border-[#1E2D44] rounded-xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Complete Your Profile
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-900/60 border border-teal-600/40 text-teal-300 font-semibold">
                {dashboardData.profileCompletionPercent}% Complete
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Personalize your learning path and recommendations based on your goals and experience.
            </p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 max-w-xs overflow-hidden">
              <div
                className="bg-[#00A88F] h-full rounded-full transition-all duration-300"
                style={{ width: `${dashboardData.profileCompletionPercent}%` }}
              />
            </div>
          </div>

          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00A88F] hover:bg-[#008B76] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0"
          >
            <span>Complete Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 3. CONTINUE LEARNING (Main Section - 100% Dynamic) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-mono">
              Continue Learning
            </h2>
            {dashboardData.hasActiveCourse && dashboardData.currentCourse && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-[#00A88F] border border-teal-200 font-bold">
                {dashboardData.currentCourse.level}
              </span>
            )}
          </div>
          {dashboardData.hasActiveCourse && dashboardData.currentCourse && (
            <span className="text-xs font-mono text-slate-500 font-medium">
              {dashboardData.currentCourse.title}
            </span>
          )}
        </div>

        {dashboardData.hasActiveCourse && dashboardData.currentCourse && dashboardData.nextLesson ? (
          <>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Next Lesson:
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mt-0.5">
                {dashboardData.nextLesson.title}
              </h3>
              <div className="text-xs font-mono text-slate-500 mt-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{dashboardData.nextLesson.durationMinutes} min</span>
                <span>&bull;</span>
                <span>
                  Lesson {dashboardData.nextLesson.lessonNumber} of {dashboardData.nextLesson.totalLessons}
                </span>
              </div>
            </div>

            {/* Course Progress */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-500">Course Progress</span>
                <span className="font-bold text-[#0B1F3A]">
                  {dashboardData.currentCourse.progressPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#00A88F] h-full rounded-full transition-all duration-500"
                  style={{ width: `${dashboardData.currentCourse.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <Link
                href={`/learn/courses/${dashboardData.currentCourse.id}/lesson/${dashboardData.nextLesson.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#00A88F]" />
                <span>Continue Learning</span>
              </Link>
              <Link
                href={`/learn/courses/${dashboardData.currentCourse.id}`}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                View Syllabus
              </Link>
            </div>
          </>
        ) : (
          /* Empty / New User State */
          <div className="py-3 space-y-3">
            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">
                Start your first course
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                You have not started a learning path yet. Begin with Market Foundations to learn order books and price discovery mechanics.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/learn/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#00A88F]" />
                <span>Explore Courses &rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 4. TODAY'S FOCUS (Personalized) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#00A88F]" />
            <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-mono">
              Today's Focus
            </h2>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
            {dashboardData.todaysFocus.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {dashboardData.todaysFocus.description}
          </p>
          <div className="text-xs font-mono text-slate-400 pt-1">
            {dashboardData.todaysFocus.duration} &bull; {dashboardData.todaysFocus.category}
          </div>
        </div>

        <Link
          href={dashboardData.todaysFocus.actionUrl}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-50 hover:bg-teal-100/80 text-[#00A88F] border border-teal-200 text-xs font-semibold rounded-lg transition-colors shrink-0 self-start sm:self-auto"
        >
          <span>{dashboardData.todaysFocus.actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 5. MARKET SNAPSHOT */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-mono">
              Market Snapshot
            </h2>
            <span className="text-[10px] font-mono text-slate-400">&bull;</span>
            <span className="text-xs font-mono text-slate-500">
              Market Status:{" "}
              <strong className={isMarketOpen ? "text-emerald-600 font-semibold" : "text-slate-700 font-semibold"}>
                {isMarketOpen ? "Market Open" : "Market Closed"}
              </strong>
            </span>
          </div>
          <Link
            href="/markets/overview"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A88F] hover:underline"
          >
            <span>Market Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Compact 3-Index Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {snapshotQuotes.map((q) => {
            const isPos = q.changePercent >= 0;
            return (
              <div
                key={q.symbol}
                className="p-3.5 rounded-lg bg-[#F6F8FA] border border-slate-200 flex items-center justify-between font-tabular"
              >
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">{q.name}</div>
                  <div className="text-sm font-bold font-mono text-slate-900 mt-0.5">
                    ₹{q.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isPos ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                  }`}
                >
                  {isPos ? "+" : ""}
                  {q.changePercent.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6 & 7. YOUR PROGRESS & YOUR STREAK (Dynamic) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 6. YOUR PROGRESS */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-mono">
                Your Progress
              </h2>
              <span className="text-xs font-mono text-slate-500 font-medium">
                {dashboardData.currentLevelDisplay}
              </span>
            </div>

            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-600">Learning Journey</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold font-mono text-[#0B1F3A]">
                  {dashboardData.overallProgressPercent}%
                </span>
                <span className="text-xs font-mono text-slate-500">Complete</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#00A88F] h-full rounded-full transition-all duration-500"
                  style={{ width: `${dashboardData.overallProgressPercent}%` }}
                />
              </div>
              <p className="text-xs font-mono text-slate-500 mt-2">
                {dashboardData.completedCoursesCount} of {dashboardData.totalCoursesCount} Courses Completed
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/learn/courses"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A88F] hover:underline"
            >
              <span>View Learning Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 7. YOUR STREAK */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-mono">
              Your Streak
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
                <Flame className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <div className="text-3xl font-bold font-mono text-[#0B1F3A]">
                  {dashboardData.streakDays}
                </div>
                <div className="text-xs font-mono text-slate-600 font-semibold">
                  Day Streak
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs font-mono text-slate-500">
            {dashboardData.lessonsThisWeek} lessons completed this week
          </div>
        </div>
      </div>

      {/* 8. RECOMMENDED FOR YOU (Personalized from uncompleted courses) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider font-mono">
            Recommended For You
          </h2>
          <Link
            href="/learn/courses"
            className="text-xs font-semibold text-[#00A88F] hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {dashboardData.recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-lg bg-[#F6F8FA] border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-semibold">
                  {rec.category}
                </span>
                <h3 className="text-sm font-bold text-[#0B1F3A] mt-2">
                  {rec.title}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  {rec.level} &bull; {rec.duration}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-200/60">
                <Link
                  href={rec.url}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A88F] hover:underline"
                >
                  <span>Start</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
