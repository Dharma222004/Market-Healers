// Type definitions for Market Healers platform

export type UserRole = "FREE_USER" | "PREMIUM_USER" | "ADMIN" | "MENTOR" | "INSTRUCTOR";

export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";

export type PrimaryGoal = 
  | "Learn investing"
  | "Build long-term portfolio"
  | "Understand markets"
  | "Improve analysis"
  | "Explore trading";

export type RiskProfileLevel = "Conservative" | "Moderate" | "Calculated Growth" | "Aggressive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  experienceLevel?: ExperienceLevel;
  primaryGoal?: PrimaryGoal;
  riskProfile?: {
    level: RiskProfileLevel;
    riskUnderstanding: number; // percentage
    financialDiscipline: number;
    marketKnowledge: number;
  };
  subscriptionStatus: "active" | "trialing" | "past_due" | "cancelled" | "expired" | "none";
  avatarUrl?: string;
  createdAt: string;
}

export interface MarketIndexQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high52w: number;
  low52w: number;
  lastUpdated: string;
}

export interface ScreenerItem {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  changePercent: number;
  marketCapCr: number;
  peRatio: number;
  roePercent: number;
  divYield: number;
}

export interface CourseSummary {
  id: string;
  level: string;
  levelNumber: number;
  title: string;
  description: string;
  durationHours: number;
  lessonsCount: number;
  enrolledStudentsCount: number;
  highlights: string[];
}

export interface AiToolMetadata {
  id: "ruzhaa" | "dhaleo" | "determind" | "jaro" | "dhruvan";
  name: string;
  tagline: string;
  stage: "UNDERSTAND" | "DISCOVER" | "ANALYZE" | "REFLECT" | "RESEARCH";
  description: string;
  disclaimer?: string;
  features: string[];
}
