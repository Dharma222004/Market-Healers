"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, ExperienceLevel, PrimaryGoal } from "@/types";
import { decodeGoogleCredential } from "@/lib/auth/googleAuth";
import { supabase } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithGoogleCredential: (credential: string) => Promise<boolean>;
  loginWithGoogleProfile: (profile: {
    name: string;
    email: string;
    picture?: string;
    id?: string;
  }) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateOnboarding: (data: {
    experienceLevel: ExperienceLevel;
    primaryGoal: PrimaryGoal;
    riskAnswers: any;
  }) => Promise<void>;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = "market_healers_auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // 1. Check for incoming OAuth session in URL parameters (from Google callback)
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const incomingSession = urlParams.get("session");
          if (incomingSession) {
            try {
              const parsedUser = JSON.parse(atob(decodeURIComponent(incomingSession)));
              if (parsedUser && parsedUser.email) {
                if (isMounted) setUser(parsedUser);
                localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(parsedUser));
                const cleanUrl = window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
                if (isMounted) setIsLoading(false);
                return;
              }
            } catch (err) {
              console.warn("Could not decode incoming Google session:", err);
            }
          }
        }

        // 2. Check active Supabase session
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && session.user.email) {
            const mappedUser: User = {
              id: session.user.id,
              name:
                session.user.user_metadata?.name ||
                session.user.user_metadata?.full_name ||
                session.user.email.split("@")[0] ||
                "Investor",
              email: session.user.email,
              role: "FREE_USER",
              experienceLevel: "Beginner",
              primaryGoal: "Learn investing",
              subscriptionStatus: "active",
              createdAt: session.user.created_at || new Date().toISOString(),
              avatarUrl: session.user.user_metadata?.avatar_url,
            };
            if (isMounted) {
              setUser(mappedUser);
              localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mappedUser));
              setIsLoading(false);
            }
            return;
          }
        }

        // 3. Check local storage
        const stored = localStorage.getItem(DEMO_STORAGE_KEY);
        if (stored) {
          if (isMounted) setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.warn("Storage/Supabase access issue:", e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initAuth();

    // Listen to Supabase auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user && session.user.email) {
          const mappedUser: User = {
            id: session.user.id,
            name:
              session.user.user_metadata?.name ||
              session.user.user_metadata?.full_name ||
              session.user.email.split("@")[0] ||
              "Investor",
            email: session.user.email,
            role: "FREE_USER",
            experienceLevel: "Beginner",
            primaryGoal: "Learn investing",
            subscriptionStatus: "active",
            createdAt: session.user.created_at || new Date().toISOString(),
            avatarUrl: session.user.user_metadata?.avatar_url,
          };
          if (isMounted) {
            setUser(mappedUser);
            localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mappedUser));
          }
        }
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Attempt Supabase sign in if available
      if (supabase && pass) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        if (!error && data.user && data.user.email) {
          const authenticatedUser: User = {
            id: data.user.id,
            name: data.user.user_metadata?.name || email.split("@")[0] || "Investor",
            email: data.user.email,
            role: "FREE_USER",
            experienceLevel: "Beginner",
            primaryGoal: "Learn investing",
            subscriptionStatus: "active",
            createdAt: data.user.created_at || new Date().toISOString(),
          };
          setUser(authenticatedUser);
          localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(authenticatedUser));
          setIsLoading(false);
          return true;
        }
      }
    } catch (err) {
      console.warn("Supabase auth attempted, falling back to local session:", err);
    }

    // Fallback/Demo session
    const authenticatedUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim() || "Investor",
      email,
      role: "FREE_USER",
      experienceLevel: "Beginner",
      primaryGoal: "Learn investing",
      subscriptionStatus: "active",
      createdAt: new Date().toISOString(),
    };

    setUser(authenticatedUser);
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(authenticatedUser));
    setIsLoading(false);
    return true;
  };

  const loginWithGoogleCredential = async (credential: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const payload = decodeGoogleCredential(credential);
      if (!payload || !payload.email) {
        throw new Error("Invalid Google token payload");
      }

      const googleUser: User = {
        id: "usr_g_" + (payload.sub || Math.random().toString(36).substring(2, 9)),
        name: payload.name || payload.given_name || "Google User",
        email: payload.email,
        role: "FREE_USER",
        experienceLevel: "Beginner",
        primaryGoal: "Learn investing",
        subscriptionStatus: "active",
        createdAt: new Date().toISOString(),
      };

      setUser(googleUser);
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(googleUser));
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error("Google credential login failed:", err);
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogleProfile = async (profile: {
    name: string;
    email: string;
    picture?: string;
    id?: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    const googleUser: User = {
      id: profile.id ? `usr_g_${profile.id}` : "usr_g_" + Math.random().toString(36).substring(2, 9),
      name: profile.name || profile.email.split("@")[0] || "Google User",
      email: profile.email,
      role: "FREE_USER",
      experienceLevel: "Beginner",
      primaryGoal: "Learn investing",
      subscriptionStatus: "active",
      createdAt: new Date().toISOString(),
      avatarUrl: profile.picture,
    };

    setUser(googleUser);
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(googleUser));
    setIsLoading(false);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    if (typeof window !== "undefined") {
      window.location.href = "/api/auth/google";
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (supabase && pass) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: { name },
          },
        });
        if (!error && data.user && data.user.email) {
          const newUser: User = {
            id: data.user.id,
            name,
            email: data.user.email,
            role: "FREE_USER",
            subscriptionStatus: "trialing",
            createdAt: data.user.created_at || new Date().toISOString(),
          };
          setUser(newUser);
          localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newUser));
          setIsLoading(false);
          return true;
        }
      }
    } catch (err) {
      console.warn("Supabase signup attempted, falling back to local session:", err);
    }

    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: "FREE_USER",
      subscriptionStatus: "trialing",
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const updateOnboarding = async (data: {
    experienceLevel: ExperienceLevel;
    primaryGoal: PrimaryGoal;
    riskAnswers: any;
  }) => {
    if (!user) return;

    const updated: User = {
      ...user,
      experienceLevel: data.experienceLevel,
      primaryGoal: data.primaryGoal,
      riskProfile: {
        level: data.experienceLevel === "Beginner" ? "Moderate" : "Calculated Growth",
        riskUnderstanding: data.experienceLevel === "Beginner" ? 64 : 85,
        financialDiscipline: 82,
        marketKnowledge: data.experienceLevel === "Beginner" ? 48 : 78,
      },
    };

    setUser(updated);
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(DEMO_STORAGE_KEY);
    if (typeof document !== "undefined") {
      document.cookie = "mh_google_session=; path=/; max-age=0";
    }
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
  };

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        loginWithGoogleCredential,
        loginWithGoogleProfile,
        signup,
        logout,
        updateOnboarding,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
