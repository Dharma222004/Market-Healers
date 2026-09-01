"use client";

import React from "react";

export const HeroLogoVideo: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Subtle Ambient Aura */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-[#00A88F]/10 via-[#0B1F3A]/5 to-[#C9A227]/10 rounded-3xl blur-xl opacity-60 pointer-events-none" />

      {/* Clean Premium Presentation Card */}
      <div className="relative bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl flex flex-col items-center justify-center text-center">

        {/* Seamless Statically Embedded Animation */}
        <div className="w-full max-w-full sm:max-w-[400px] aspect-square flex items-center justify-center bg-white overflow-hidden rounded-xl mx-auto">
          <video
            src="/logo/animation.mp4"
            poster="/logo/logo-preview.png"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain pointer-events-none select-none bg-white"
          >
            <source src="/logo/animation.mp4" type="video/mp4" />
            <source src="/logo/Market Healers — Premium Fintech Logo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Philosophy Quote Perfectly Below the Logo */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100/90 w-full max-w-md">
          <p className="font-philosophy text-base sm:text-lg md:text-xl font-medium text-[#0B1F3A] tracking-normal leading-relaxed text-balance">
            Financial Freedom Begins With Understanding, Not Earning.
          </p>
        </div>

      </div>
    </div>
  );
};
