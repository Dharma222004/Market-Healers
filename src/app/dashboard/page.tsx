import React from "react";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { MarketOverviewWidget } from "@/components/dashboard/MarketOverviewWidget";
import { LearningPathProgression } from "@/components/dashboard/LearningPathProgression";
import { WatchlistWidget } from "@/components/dashboard/WatchlistWidget";
import { AiToolkitWidget } from "@/components/dashboard/AiToolkitWidget";

export const metadata = {
  title: "Dashboard — Market Healers Learning Terminal",
  description: "Personal investor learning terminal, progression matrix, market tracking, and AI intelligence tools.",
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* 1. Personalized Journey & Stats Hero */}
      <DashboardHero />

      {/* 2. Core Learning & Live Market Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 flex">
          <div className="w-full flex">
            <ContinueLearningCard />
          </div>
        </div>
        <div className="lg:col-span-5 flex">
          <div className="w-full flex">
            <MarketOverviewWidget />
          </div>
        </div>
      </div>

      {/* 3. 5-Stage Learning Path Progression */}
      <LearningPathProgression />

      {/* 4. Watchlist & AI Toolkit Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex">
          <div className="w-full flex">
            <WatchlistWidget />
          </div>
        </div>
        <div className="lg:col-span-7 flex">
          <div className="w-full flex">
            <AiToolkitWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
