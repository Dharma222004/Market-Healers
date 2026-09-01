"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

export default function DetermindPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({
    1: "wealth_building",
    2: "intermediate",
    3: "calculated",
    4: "structured",
    5: "empirical",
    6: "disciplined",
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Financial Objectives & Time Horizon",
      prompt: "What is your primary intent when deploying capital into financial markets?",
      options: [
        { id: "wealth_building", label: "Multi-year compounding & wealth creation (> 5 years)" },
        { id: "income_generation", label: "Generating supplemental quarterly dividends & cash flow" },
        { id: "capital_preservation", label: "Beating inflation while strictly minimizing drawdown risk" },
      ],
    },
    {
      id: 2,
      title: "Market Experience & Mechanics",
      prompt: "How familiar are you with reading balance sheets, cash flows, and order books?",
      options: [
        { id: "beginner", label: "Beginner: Still learning order books and basic terminology" },
        { id: "intermediate", label: "Intermediate: Can read basic P/E ratios and moving averages" },
        { id: "advanced", label: "Advanced: Regularly audit working capital cycles and multi-timeframe charts" },
      ],
    },
    {
      id: 3,
      title: "Risk Awareness & Volatility Reactions",
      prompt: "If your equity portfolio experienced a sudden 20% correction during an earnings season, you would:",
      options: [
        { id: "anxious", label: "Feel severe anxiety and look to exit positions immediately" },
        { id: "calculated", label: "Review fundamental business health calmly before taking action" },
        { id: "opportunistic", label: "Assess if high-ROCE compounders are trading at an attractive discount" },
      ],
    },
    {
      id: 4,
      title: "Learning Behavior & Curiosity",
      prompt: "How do you prefer to develop and test your investment hypotheses?",
      options: [
        { id: "structured", label: "Through structured courses, historical case studies, and mentorship" },
        { id: "experimental", label: "By testing small live positions and keeping a trade journal" },
        { id: "casual", label: "Reading weekend financial columns and listening to quarterly earnings calls" },
      ],
    },
    {
      id: 5,
      title: "Decision-Making Style Under Pressure",
      prompt: "When market participants on social media are hyped about a breakout stock, you usually:",
      options: [
        { id: "fomo", label: "Feel tempted to buy quickly without auditing the valuation" },
        { id: "empirical", label: "Ignore social hype and run an independent Dhaleo/Jaro screening check" },
        { id: "contrarian", label: "Look for reasons why the crowd might be over-optimistic" },
      ],
    },
    {
      id: 6,
      title: "Financial Discipline & Capital Habits",
      prompt: "Do you maintain defined rules for position sizing and maximum loss per trade?",
      options: [
        { id: "undisciplined", label: "No defined position size rules; invest based on current intuition" },
        { id: "developing", label: "Keep a loose percentage cap (e.g. max 10% in one company)" },
        { id: "disciplined", label: "Strict risk budgeting with pre-determined entry, stop, and sizing limits" },
      ],
    },
  ];

  const currentStepData = steps[currentStep - 1];

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRetake = () => {
    setCurrentStep(1);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-left">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A88F]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
            REFLECT // DETERMIND AI
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] tracking-tight mt-1">
          Behavioral &amp; Risk Profiler
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate your risk endurance, cognitive discipline, and customized progression trajectory.
        </p>
      </div>

      {/* Standalone Official Website Launch Banner */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00A88F] animate-pulse shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#0B1F3A]">Official Standalone Platform</p>
            <p className="text-[11px] text-slate-500">Access the full standalone Determind profiler at <strong className="text-[#00A88F]">determind.online</strong></p>
          </div>
        </div>
        <a
          href="https://determind.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors self-start sm:self-auto"
        >
          <span>Open determind.online ↗</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#00A88F]" />
        </a>
      </div>

      {/* Non-Medical / Non-Financial Disclaimer Notice */}
      <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
        <strong>Educational Guidance Notice: </strong>
        Determind AI is a self-assessment educational tool. It does NOT diagnose psychological conditions or provide psychiatric or medical claims, nor does it constitute formal financial advice.
      </div>

      {!isCompleted ? (
        /* Multi-Step Wizard */
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold text-[#0B1F3A]">STEP 0{currentStep} OF 06</span>
              <span>{currentStepData.title}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#00A88F] h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">
              {currentStepData.prompt}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select the response that most honestly reflects your natural behavior.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentStepData.options.map((opt) => {
              const isSelected = answers[currentStep] === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#00A88F] bg-teal-50/40 ring-1 ring-[#00A88F]"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#00A88F] shrink-0 ml-2" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 disabled:opacity-30 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              <span>{currentStep === 6 ? "Synthesize Profile" : "Next Step"}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
            </button>
          </div>
        </div>
      ) : (
        /* Synthesized Profile Result */
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#00A88F] font-bold">
                DIAGNOSTIC SYNTHESIS COMPLETE
              </span>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mt-0.5">
                Your Investor Learning Profile
              </h2>
            </div>

            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#0B1F3A] border border-slate-300 rounded px-3 py-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retake Assessment</span>
            </button>
          </div>

          {/* Archetype Card */}
          <div className="bg-[#08111F] text-slate-200 rounded-xl p-6 border border-[#1E2D44] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2D44]">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Assigned Archetype</span>
                <div className="text-xl font-bold text-white mt-0.5">
                  Disciplined Value Builder
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-950 text-teal-400 border border-teal-800 font-bold">
                HIGH CONVICTION
              </span>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="p-3 bg-[#0E1A2B] rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Experience Baseline</div>
                <div className="text-base font-bold text-white mt-1">Intermediate</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Level 02–03 Capable</div>
              </div>

              <div className="p-3 bg-[#0E1A2B] rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Risk Understanding</div>
                <div className="text-base font-bold text-[#00A88F] mt-1">78% (Strong)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Drawdown Resilient</div>
              </div>

              <div className="p-3 bg-[#0E1A2B] rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400">Financial Discipline</div>
                <div className="text-base font-bold text-emerald-400 mt-1">82% (Superior)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Low FOMO Tendency</div>
              </div>
            </div>
          </div>

          {/* Recommended Learning Path */}
          <div className="p-5 bg-[#F6F8FA] border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#00A88F]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
                Recommended Learning Progression:
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold font-mono text-[#0B1F3A]">
              <span>Foundation</span>
              <span className="text-slate-400">&rarr;</span>
              <span className="text-[#00A88F]">Risk Management &amp; Sizing</span>
              <span className="text-slate-400">&rarr;</span>
              <span>Portfolio Valuation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your patient behavioral profile makes you ideally suited for deep fundamental equity research. We recommend focusing on <strong>Level 03: Fundamental Valuation</strong> to exploit your natural long-term discipline.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Link
              href="/learn/courses/course-3"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md transition-colors"
            >
              <span>Begin Recommended Course</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
