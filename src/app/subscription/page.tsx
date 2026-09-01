"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/authContext";
import { MOCK_SUBSCRIPTION_PLANS } from "@/lib/db/mockDb";
import { Check, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = MOCK_SUBSCRIPTION_PLANS;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
          TRANSPARENT MEMBERSHIP
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight">
          Invest in Your Financial Independence
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Structured courses, AI decision support suites, and institutional equity research tools.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold mt-4">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              billingCycle === "monthly" ? "bg-white text-[#0B1F3A] shadow-2xs" : "text-slate-500"
            }`}
          >
            Billed Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              billingCycle === "annual" ? "bg-[#0B1F3A] text-white shadow-2xs" : "text-slate-500"
            }`}
          >
            <span>Billed Annually</span>
            <span className="text-[10px] text-[#00A88F] font-mono font-bold">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const isCurrentPlan =
            (plan.slug === "pro" && user?.subscriptionStatus === "active") ||
            (plan.slug === "free" && user?.subscriptionStatus !== "active");

          const priceDisplay =
            plan.priceMonthly === 0
              ? "₹0"
              : billingCycle === "annual"
              ? `₹${Math.round(plan.priceAnnual / 12).toLocaleString()}`
              : `₹${plan.priceMonthly.toLocaleString()}`;

          return (
            <div
              key={plan.id}
              className={`p-7 rounded-xl flex flex-col justify-between transition-all bg-white ${
                plan.slug === "pro"
                  ? "border-2 border-[#00A88F] shadow-lg relative ring-1 ring-[#00A88F]"
                  : "border border-slate-200 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[#0B1F3A]">{plan.name}</h3>
                  {plan.slug === "pro" && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-[#00A88F] border border-teal-200">
                      MOST POPULAR
                    </span>
                  )}
                  {isCurrentPlan && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      CURRENT PLAN
                    </span>
                  )}
                </div>

                <div className="my-4">
                  <span className="text-3xl sm:text-4xl font-bold font-mono text-[#0B1F3A]">
                    {priceDisplay}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">/ month</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    Entitlements:
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#00A88F]" />
                    <span>Curriculum: {plan.coursesAccessible}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#00A88F]" />
                    <span>AI Credits: {plan.aiCreditsPerMonth}</span>
                  </div>
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600">
                      <Check className="w-3.5 h-3.5 text-[#00A88F] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  disabled={isCurrentPlan}
                  className={`w-full py-2.5 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isCurrentPlan
                      ? "bg-slate-100 text-slate-400 cursor-default"
                      : plan.slug === "pro"
                      ? "bg-[#0B1F3A] hover:bg-[#132742] text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-[#0B1F3A]"
                  }`}
                >
                  <span>{isCurrentPlan ? "Active Entitlement" : `Upgrade to ${plan.name}`}</span>
                  {!isCurrentPlan && <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs text-slate-400">
        Enterprise &amp; Institutional Mentorship available on request. Payment gateway service ready for Razorpay &amp; Stripe.
      </div>

    </div>
  );
}
