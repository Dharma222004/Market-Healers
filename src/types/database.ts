// Database & Domain Models for Market Healers Platform

import { UserRole, ExperienceLevel, PrimaryGoal, RiskProfileLevel } from "@/types";

export interface DBUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  experienceLevel?: ExperienceLevel;
  primaryGoal?: PrimaryGoal;
  subscriptionPlanId: string;
  subscriptionStatus: "active" | "trialing" | "past_due" | "cancelled" | "expired" | "none";
  learningStreakDays: number;
  overallProgressPercent: number;
  completedCoursesCount: number;
  certificatesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DBUserProfile {
  userId: string;
  riskProfile: {
    level: RiskProfileLevel;
    riskUnderstanding: number; // 0 - 100
    financialDiscipline: number; // 0 - 100
    marketKnowledge: number; // 0 - 100
    drawdownTolerance: "Low" | "Moderate" | "High";
    timeHorizon: "Short" | "Medium" | "Long-term";
    emotionalResilienceScore: number;
  };
  preferredSectors: string[];
  learningPace: "Self-Paced" | "Accelerated Cohort";
}

export interface DBCourse {
  id: string;
  slug: string;
  title: string;
  level: string; // "LEVEL 01"
  levelNumber: number;
  category: "Foundations" | "Technical" | "Fundamental" | "Portfolio" | "Derivatives" | "Institutional";
  tagline: string;
  description: string;
  durationHours: number;
  lessonsCount: number;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  modulesCount: number;
  prerequisites: string[];
  skillsLearned: string[];
  thumbnailUrl: string;
  modules: DBCourseModule[];
}

export interface DBCourseModule {
  id: string;
  courseId: string;
  order: number;
  title: string;
  durationMinutes: number;
  lessons: DBLesson[];
}

export interface DBLesson {
  id: string;
  moduleId: string;
  courseId: string;
  order: number;
  title: string;
  durationMinutes: number;
  type: "video" | "interactive_case" | "reading" | "quiz";
  contentSummary: string;
  notesMarkdown?: string;
  videoPlaceholderUrl?: string;
  keyTakeaways: string[];
}

export interface DBEnrollment {
  id: string;
  userId: string;
  courseId: string;
  progressPercent: number;
  currentLessonId: string;
  completedLessonIds: string[];
  isCompleted: boolean;
  enrolledAt: string;
  completedAt?: string;
}

export interface DBCertificate {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  verificationCode: string;
  grade: "Honors" | "Distinction" | "Completed";
}

export interface DBWatchlistItem {
  id: string;
  userId: string;
  symbol: string;
  companyName: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
  high52w: number;
  low52w: number;
  marketCapCr: number;
  addedAt: string;
}

export interface DBNotification {
  id: string;
  userId: string;
  type: "COURSE_UPDATE" | "LESSON_REMINDER" | "CERTIFICATE" | "AI_COMPLETION" | "SYSTEM" | "COMMUNITY";
  title: string;
  message: string;
  linkUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DBSubscriptionPlan {
  id: string;
  slug: "free" | "pro" | "premium";
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  currency: string;
  description: string;
  features: string[];
  aiCreditsPerMonth: number | "Unlimited";
  coursesAccessible: "Level 01" | "Levels 01-04" | "All Levels";
}
