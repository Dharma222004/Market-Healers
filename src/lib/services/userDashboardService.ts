import { supabase } from "@/lib/supabase/client";
import { MOCK_COURSES } from "@/lib/db/mockDb";
import { DBCourse, DBLesson } from "@/types/database";

export interface UserDashboardData {
  userId: string;
  userName: string;
  email: string;
  avatarUrl?: string;

  // Profile completion
  profileCompletionPercent: number;
  isProfileComplete: boolean;
  missingProfileFields: string[];

  // Subscription
  subscriptionPlan: "free" | "pro" | "premium";
  subscriptionStatus: "active" | "trialing" | "past_due" | "cancelled" | "expired";
  isPro: boolean;

  // Active learning & Continue Learning
  hasActiveCourse: boolean;
  currentCourse?: {
    id: string;
    title: string;
    level: string;
    category: string;
    progressPercent: number;
    completedLessonsCount: number;
    totalLessonsCount: number;
  };
  nextLesson?: {
    id: string;
    title: string;
    durationMinutes: number;
    lessonNumber: number;
    totalLessons: number;
    contentSummary: string;
  };

  // Today's Focus
  todaysFocus: {
    title: string;
    description: string;
    duration: string;
    category: string;
    actionText: string;
    actionUrl: string;
  };

  // Overall Progress
  completedCoursesCount: number;
  totalCoursesCount: number;
  overallProgressPercent: number;
  currentLevelDisplay: string;

  // Streak & Activity
  streakDays: number;
  lessonsThisWeek: number;

  // Recommendations
  recommendations: Array<{
    id: string;
    title: string;
    level: string;
    duration: string;
    category: string;
    url: string;
  }>;
}

// User-scoped Local Cache Key for offline / fallback synchronization
const getUserStateKey = (userId: string) => `mh_state_${userId}`;

interface StoredUserState {
  completedLessonIds: Record<string, string[]>; // courseId -> lessonIds[]
  activeCourseId?: string;
  currentLessonId?: string;
  activityDates: string[]; // ['2026-09-01', '2026-09-02']
  subscriptionPlan: "free" | "pro";
  profileFields: {
    fullName?: string;
    experienceLevel?: string;
    primaryGoal?: string;
    riskProfile?: any;
    marketInterests?: string[];
  };
}

function getStoredState(userId: string): StoredUserState {
  if (typeof window === "undefined") {
    return {
      completedLessonIds: {},
      activityDates: [],
      subscriptionPlan: "free",
      profileFields: {},
    };
  }
  try {
    const raw = localStorage.getItem(getUserStateKey(userId));
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not read local user state:", e);
  }
  return {
    completedLessonIds: {},
    activityDates: [],
    subscriptionPlan: "free",
    profileFields: {},
  };
}

function saveStoredState(userId: string, state: StoredUserState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getUserStateKey(userId), JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save local user state:", e);
  }
}

/**
 * Calculate dynamic learning streak from consecutive distinct dates
 */
function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Remove duplicates and sort descending
  const uniqueDates = Array.from(new Set(dates)).sort().reverse();
  if (uniqueDates.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const toYMD = (d: Date) => d.toISOString().split("T")[0];
  const todayStr = toYMD(today);
  const yesterdayStr = toYMD(yesterday);

  const mostRecent = uniqueDates[0];
  // If the user's latest activity was neither today nor yesterday, streak is broken
  if (mostRecent !== todayStr && mostRecent !== yesterdayStr) {
    return 0;
  }

  let streak = 0;
  let checkDate = new Date(mostRecent);

  for (const dateStr of uniqueDates) {
    const d = new Date(dateStr);
    const diffDays = Math.round((checkDate.getTime() - d.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 0) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (diffDays === 1) {
      streak++;
      checkDate = new Date(d);
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Count activities completed in the current calendar week (Monday to Sunday)
 */
function calculateLessonsThisWeek(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday
  const diffToMonday = (day + 6) % 7;

  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  const mondayStr = monday.toISOString().split("T")[0];

  return dates.filter((d) => d >= mondayStr).length;
}

export class UserDashboardService {
  /**
   * Main Dynamic Dashboard Data Fetcher
   */
  async getUserDashboardData(
    userId: string,
    authUser?: { name?: string; email?: string; user_metadata?: any; role?: string }
  ): Promise<UserDashboardData> {
    const userState = getStoredState(userId);
    const email = authUser?.email || "learner@markethealers.com";
    const userName =
      userState.profileFields.fullName ||
      authUser?.name ||
      authUser?.user_metadata?.name ||
      authUser?.user_metadata?.full_name ||
      email.split("@")[0] ||
      "Learner";

    // 1. Check Supabase DB tables for Profile & Subscription
    let dbProfile: any = null;
    let dbSubscription: any = null;
    let dbEnrollments: any[] = [];
    let dbActivities: any[] = [];

    if (supabase) {
      try {
        const [profRes, subRes, enrRes, actRes] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
          supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle(),
          supabase.from("course_enrollments").select("*").eq("user_id", userId),
          supabase.from("learning_activities").select("*").eq("user_id", userId),
        ]);

        if (profRes.data) dbProfile = profRes.data;
        if (subRes.data) dbSubscription = subRes.data;
        if (enrRes.data) dbEnrollments = enrRes.data;
        if (actRes.data) dbActivities = actRes.data;
      } catch (e) {
        // PostgREST table might not exist yet or offline; fallback is used safely
      }
    }

    // 2. Profile Completion Calculation
    const experienceLevel =
      dbProfile?.experience_level ||
      userState.profileFields.experienceLevel ||
      authUser?.user_metadata?.experienceLevel;

    const primaryGoal =
      dbProfile?.primary_goal ||
      userState.profileFields.primaryGoal ||
      authUser?.user_metadata?.primaryGoal;

    const riskProfile =
      dbProfile?.risk_profile ||
      userState.profileFields.riskProfile ||
      authUser?.user_metadata?.riskProfile;

    const marketInterests =
      dbProfile?.preferred_sectors ||
      userState.profileFields.marketInterests ||
      authUser?.user_metadata?.marketInterests;

    const missingFields: string[] = [];
    let score = 0;

    // Field 1: Name (20%)
    if (userName && userName !== "Learner") {
      score += 20;
    } else {
      missingFields.push("Full Name");
    }

    // Field 2: Experience Level (20%)
    if (experienceLevel && experienceLevel !== "Beginner") {
      score += 20;
    } else if (experienceLevel === "Beginner") {
      score += 10;
      missingFields.push("Experience Level Confirmation");
    } else {
      missingFields.push("Experience Level");
    }

    // Field 3: Learning Goal (20%)
    if (primaryGoal) {
      score += 20;
    } else {
      missingFields.push("Learning Goal");
    }

    // Field 4: Risk Profile (20%)
    if (riskProfile && riskProfile.level) {
      score += 20;
    } else {
      missingFields.push("Risk Profile Questionnaire");
    }

    // Field 5: Market Interests (20%)
    if (marketInterests && marketInterests.length > 0) {
      score += 20;
    } else {
      missingFields.push("Preferred Market Sectors");
    }

    const profileCompletionPercent = Math.min(100, Math.max(0, score));
    const isProfileComplete = profileCompletionPercent === 100;

    // 3. Subscription Status (authoritative)
    const subscriptionPlan: "free" | "pro" | "premium" =
      dbSubscription?.plan ||
      userState.subscriptionPlan ||
      (authUser?.role === "PREMIUM_USER" ? "pro" : "free");

    const subscriptionStatus = dbSubscription?.status || "active";
    const isPro =
      (subscriptionPlan === "pro" || subscriptionPlan === "premium") &&
      subscriptionStatus === "active";

    // 4. Learning Activity & Streak Calculation
    let activityDates: string[] = userState.activityDates || [];
    if (dbActivities && dbActivities.length > 0) {
      const datesFromDb = dbActivities.map((a) => a.activity_date);
      activityDates = Array.from(new Set([...activityDates, ...datesFromDb]));
    }
    const streakDays = calculateStreak(activityDates);
    const lessonsThisWeek = calculateLessonsThisWeek(activityDates);

    // 5. Course Enrollments & Current Learning
    const totalCoursesCount = MOCK_COURSES.length;
    let completedCoursesCount = 0;
    let totalCompletedLessons = 0;
    let totalLessonsAcrossCatalog = 0;

    MOCK_COURSES.forEach((c) => {
      const lessonsInCourse = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      totalLessonsAcrossCatalog += lessonsInCourse;

      const userCompletedForCourse = userState.completedLessonIds[c.id] || [];
      if (userCompletedForCourse.length >= lessonsInCourse && lessonsInCourse > 0) {
        completedCoursesCount++;
      }
      totalCompletedLessons += userCompletedForCourse.length;
    });

    const overallProgressPercent =
      totalLessonsAcrossCatalog > 0
        ? Math.min(100, Math.round((totalCompletedLessons / totalLessonsAcrossCatalog) * 100))
        : 0;

    // Identify active course
    let activeCourse: DBCourse | null = null;
    let activeEnrollmentCompletedIds: string[] = [];

    // Check if user has an active course selected or in progress
    if (userState.activeCourseId) {
      activeCourse = MOCK_COURSES.find((c) => c.id === userState.activeCourseId) || null;
      if (activeCourse) {
        activeEnrollmentCompletedIds = userState.completedLessonIds[activeCourse.id] || [];
      }
    }

    // If no active course was explicitly tracked, find first course where user has in-progress lessons
    if (!activeCourse) {
      for (const c of MOCK_COURSES) {
        const completed = userState.completedLessonIds[c.id] || [];
        const total = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        if (completed.length > 0 && completed.length < total) {
          activeCourse = c;
          activeEnrollmentCompletedIds = completed;
          break;
        }
      }
    }

    const hasActiveCourse = activeCourse !== null && activeEnrollmentCompletedIds.length > 0;

    let currentCourseData: UserDashboardData["currentCourse"] = undefined;
    let nextLessonData: UserDashboardData["nextLesson"] = undefined;

    if (activeCourse) {
      const allLessons: DBLesson[] = activeCourse.modules.flatMap((m) => m.lessons);
      const totalLessonsCount = allLessons.length;
      const completedCount = activeEnrollmentCompletedIds.length;
      const courseProgressPercent =
        totalLessonsCount > 0
          ? Math.min(100, Math.round((completedCount / totalLessonsCount) * 100))
          : 0;

      currentCourseData = {
        id: activeCourse.id,
        title: activeCourse.title,
        level: activeCourse.level,
        category: activeCourse.category,
        progressPercent: courseProgressPercent,
        completedLessonsCount: completedCount,
        totalLessonsCount,
      };

      // Find first incomplete lesson
      let nextLesson: DBLesson | undefined = allLessons.find(
        (l) => !activeEnrollmentCompletedIds.includes(l.id)
      );

      if (!nextLesson && allLessons.length > 0) {
        nextLesson = allLessons[allLessons.length - 1]; // Course completed, last lesson
      }

      if (nextLesson) {
        const lessonIndex = allLessons.findIndex((l) => l.id === nextLesson?.id);
        nextLessonData = {
          id: nextLesson.id,
          title: nextLesson.title,
          durationMinutes: nextLesson.durationMinutes,
          lessonNumber: lessonIndex >= 0 ? lessonIndex + 1 : 1,
          totalLessons: totalLessonsCount,
          contentSummary: nextLesson.contentSummary,
        };
      }
    }

    // 6. Today's Focus (Dynamic personalization)
    let todaysFocus: UserDashboardData["todaysFocus"];

    if (hasActiveCourse && nextLessonData && currentCourseData) {
      todaysFocus = {
        title: nextLessonData.title,
        description: nextLessonData.contentSummary || "Master this core topic to progress to your next milestone.",
        duration: `${nextLessonData.durationMinutes} min`,
        category: currentCourseData.category,
        actionText: "Start Lesson →",
        actionUrl: `/learn/courses/${currentCourseData.id}/lesson/${nextLessonData.id}`,
      };
    } else {
      // New user default
      todaysFocus = {
        title: "Start your learning journey",
        description: "Explore the structure of financial markets, price-time priority order matching, and institutional execution.",
        duration: "35 min",
        category: "Market Foundations",
        actionText: "Explore Courses →",
        actionUrl: "/learn/courses",
      };
    }

    // 7. Recommendations (Dynamic filtering)
    // Filter out already 100% completed courses
    const nonCompletedCourses = MOCK_COURSES.filter((c) => {
      const completed = userState.completedLessonIds[c.id] || [];
      const total = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      return completed.length < total;
    });

    const recommendations = (nonCompletedCourses.length >= 3 ? nonCompletedCourses : MOCK_COURSES)
      .slice(0, 3)
      .map((c) => ({
        id: c.id,
        title: c.title,
        level: `${c.level} · ${c.durationHours} hrs`,
        duration: `${c.lessonsCount} lessons`,
        category: c.category,
        url: `/learn/courses/${c.id}`,
      }));

    return {
      userId,
      userName,
      email,
      avatarUrl: authUser?.user_metadata?.avatar_url,
      profileCompletionPercent,
      isProfileComplete,
      missingProfileFields: missingFields,
      subscriptionPlan,
      subscriptionStatus,
      isPro,
      hasActiveCourse,
      currentCourse: currentCourseData,
      nextLesson: nextLessonData,
      todaysFocus,
      completedCoursesCount,
      totalCoursesCount,
      overallProgressPercent,
      currentLevelDisplay: activeCourse?.level || "Level 01",
      streakDays,
      lessonsThisWeek,
      recommendations,
    };
  }

  /**
   * Action: Mark a lesson completed by the user
   */
  async recordLessonCompletion(userId: string, courseId: string, lessonId: string): Promise<void> {
    const userState = getStoredState(userId);
    const today = new Date().toISOString().split("T")[0];

    // 1. Record completed lesson ID
    const currentCompleted = userState.completedLessonIds[courseId] || [];
    if (!currentCompleted.includes(lessonId)) {
      currentCompleted.push(lessonId);
    }
    userState.completedLessonIds[courseId] = currentCompleted;
    userState.activeCourseId = courseId;
    userState.currentLessonId = lessonId;

    // 2. Add activity date for streak tracking
    if (!userState.activityDates.includes(today)) {
      userState.activityDates.push(today);
    }

    saveStoredState(userId, userState);

    // 3. Sync to Supabase tables if reachable
    if (supabase) {
      try {
        await Promise.all([
          supabase.from("lesson_progress").upsert({
            user_id: userId,
            course_id: courseId,
            lesson_id: lessonId,
            status: "completed",
            progress_percent: 100,
            completed_at: new Date().toISOString(),
          }),
          supabase.from("learning_activities").upsert({
            user_id: userId,
            activity_type: "lesson_completed",
            activity_date: today,
            course_id: courseId,
            lesson_id: lessonId,
          }),
        ]);
      } catch (e) {
        console.warn("Could not sync lesson completion to Supabase DB:", e);
      }
    }
  }

  /**
   * Action: Start a course
   */
  async startCourse(userId: string, courseId: string): Promise<void> {
    const userState = getStoredState(userId);
    userState.activeCourseId = courseId;
    if (!userState.completedLessonIds[courseId]) {
      userState.completedLessonIds[courseId] = [];
    }
    saveStoredState(userId, userState);

    if (supabase) {
      try {
        await supabase.from("course_enrollments").upsert({
          user_id: userId,
          course_id: courseId,
          progress_percent: 0,
          enrolled_at: new Date().toISOString(),
        });
      } catch (e) {}
    }
  }

  /**
   * Action: Upgrade/Change Subscription
   */
  async updateSubscription(userId: string, plan: "free" | "pro"): Promise<void> {
    const userState = getStoredState(userId);
    userState.subscriptionPlan = plan;
    saveStoredState(userId, userState);

    if (supabase) {
      try {
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          plan,
          status: "active",
          updated_at: new Date().toISOString(),
        });
      } catch (e) {}
    }
  }
}

export const userDashboardService = new UserDashboardService();
