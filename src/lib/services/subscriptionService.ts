import { DBSubscriptionPlan } from "@/types/database";
import { MOCK_SUBSCRIPTION_PLANS } from "@/lib/db/mockDb";

export class SubscriptionService {
  async getPlans(): Promise<DBSubscriptionPlan[]> {
    return [...MOCK_SUBSCRIPTION_PLANS];
  }

  async getPlanBySlug(slug: string): Promise<DBSubscriptionPlan | null> {
    return MOCK_SUBSCRIPTION_PLANS.find((p) => p.slug === slug) || null;
  }
}

export const subscriptionService = new SubscriptionService();

export type AnalyticsEventType =
  | "signup_completed"
  | "onboarding_completed"
  | "course_started"
  | "lesson_completed"
  | "course_completed"
  | "ai_tool_opened"
  | "ai_message_sent"
  | "stock_screen_created"
  | "stock_analysis_started"
  | "determind_completed"
  | "watchlist_added";

class AnalyticsService {
  trackEvent(event: AnalyticsEventType, properties?: Record<string, any>) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Analytics Event] ${event}:`, properties || {});
    }
  }
}

export const analyticsService = new AnalyticsService();
