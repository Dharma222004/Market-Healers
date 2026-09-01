import { User, UserRole } from "@/types";

export function isUserAuthenticated(user: User | null): boolean {
  return !!user;
}

export function canAccessCourse(user: User | null, courseLevelNumber: number): boolean {
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  // Free tier gets Level 01
  if (courseLevelNumber === 1) return true;
  // Pro tier gets Levels 01-04
  if (courseLevelNumber <= 4 && (user.role === "PREMIUM_USER" || user.subscriptionStatus === "active")) {
    return true;
  }
  // Level 05 and 06 require Institutional / Premium
  return user.role === "PREMIUM_USER" && user.subscriptionStatus === "active";
}

export function canUseAITool(user: User | null, toolId: string): boolean {
  if (!user) return false;
  if (user.role === "ADMIN" || user.role === "PREMIUM_USER") return true;
  // Free users get Ruzhaa, Dhaleo, Determind
  if (["ruzhaa", "dhaleo", "determind"].includes(toolId)) return true;
  // Jaro & Dhruvan require active plan
  return user.subscriptionStatus === "active";
}
