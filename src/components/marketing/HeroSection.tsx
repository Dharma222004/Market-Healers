"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroLogoVideo } from "./HeroLogoVideo";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-[#F6F8FA] border-b border-slate-200 overflow-hidden">
      {/* Subtle background precision financial grid */}
      <div className="absolute inset-0 bg-financial-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Primary Headline */}
            <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[62px] font-bold text-[#0B1F3A] tracking-tight leading-[1.08] text-balance">
              Learn the Market. <br className="hidden sm:inline" />
              <span className="text-[#0B1F3A]">Build Your </span>
              <span className="text-[#00A88F]">Financial Future.</span>
            </h1>

            {/* Supporting Statement */}
            <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-xl">
              From your first stock market lesson to advanced analysis, Market Healers gives you the knowledge, tools, and AI-powered decision support to navigate financial markets with greater clarity.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/onboarding"
                className="inline-flex justify-center items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#0B1F3A] hover:bg-[#132742] rounded-md shadow-sm transition-all"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 text-[#00A88F]" />
              </Link>
              <Link
                href="/#ai-ecosystem"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-base font-semibold text-[#0B1F3A] bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#C9A227]" />
                <span>Explore AI Tools</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Brand Animation Video & Core Philosophy Quote */}
          <div className="lg:col-span-6">
            <HeroLogoVideo />
          </div>

        </div>
      </div>
    </section>
  );
};

