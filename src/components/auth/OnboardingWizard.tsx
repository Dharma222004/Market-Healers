"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/authContext";
import { ExperienceLevel, PrimaryGoal } from "@/types";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Compass,
  Award,
  BookOpen,
  Sparkles,
  Loader2,
} from "lucide-react";

export const OnboardingWizard: React.FC = () => {
  const router = useRouter();
  const { user, signup, updateOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState<number>(user ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Step 1: Account credentials
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  // Step 2: Experience level
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Beginner");

  // Step 3: Primary goal
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>("Learn investing");

  // Step 4: Risk awareness questionnaire
  const [drawdownComfort, setDrawdownComfort] = useState<string>("moderate");
  const [timeHorizon, setTimeHorizon] = useState<string>("long");
  const [volatilityAction, setVolatilityAction] = useState<string>("rational");

  // Final outcome state
  const [isFinished, setIsFinished] = useState<boolean>(false);

  React.useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
      setCurrentStep((prev) => (prev === 1 ? 2 : prev));
    }
  }, [user]);

  const handleNextFromStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (!user) {
      setIsSubmitting(true);
      await signup(name, email, password || "secret123");
      setIsSubmitting(false);
    }
    setCurrentStep(2);
  };

  const handleCompleteOnboarding = async () => {
    setIsSubmitting(true);
    await updateOnboarding({
      experienceLevel,
      primaryGoal,
      riskAnswers: { drawdownComfort, timeHorizon, volatilityAction },
    });
    setIsSubmitting(false);
    setIsFinished(true);
    setCurrentStep(5);
  };

  return (
    <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-lg">
      {/* Step Indicator Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
          <span>STEP 0{currentStep} OF 05</span>
          <span className="font-semibold text-[#00A88F]">
            {currentStep === 1 && "Account Credentials"}
            {currentStep === 2 && "Experience Level"}
            {currentStep === 3 && "Primary Market Objective"}
            {currentStep === 4 && "Risk & Drawdown Awareness"}
            {currentStep === 5 && "Investor Profile Synthesis"}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#00A88F] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Account Creation */}
      {currentStep === 1 && (
        <form onSubmit={handleNextFromStep1} className="space-y-5">
          <div>
            <h3 className="text-2xl font-bold text-[#0B1F3A]">Create Your Market Healers Account</h3>
            <p className="text-xs text-slate-500 mt-1">
              Begin your structured journey toward disciplined market understanding.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#00A88F] text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@domain.com"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#00A88F] text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Secure Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#00A88F] text-slate-800"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#00A88F]" />
            ) : (
              <>
                <span>Continue to Experience Assessment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
              </>
            )}
          </button>
        </form>
      )}

      {/* STEP 2: Experience Level */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0B1F3A]">What is your current market experience?</h3>
            <p className="text-xs text-slate-500 mt-1">
              We tailor your initial syllabus and AI explanations to avoid either oversimplifying or overwhelming.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                level: "Beginner" as ExperienceLevel,
                title: "Absolute Beginner",
                desc: "New to markets. Want to understand terminology, how the stock exchange works, and avoid common beginner traps.",
              },
              {
                level: "Intermediate" as ExperienceLevel,
                title: "Intermediate Participant",
                desc: "Have bought some equities or mutual funds. Want structured fundamental valuation, chart mechanics, and disciplined screening.",
              },
              {
                level: "Advanced" as ExperienceLevel,
                title: "Active / Advanced Analyst",
                desc: "Experienced with balance sheets and multi-timeframe price action. Seeking portfolio risk budgeting and machine learning models.",
              },
            ].map((opt) => (
              <div
                key={opt.level}
                onClick={() => setExperienceLevel(opt.level)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  experienceLevel === opt.level
                    ? "border-[#00A88F] bg-teal-50/40 ring-1 ring-[#00A88F]"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0B1F3A]">{opt.title}</span>
                  {experienceLevel === opt.level && (
                    <CheckCircle2 className="w-4 h-4 text-[#00A88F]" />
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">{opt.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-[#132742]"
            >
              <span>Next: Primary Goal</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Primary Goal */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0B1F3A]">What is your primary market objective?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Select the primary skill set you want to master in the Market Healers ecosystem.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "Learn investing" as PrimaryGoal,
                title: "Learn investing from first principles",
                sub: "Demystify financial statements, P/E ratios, and company moats.",
              },
              {
                id: "Build long-term portfolio" as PrimaryGoal,
                title: "Build a structured long-term portfolio",
                sub: "Construct resilient asset allocations with disciplined rebalancing.",
              },
              {
                id: "Understand markets" as PrimaryGoal,
                title: "Understand macro market mechanics",
                sub: "Study interest rates, liquidity cycles, and sector rotations.",
              },
              {
                id: "Improve analysis" as PrimaryGoal,
                title: "Improve equity research & stock screening",
                sub: "Master Dhaleo and Jaro to filter high-ROCE compounders.",
              },
              {
                id: "Explore trading" as PrimaryGoal,
                title: "Explore disciplined technical swing analysis",
                sub: "Learn risk management and price action without gambling.",
              },
            ].map((goal) => (
              <div
                key={goal.id}
                onClick={() => setPrimaryGoal(goal.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  primaryGoal === goal.id
                    ? "border-[#00A88F] bg-teal-50/40 ring-1 ring-[#00A88F]"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0B1F3A]">{goal.title}</span>
                  {primaryGoal === goal.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#00A88F]" />
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">{goal.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-[#132742]"
            >
              <span>Next: Risk Awareness</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Risk Awareness Questionnaire */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#0B1F3A]">Risk Awareness & Behavioral Readiness</h3>
            <p className="text-xs text-slate-500 mt-1">
              Markets fluctuate constantly. These three quick diagnostic questions initialize your Determind AI behavioral baseline.
            </p>
          </div>

          {/* Q1: Drawdown comfort */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-600">
              1. If your overall portfolio dipped 15% during a macro correction, what would you do?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: "panic", label: "Sell everything immediately to stop losses" },
                { id: "moderate", label: "Review company fundamentals calmly" },
                { id: "accumulate", label: "Assess whether high-quality stocks are on sale" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setDrawdownComfort(opt.id)}
                  className={`p-3 rounded border text-left transition-all ${
                    drawdownComfort === opt.id
                      ? "border-[#00A88F] bg-teal-50/50 text-[#0B1F3A] font-semibold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q2: Investment Time Horizon */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold uppercase text-slate-600">
              2. What is your intended capital deployment horizon?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: "short", label: "Less than 6 months" },
                { id: "medium", label: "1 to 3 Years" },
                { id: "long", label: "5+ Years (Long-term compounder)" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setTimeHorizon(opt.id)}
                  className={`p-3 rounded border text-left transition-all ${
                    timeHorizon === opt.id
                      ? "border-[#00A88F] bg-teal-50/50 text-[#0B1F3A] font-semibold"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={handleCompleteOnboarding}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#0B1F3A] text-white text-xs font-semibold rounded-md flex items-center gap-2 hover:bg-[#132742]"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#00A88F]" />
              ) : (
                <>
                  <span>Generate Investor Profile</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Personalized Result Outcome */}
      {currentStep === 5 && (
        <div className="space-y-6 text-left animate-in fade-in duration-300">
          <div className="p-4 rounded-lg bg-teal-50/80 border border-teal-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A88F] text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-[#00A88F]">
                ONBOARDING VERIFIED
              </span>
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                Welcome to Market Healers, {name || user?.name || "Investor"}.
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Based on your responses, Determind AI has calibrated your personal investor profile and mapped your starting curriculum.
          </p>

          {/* Diagnostic Archetype & Scores */}
          <div className="bg-[#08111F] text-slate-200 rounded-lg p-5 border border-[#1E2D44] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2D44]">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Assigned Archetype</span>
                <div className="text-base font-bold text-white">
                  {experienceLevel === "Beginner" ? "Foundational Wealth Builder" : "Methodical Equity Analyst"}
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                HEALTHY DISCIPLINE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-2.5 bg-[#0E1A2B] rounded border border-slate-800">
                <div className="text-[10px] text-slate-400">Risk Resilience</div>
                <div className="text-sm font-bold text-[#00A88F] mt-0.5">
                  {drawdownComfort === "panic" ? "48%" : "76%"}
                </div>
              </div>
              <div className="p-2.5 bg-[#0E1A2B] rounded border border-slate-800">
                <div className="text-[10px] text-slate-400">Patience Horizon</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {timeHorizon === "long" ? "88%" : "62%"}
                </div>
              </div>
              <div className="p-2.5 bg-[#0E1A2B] rounded border border-slate-800">
                <div className="text-[10px] text-slate-400">Starting Track</div>
                <div className="text-xs font-bold text-amber-400 mt-1">
                  {experienceLevel === "Beginner" ? "Level 01" : "Level 02"}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="text-xs font-bold text-[#0B1F3A] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#00A88F]" />
              <span>Recommended First Step:</span>
            </div>
            <p className="text-xs text-slate-600">
              {experienceLevel === "Beginner"
                ? "Start with Level 01: Market Foundations. Explore exchange mechanics and order books before analyzing single stocks."
                : "Explore the Dhaleo screener to filter listed companies by ROCE and P/E, and ask Ruzhaa any conceptual questions."}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-3 text-center bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md transition-colors"
            >
              Explore Platform & Tools &rarr;
            </Link>
            <Link
              href="/#courses"
              className="flex-1 py-3 text-center bg-white border border-slate-300 hover:bg-slate-50 text-[#0B1F3A] text-xs font-semibold rounded-md transition-colors"
            >
              Go to Syllabus
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
