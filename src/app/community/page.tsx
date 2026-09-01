"use client";

import React from "react";
import {
  Users,
  Calendar,
  Video,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function CommunityPage() {
  const events = [
    {
      title: "Saturday Macro Breakdown: Q3 Earnings & India VIX Dynamics",
      date: "Saturday, 11:00 AM IST",
      host: "Siddharth Sen",
      type: "Live Cohort Webinar",
      status: "Upcoming",
    },
    {
      title: "Level 02 Study Group: Confluence Zones in Trending Markets",
      date: "Tuesday, 7:00 PM IST",
      host: "Aditya Verma",
      type: "Peer Review",
      status: "Registration Open",
    },
    {
      title: "Fundamental Dissection: ROCE vs. ROE Case Study (TCS & L&T)",
      date: "Thursday, 8:00 PM IST",
      host: "Dr. Meera Nambiar",
      type: "Research Masterclass",
      status: "Recorded Archive",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#00A88F]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
            COLLABORATIVE RIGOR
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] tracking-tight mt-1">
          Education-Centric Community &amp; Cohorts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dedicated study groups, weekend macroeconomic dissections, and mentor reviews. No stock tipping or social noise.
        </p>
      </div>

      {/* Strict Anti-Hype Pledge */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 space-y-1">
          <strong className="text-[#0B1F3A] block">Zero-Tolerance Anti-Speculation Policy</strong>
          <p className="leading-relaxed">
            Market Healers strictly prohibits sharing buy/sell stock calls, target prices, or speculative tips. All cohort discussions must center on verifiable financial statements, price action geometry, and personal risk management parameters.
          </p>
        </div>
      </div>

      {/* Upcoming Sessions & Webinars */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#0B1F3A]">Upcoming Cohort Masterclasses</h2>
        <div className="space-y-3">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-50 text-[#00A88F] border border-teal-200">
                    {event.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">&bull; {event.date}</span>
                </div>
                <h3 className="text-sm font-bold text-[#0B1F3A]">
                  {event.title}
                </h3>
                <div className="text-xs text-slate-500">Instructor: {event.host}</div>
              </div>

              <button
                type="button"
                className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors shrink-0 self-start sm:self-auto"
              >
                Join Webinar Room
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Peer Study Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-[#F6F8FA] border border-slate-200 rounded-xl space-y-3">
          <h3 className="text-sm font-bold text-[#0B1F3A]">Level 01 &amp; 02 Study Group</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Collaborative peer review of order book mechanics, candlestick charts, and support/resistance levels.
          </p>
          <button className="text-xs font-semibold text-[#00A88F] hover:underline flex items-center gap-1">
            <span>Join Cohort Channel</span> &rarr;
          </button>
        </div>

        <div className="p-5 bg-[#F6F8FA] border border-slate-200 rounded-xl space-y-3">
          <h3 className="text-sm font-bold text-[#0B1F3A]">Level 03 &amp; 04 Analyst Forum</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Interrogating quarterly audited balance sheets and building valuation spreadsheets using Jaro AI data.
          </p>
          <button className="text-xs font-semibold text-[#00A88F] hover:underline flex items-center gap-1">
            <span>Join Analyst Forum</span> &rarr;
          </button>
        </div>
      </div>

    </div>
  );
}
