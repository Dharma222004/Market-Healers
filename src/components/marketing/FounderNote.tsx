"use client";

import React from "react";
import Image from "next/image";

export const FounderNote: React.FC = () => {
  return (
    <section id="founder-note" className="py-12 sm:py-20 lg:py-28 bg-[#F6F8FA] border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Executive Presentation Card */}
        <div className="relative bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-14 shadow-xl overflow-hidden">
          
          {/* Subtle Ambient Studio Background Accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-bl from-[#00A88F]/10 via-[#0B1F3A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-[#C9A227]/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Dual-Column Layout: Portrait Column (Left) + Editorial Manifesto (Right) */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Executive Founder Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-100">
                <Image
                  src="/founder.jpg"
                  alt="Dharmadurai K — Founder, Market Healers"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 420px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Subtle Inner Glass Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08111F]/80 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />

                {/* Executive Nameplate Overlay at Bottom of Photo */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-gradient-to-r from-[#08111F]/95 via-[#0E1A2B]/95 to-[#08111F]/95 backdrop-blur-xl border border-white/25 rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 flex items-center justify-between text-white shadow-2xl">
                  <div className="space-y-0.5">
                    <div className="text-sm sm:text-lg font-extrabold tracking-tight text-white leading-tight">
                      Dharmadurai K
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold text-teal-300 font-mono tracking-wide uppercase">
                      Founder, Market Healers
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-500/20 border border-teal-400/50 text-teal-300 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs shrink-0">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.9)] animate-pulse" />
                    <span>FOUNDER</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Manifesto Content */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 text-left">
              
              {/* Header Meta: Eyebrow Badge */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 sm:pb-4">
                <span className="w-2 h-2 rounded-full bg-[#00A88F]" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#00A88F] uppercase">
                  FOUNDER NOTE
                </span>
              </div>

              {/* Refined Quote Block with Accent Line */}
              <div className="border-l-2 border-[#00A88F] pl-4 sm:pl-6 py-1">
                <blockquote className="font-philosophy text-base sm:text-xl lg:text-[26px] font-medium text-[#0B1F3A] leading-relaxed tracking-tight text-balance">
                  &ldquo;I didn&apos;t want to build a platform that simply tells people what to do with their money. I wanted to build one that teaches them how to understand it.&rdquo;
                </blockquote>
              </div>

              {/* Narrative Paragraph */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                That belief became <strong className="font-semibold text-[#0B1F3A]">Market Healers</strong> — a disciplined ecosystem where foundational education, empirical market intelligence, and decision-support technology come together to help participants build lasting financial autonomy.
              </p>

              {/* Executive Signature & Credentials Block */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] tracking-tight">
                  Dharmadurai K
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                  Founder, Market Healers
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Financial Education &bull; Market Intelligence &bull; AI Decision Tools
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
