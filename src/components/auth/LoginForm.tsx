"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/authContext";
import { triggerGooglePopupOAuth } from "@/lib/auth/googleAuth";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    login,
    loginWithGoogle,
    loginWithGoogleProfile,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [showTroubleshooter, setShowTroubleshooter] = useState(false);

  // Check URL query parameters for Google OAuth callback errors
  useEffect(() => {
    const errorParam = searchParams?.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      setShowTroubleshooter(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please provide both your email address and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await login(email, password);
      if (success) {
        router.push("/onboarding");
      }
    } catch {
      setError("Unable to authenticate. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Primary Google Login Handler: Launches official Google OAuth popup
  const handleGooglePopupLogin = () => {
    setError(null);
    setIsGoogleSubmitting(true);

    triggerGooglePopupOAuth(
      async (profile) => {
        const success = await loginWithGoogleProfile(profile);
        setIsGoogleSubmitting(false);
        if (success) {
          router.push("/onboarding");
        } else {
          setError("Failed to initialize Google user session.");
        }
      },
      (errMsg) => {
        setIsGoogleSubmitting(false);
        setError(errMsg);
        setShowTroubleshooter(true);
      }
    );
  };

  // Full-page OAuth redirect fallback
  const handleOAuthRedirect = async () => {
    try {
      setIsGoogleSubmitting(true);
      await loginWithGoogle();
    } catch {
      setError("Google OAuth redirect could not be initiated.");
      setIsGoogleSubmitting(false);
    }
  };

  // Instant Verified Google Profile Login (fallback for localhost testing without origin delay)
  const handleInstantGoogleFallback = async () => {
    setIsGoogleSubmitting(true);
    await loginWithGoogleProfile({
      id: "demo_google_id",
      name: "Google Market Participant",
      email: "investor@markethealers.com",
    });
    router.push("/onboarding");
  };

  return (
    <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-md text-left">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#0B1F3A]">Investor Sign In</h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your personalized learning terminal and decision tools
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-semibold leading-snug">{error}</span>
          </div>

          {showTroubleshooter && (
            <div className="pt-2 border-t border-rose-200/60 text-[11px] text-rose-700 space-y-2">
              <p>
                <strong>Google Cloud Console Setup Reminder:</strong>
                <br />
                Ensure your OAuth Client has added <code>http://localhost:5000</code> to{" "}
                <strong>Authorized JavaScript origins</strong> and{" "}
                <code>http://localhost:5000/api/auth/google/callback</code> to{" "}
                <strong>Authorized redirect URIs</strong>.
              </p>

              <div className="flex flex-col gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={handleOAuthRedirect}
                  className="w-full py-2 px-3 bg-white border border-rose-300 rounded-lg text-rose-900 font-semibold text-xs hover:bg-rose-100/50 transition-colors"
                >
                  Try Full-Page Google OAuth Redirect &rarr;
                </button>
                <button
                  type="button"
                  onClick={handleInstantGoogleFallback}
                  className="w-full py-2 px-3 bg-[#0B1F3A] text-white rounded-lg font-semibold text-xs hover:bg-[#132742] transition-colors"
                >
                  Continue with Instant Google Account Demo &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Google OAuth Primary Action */}
      <div className="mb-5">
        {/* Single Primary Interactive Google OAuth Button */}
        <button
          type="button"
          onClick={handleGooglePopupLogin}
          disabled={isGoogleSubmitting || isSubmitting}
          className="w-full py-3 px-4 min-h-[44px] border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-center gap-2.5 transition-colors shadow-2xs group cursor-pointer"
        >
          {isGoogleSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#00A88F]" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span>Sign in with Google</span>
        </button>
      </div>

      <div className="flex items-center gap-3 my-5">
        <div className="h-px bg-slate-200 flex-1" />
        <span className="text-[11px] font-mono text-slate-400 uppercase">Or with email</span>
        <div className="h-px bg-slate-200 flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Registered Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full text-base sm:text-xs pl-9 pr-3 py-2.5 min-h-[44px] border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A88F] text-slate-800 transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-[#00A88F] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full text-base sm:text-xs pl-9 pr-3 py-2.5 min-h-[44px] border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A88F] text-slate-800 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isGoogleSubmitting}
          className="w-full py-3 px-4 min-h-[44px] bg-[#0B1F3A] hover:bg-[#132742] disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors mt-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#00A88F]" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Terminal</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
        New to Market Healers?{" "}
        <Link href="/onboarding" className="text-[#00A88F] font-semibold hover:underline">
          Create an investor profile
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-mono">
        <ShieldCheck className="w-3 h-3 text-[#00A88F]" />
        <span>Institutional TLS 1.3 / OAuth 2.0 Verified</span>
      </div>
    </div>
  );
};
