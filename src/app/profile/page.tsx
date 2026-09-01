"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";
import { MOCK_CERTIFICATES } from "@/lib/db/mockDb";
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
                {user?.role || "FREE_USER"}
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
              <span className="font-mono font-bold text-slate-800">Level 01 &rarr; Level 02</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Learning Streak:</span>
              <span className="font-mono font-bold text-amber-600">7 Days Active</span>
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
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Risk Understanding</span>
                <span className="font-mono font-bold text-[#0B1F3A]">78%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00A88F] h-full rounded-full" style={{ width: "78%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Financial Discipline</span>
                <span className="font-mono font-bold text-[#0B1F3A]">82%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0B1F3A] h-full rounded-full" style={{ width: "82%" }} />
              </div>
            </div>

            <div className="pt-2 flex justify-between text-slate-500">
              <span>Archetype:</span>
              <span className="font-semibold text-slate-800">Disciplined Value Builder</span>
            </div>
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
            {MOCK_CERTIFICATES.map((cert) => (
              <div key={cert.id} className="p-3 bg-[#F6F8FA] border border-slate-200 rounded-lg text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0B1F3A]">{cert.courseTitle}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {cert.grade}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Issued: {cert.issuedAt}</span>
                  <span className="font-mono text-slate-400">ID: {cert.verificationCode}</span>
                </div>
              </div>
            ))}
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
                {user?.subscriptionStatus === "active" ? "Investor Pro" : "Foundational Tier (Free)"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">AI Tool Credits:</span>
              <span className="font-mono text-slate-800">Unlimited Pedagogical Access</span>
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
