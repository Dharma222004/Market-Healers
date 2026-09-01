import React from "react";
import Link from "next/link";
import { Check, Shield, Sparkles, ArrowRight } from "lucide-react";

export const PricingSection: React.FC = () => {
  const plans = [
    {
      id: "free",
      name: "Foundational Tier",
      badge: "Open Access",
      price: "₹0",
      period: "Forever Free",
      description: "Start understanding financial markets with foundational modules and basic screening.",
      features: [
        "Access to Level 01: Market Foundations",
        "Ruzhaa AI Tutor (20 concept queries / week)",
        "Standard Dhaleo Stock Screener (top 100 NSE stocks)",
        "Daily Market Overview & Ticker Feeds",
        "Determind Initial Risk Assessment",
      ],
      ctaText: "Start Learning Free",
      isPrimary: false,
      accentColor: "border-slate-200",
    },
    {
      id: "pro",
      name: "Investor Pro",
      badge: "Most Popular",
      price: "₹1,499",
      period: "per month / billed annually",
      description: "For active learners and investors seeking in-depth equity research and advanced analysis.",
      features: [
        "Complete Access to Levels 01 through Level 04",
        "Unlimited Ruzhaa AI Financial Concept Tutor",
        "Full Dhaleo Screener across 2,400+ NSE/BSE equities",
        "Jaro Equity Analysis Terminal & dossiers",
        "Determind Full Behavioral & Emotional Risk Profiling",
        "Weekly Cohort Market Breakdown Webinars",
      ],
      ctaText: "Choose Investor Pro",
      isPrimary: true,
      accentColor: "border-[#00A88F] shadow-lg relative ring-1 ring-[#00A88F]",
    },
    {
      id: "premium",
      name: "Institutional Alpha",
      badge: "Complete Suite",
      price: "₹3,499",
      period: "per month / billed annually",
      description: "Comprehensive ecosystem access including machine learning research models and direct mentor reviews.",
      features: [
        "Complete Access to All 6 Curriculum Levels",
        "All Pro features included",
        "Dhruvan AI LSTM Predictive Research Sandbox",
        "Direct 1-on-1 Monthly Mentor Research Review",
        "Custom Screener Formulas & Exportable Dossiers",
        "Priority Access to Masterclasses & Case Studies",
      ],
      ctaText: "Access Institutional Alpha",
      isPrimary: false,
      accentColor: "border-slate-300",
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-[#F6F8FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00A88F] mb-3">
            MEMBERSHIP TIERS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A] tracking-tight text-balance">
            Transparent Investment in Your Knowledge.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#667085] text-balance">
            Clear, upfront pricing with zero hidden advisory fees. Learn at your own pace with our structured education and decision-support tools.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-5 sm:p-8 flex flex-col justify-between border ${plan.accentColor} text-left`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    {plan.name}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      plan.isPrimary
                        ? "bg-teal-50 text-[#00A88F] border-teal-200 font-bold"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] font-mono tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500 ml-2 font-medium">
                    {plan.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-3 mb-8 pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Included in this plan:
                  </div>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#00A88F] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/onboarding"
                  className={`w-full py-3.5 min-h-[44px] rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    plan.isPrimary
                      ? "bg-[#0B1F3A] hover:bg-[#132742] text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-[#0B1F3A]"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#00A88F]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slate-500">
          Payment processing abstraction prepared for Razorpay and Stripe. Cancel anytime. All tiers come with 100% money-back guarantee within 7 days.
        </div>

      </div>
    </section>
  );
};
