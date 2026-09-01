import React from "react";
import Link from "next/link";
import { FileText, ShieldAlert, CheckCircle2, ArrowLeft, Scale, Ban, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms of Service & Usage Standards — Market Healers",
  description: "Platform terms of service, acceptable use policies, and community conduct standards.",
};

export default function TermsPage() {
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
            <Link
              href="/disclaimer"
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0B1F3A] transition-colors whitespace-nowrap"
            >
              Risk Disclosure
            </Link>
            <Link
              href="/privacy"
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-[#0B1F3A] transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <span className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] text-white shadow-2xs whitespace-nowrap">
              Terms of Use
            </span>
          </div>
        </div>

        {/* Header Banner */}
        <div className="border-b border-slate-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Scale className="w-4 h-4 text-blue-700" />
            <span>LEGAL AGREEMENT &amp; OPERATING STANDARDS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
            Terms of Service &amp; Usage Protocols
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-slate-500 mt-4">
            <span>EFFECTIVE DATE: MARCH 2026</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>VERSION 2.1</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-slate-700 font-bold">BINDING AGREEMENT</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-12 space-y-10 text-slate-700 leading-relaxed shadow-sm">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              By accessing, browsing, registering for an account, or using any software, educational course, screener, analytical pipeline, or community forum operated by <strong>Market Healers Technologies</strong> ("Market Healers", "we", "us", or "our"), you ("User", "you") agree to be bound by these Terms of Service. If you do not agree, you must immediately discontinue use of the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              2. Educational License &amp; Scope of Access
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Subject to your adherence to these Terms, Market Healers grants you a personal, non-exclusive, non-transferable, revocable license to access our educational content, algorithmic decision-support tools, and market dashboards solely for your personal, non-commercial financial education and analytical research.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-1">
              <strong className="text-[#0B1F3A] font-bold block">Account Exclusivity:</strong>
              Each account is strictly for single-user access. Account sharing, credential distribution, or concurrent session pooling across multiple parties is strictly prohibited.
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-rose-700">
              <Ban className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
                3. Strictly Prohibited Platform Conduct
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              To safeguard our community integrity and computational infrastructure, users agree NOT to:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span><strong>Data Scraping &amp; Extraction:</strong> Systematically scrape, mine, automated-query, or harvest raw financial quotes, screener tables, or proprietary metrics.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span><strong>Reverse Engineering:</strong> Decompile, reverse engineer, or attempt to extract model parameters, prompts, or source weights from Ruzhaa, Dhaleo, Determind, Jaro, or Dhruvan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span><strong>Commercial Redistribution:</strong> Resell, syndicate, repackage, or broadcast Market Healers course materials, lesson notes, or analytical models for commercial profit.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              4. Community Code of Conduct: Anti-Tips &amp; Anti-Hype Policy
            </h2>
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Zero-Tolerance "No-Tips / No-Gambling" Policy</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-normal">
                Market Healers prohibits all forms of stock tipping, "guaranteed calls", options gambling chatter, pump-and-dump coordination, or unsolicited financial promotion. Any member found posting unsolicited tips, affiliate referral links, or deceptive profit screenshots will face <strong>immediate, permanent termination</strong> without refund.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              5. Regulatory Disclaimer &amp; No Investment Advice
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              You expressly recognize and confirm that <strong>Market Healers is NOT a SEBI-registered Investment Adviser (IA), Research Analyst (RA), or Portfolio Manager (PMS)</strong>. No feature, calculation, AI output, or course webinar constitutes personal investment advice or a recommendation to buy or sell securities. All investment decisions are executed independently at your own financial risk.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              6. Intellectual Property Rights
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              All platform designs, codebases, algorithms, lesson slides, video recordings, interactive diagrams, and trademarks (including Market Healers, Ruzhaa, Dhaleo, Determind, Jaro, and Dhruvan) are the exclusive intellectual property of Market Healers Technologies and protected by Indian and international copyright treaties.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              7. Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              To the maximum extent permitted by applicable law, Market Healers Technologies, its directors, officers, and mentors shall not be held liable for any direct, indirect, incidental, punitive, or consequential financial losses arising from market trades, trading platform outages, third-party data latency, or errors in probabilistic machine learning models.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              8. Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              These Terms of Service are governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, arbitration, or proceeding shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Bengaluru, Karnataka, India</strong>.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              9. Contact &amp; Legal Notices
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              For official legal communications, copyright infringement claims, or compliance notices, please contact:
            </p>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-mono space-y-1">
              <div><strong>LEGAL DEPARTMENT:</strong> Market Healers Technologies</div>
              <div><strong>EMAIL:</strong> legal@markethealers.com</div>
              <div><strong>LOCATION:</strong> Bengaluru, Karnataka, India</div>
            </div>
          </section>

          {/* Footer Back */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Market Healers Legal &amp; Compliance</span>
            <Link href="/" className="font-bold text-[#00A88F] hover:underline">
              Return to Homepage &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
