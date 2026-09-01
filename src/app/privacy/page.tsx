import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Server, FileText, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Data Ethics — Market Healers",
  description: "Our comprehensive privacy policy, data protection standards, and user confidentiality commitment.",
};

export default function PrivacyPage() {
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
            <span className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] text-white shadow-2xs whitespace-nowrap">
              Privacy Policy
            </span>
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>DATA PRIVACY &amp; SECURITY PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight leading-tight">
            Institutional Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-slate-500 mt-4">
            <span>LAST REVISED: MARCH 2026</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>VERSION 3.0</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-[#00A88F] font-bold">DPDPA 2023 COMPLIANT</span>
          </div>
        </div>

        {/* Executive Core Pledge */}
        <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-teal-500/10 via-white to-blue-500/10 border border-teal-200/80 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00A88F] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0B1F3A]">
                Our Fundamental Privacy Pledge
              </h3>
              <p className="mt-1.5 text-sm text-slate-700 leading-relaxed font-medium">
                Market Healers does not monetize user data. We will never sell your personal information, investment queries, screening filters, or learning assessments to stock brokers, trading desks, or third-party ad networks.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-12 space-y-10 text-slate-700 leading-relaxed shadow-sm">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              1. Information We Collect
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We collect only the minimum necessary information required to deliver high-quality financial education and personal decision-support tooling:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm space-y-1.5">
                <strong className="text-[#0B1F3A] block font-bold">Account Credentials</strong>
                <p className="text-slate-600 font-normal">Your full name, email address, password hash, and optional profile bio for cohort identification.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm space-y-1.5">
                <strong className="text-[#0B1F3A] block font-bold">Educational Progress</strong>
                <p className="text-slate-600 font-normal">Course module completion, quiz answers, study milestones, and Determind behavioral assessment scores.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm space-y-1.5">
                <strong className="text-[#0B1F3A] block font-bold">AI Tool Interactions</strong>
                <p className="text-slate-600 font-normal">Prompts submitted to Ruzhaa, screener filters executed in Dhaleo, and session state logs.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm space-y-1.5">
                <strong className="text-[#0B1F3A] block font-bold">System Telemetry</strong>
                <p className="text-slate-600 font-normal">Browser user-agent, IP address for session security, latency metrics, and error logs.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              2. How We Use Your Information
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              All processed data is strictly limited to the following operational purposes:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
                <span><strong>Platform Personalization:</strong> Adapting course recommendations and screener defaults to your experience level.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
                <span><strong>Security & Authentication:</strong> Preventing unauthorized logins, credential stuffing, and session hijacking.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
                <span><strong>Community Moderation:</strong> Enforcing our strict Anti-Hype / No-Tips policy to maintain pedagogical rigor.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00A88F] shrink-0 mt-0.5" />
                <span><strong>Service Updates:</strong> Sending essential administrative notices, security alerts, and platform release notes.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              3. AI Tool Queries & Research Confidentiality
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              When you use our integrated AI products (Ruzhaa AI, Dhaleo Screener, Determind Assessment, Jaro, and Dhruvan):
            </p>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-[#0B1F3A]">
                <EyeOff className="w-4 h-4 text-[#00A88F]" />
                <span>Private Model Execution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your conversational research prompts and custom equity screening metrics are not used to train public models or shared with outside market makers. All AI inference queries are processed in isolated sandboxed containers.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              4. Data Security & Storage Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We employ bank-grade security controls to protect your personal information:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A88F] mt-2 shrink-0" />
                <span><strong>Encryption in Transit:</strong> 100% of network traffic is encrypted using TLS 1.3 with strict HTTPS transport security.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A88F] mt-2 shrink-0" />
                <span><strong>Encryption at Rest:</strong> Account databases and backups are encrypted using AES-256.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A88F] mt-2 shrink-0" />
                <span><strong>Zero Financial Credential Storage:</strong> We never collect, process, or store credit card numbers, bank account logins, or UPI pins. All transactions are handled by PCI-DSS Level 1 payment gateways.</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              5. Your Rights: Export & Permanent Deletion
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              In full compliance with India's Digital Personal Data Protection Act (DPDPA 2023) and international data ethics standards, you retain complete sovereignty over your information:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700">
              <li>&bull; <strong>Right to Access &amp; Portability:</strong> Request a full export of your learning history, quiz results, and diagnostic assessments at any time.</li>
              <li>&bull; <strong>Right to Rectification:</strong> Update or correct your profile data through your account settings dashboard.</li>
              <li>&bull; <strong>Right to Erasure (Forget Me):</strong> Request complete and irreversible deletion of your account and all associated records by contacting our privacy team.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
              6. Contact Data Protection Officer
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              For privacy inquiries, data export requests, or security disclosures, contact our designated privacy governance officer:
            </p>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-mono space-y-1">
              <div><strong>GRIEVANCE OFFICER:</strong> Privacy &amp; Data Ethics Committee</div>
              <div><strong>EMAIL:</strong> privacy@markethealers.com</div>
              <div><strong>RESPONSE TIMEFRAME:</strong> Within 48 business hours</div>
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
