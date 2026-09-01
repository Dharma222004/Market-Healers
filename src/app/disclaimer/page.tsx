import React from "react";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, FileText, ArrowLeft, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Regulatory & Financial Risk Disclosures — Market Healers",
  description: "Complete educational disclaimers, machine learning research notices, and financial risk disclosures.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 sm:py-20 bg-[#F6F8FA] min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Document Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00A88F] hover:text-[#0B1F3A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Platform
          </Link>

          {/* Legal Document Navigation Tabs */}
          <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-xs font-bold overflow-x-auto max-w-full">
            <span className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] text-white shadow-2xs whitespace-nowrap">
              Risk Disclosure
            </span>
            <Link
              href="/privacy"
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0B1F3A] transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0B1F3A] transition-colors whitespace-nowrap"
            >
              Terms of Use
            </Link>
          </div>
        </div>

        {/* Header Banner */}
        <div className="border-b border-slate-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>COMPLIANCE &amp; RISK GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
            Financial &amp; Model Risk Disclosures
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-slate-500 mt-4">
            <span>LAST REVISED: MARCH 2026</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>VERSION 2.1</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-amber-800 font-bold">MANDATORY COMPLIANCE RECORD</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-12 space-y-10 text-slate-700 leading-relaxed shadow-sm">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              1. Educational &amp; Decision-Support Purpose
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Market Healers is operated solely as an independent financial education and decision-support technology platform. All content, interactive modules, articles, webinars, mathematical formulas, and screener queries provided on this site are designed exclusively for educational, cognitive, and research purposes.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Nothing on Market Healers constitutes, nor should be construed as, personal financial, legal, tax, or investment advice. Market Healers does not recommend the purchase, sale, or holding of any security, mutual fund, or derivative instrument.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              2. Absence of SEBI Registration as Investment Advisor
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Market Healers Technologies is an educational software provider. We are <strong>NOT registered with the Securities and Exchange Board of India (SEBI)</strong> as a Research Analyst (RA), Investment Adviser (IA), or Portfolio Management Service (PMS) provider. We do not provide buy/sell stock tips, execution brokerage, or asset management.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              3. Artificial Intelligence &amp; Probabilistic Model Notice (Dhruvan AI)
            </h2>
            <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-300 text-sm text-amber-950 space-y-3">
              <div className="flex items-center gap-2 font-black text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                <span>CRITICAL NOTICE REGARDING DHRUVAN &amp; AI MODELS:</span>
              </div>
              <p className="leading-relaxed">
                Dhruvan AI utilizes Long Short-Term Memory (LSTM) machine learning models that analyze historical price action and volume patterns. All model outputs, vectors, and movement probabilities are mathematical approximations based on past occurrences.
              </p>
              <p className="leading-relaxed font-semibold">
                Historical patterns do not guarantee future market behavior. Model output is probabilistic and must never be treated as an investment recommendation or a guarantee of financial return.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              4. Securities Market Risk Warning
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Investments in the securities market are subject to market risks. Read all related scheme documents and corporate filings carefully before investing. Equity values can fluctuate significantly due to corporate performance, interest rate changes, macroeconomic shifts, and geopolitical factors. Capital invested is at risk of partial or total loss.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              5. Accuracy of Third-Party &amp; Historical Data
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              While Market Healers strives to maintain reliable market feeds and financial statement metrics, market data may experience latencies, transmission anomalies, or corporate reporting revisions. Market Healers accepts no liability for decisions made based on real-time or historical data delays.
            </p>
          </section>

          {/* Footer Back */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Market Healers Compliance &amp; Governance</span>
            <Link href="/" className="font-bold text-[#00A88F] hover:underline">
              Return to Homepage &rarr;
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
