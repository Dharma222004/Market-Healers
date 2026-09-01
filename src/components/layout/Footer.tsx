import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { AlertCircle, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08111F] text-slate-300 pt-16 pb-12 border-t border-[#1E2D44] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4 text-left">
            <Logo variant="light" size="md" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Heal Your Wealth. Build Your Freedom. A premier fintech education and decision-support ecosystem helping individuals cultivate structured market discipline and intelligence.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00A88F] animate-pulse"></span>
              <span className="font-semibold text-slate-300">Platform Active &bull; Market Hours Synchronized</span>
            </div>
          </div>

          {/* Column 1: Education */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Education
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/#courses" className="hover:text-[#00A88F] transition-colors">
                  Foundation Series
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="hover:text-[#00A88F] transition-colors">
                  Technical Analysis
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="hover:text-[#00A88F] transition-colors">
                  Fundamental Valuation
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="hover:text-[#00A88F] transition-colors">
                  Portfolio Structuring
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="hover:text-[#00A88F] transition-colors">
                  Advanced Derivatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: AI Suite */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              AI Decision Suite
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a
                  href="https://www.ruzhaa.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00A88F] transition-colors flex items-center justify-between"
                >
                  <span>Ruzhaa AI</span>
                  <span className="text-[10px] text-teal-400 font-mono font-bold">LIVE ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://dhaleo.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00A88F] transition-colors flex items-center justify-between"
                >
                  <span>Dhaleo AI</span>
                  <span className="text-[10px] text-teal-400 font-mono font-bold">LIVE ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://determind.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00A88F] transition-colors flex items-center justify-between"
                >
                  <span>Determind AI</span>
                  <span className="text-[10px] text-teal-400 font-mono font-bold">LIVE ↗</span>
                </a>
              </li>
              <li>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Jaro AI</span>
                  <span className="text-[9px] text-amber-400/90 font-mono bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40 font-bold">COMING SOON</span>
                </div>
              </li>
              <li>
                <div className="text-slate-400 flex items-center justify-between">
                  <span>Dhruvan AI</span>
                  <span className="text-[9px] text-amber-400/90 font-mono bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/40 font-bold">COMING SOON</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Community */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/markets/overview" className="hover:text-[#00A88F] transition-colors">
                  Market Terminal
                </Link>
              </li>
              <li>
                <Link href="/#community" className="hover:text-[#00A88F] transition-colors">
                  Learning Groups
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#00A88F] transition-colors">
                  Tier Membership
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#00A88F] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#00A88F] transition-colors">
                  Risk Disclosures
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Briefing */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Market Intelligence
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive structured weekly market insights and pedagogical case studies. Zero spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="investor@domain.com"
                className="w-full text-xs px-3.5 py-2.5 bg-[#0E1A2B] border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00A88F]"
              />
              <button
                type="submit"
                className="w-full text-xs font-bold py-2.5 bg-[#00A88F] hover:bg-[#008B76] text-white rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Join Briefing
              </button>
            </form>
          </div>
        </div>

        {/* Regulatory & Risk Disclosure Box - High Contrast & Bold Institutional Styling */}
        <div className="my-10 p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#0E1A2B] to-[#070F1C] border border-amber-500/30 rounded-2xl text-slate-300 space-y-4 shadow-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold uppercase tracking-wider text-xs">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 stroke-[2.5]" />
            <span>IMPORTANT FINANCIAL & RISK DISCLOSURE</span>
          </div>

          <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
            <strong className="text-white font-bold">Market Healers is an educational and analytical software platform.</strong> Content, screener tools, behavioral assessments, and AI models (<strong className="text-slate-100 font-semibold">Ruzhaa, Dhaleo, Determind, Jaro, and Dhruvan</strong>) are published strictly for <strong className="text-slate-100 font-bold">educational, informational, and personal decision-support purposes</strong>. Market Healers <strong className="text-amber-300 font-bold">does NOT offer guaranteed investment returns, managed portfolio schemes, or SEBI-registered portfolio advisory</strong>.
          </p>

          <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
            <strong className="text-white font-bold">Securities markets involve substantial risk of capital loss.</strong> Historical market performance and probabilistic machine learning models (<strong className="text-slate-100 font-semibold">e.g. LSTM time-series forecasts</strong>) <strong className="text-slate-100 font-bold">do not ensure or guarantee future market outcomes</strong>. Users must exercise <strong className="text-white font-bold">independent judgment</strong>, understand their risk tolerance, and consult certified financial professionals before deploying capital.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 font-medium gap-4 pt-2">
          <p>&copy; {new Date().getFullYear()} <strong className="text-slate-200 font-bold">Market Healers Technologies</strong>. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1 sm:gap-2 text-xs sm:text-sm font-bold">
            <Link
              href="/disclaimer"
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              Risk Disclosure
            </Link>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <Link
              href="/privacy"
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <Link
              href="/terms"
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


