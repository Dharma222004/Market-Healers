import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  withLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = "dark", size = "md", withLink = true }) => {
  const isLight = variant === "light";

  const sizeConfig = {
    sm: { img: "w-8 h-8", title: "text-lg", sub: "text-[9px]" },
    md: { img: "w-10 h-10", title: "text-xl sm:text-2xl", sub: "text-[10px] sm:text-[11px]" },
    lg: { img: "w-13 h-13", title: "text-2xl sm:text-3xl", sub: "text-xs" },
  };

  const cfg = sizeConfig[size] || sizeConfig.md;

  const content = (
    <div className="flex items-center gap-3 select-none group">
      {/* Official emblem with refined shadow and subtle hover effect */}
      <div className="relative flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105">
        <div className="absolute inset-0 bg-[#00A88F]/15 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        <img
          src="/logo/emblem.png"
          alt="Market Healers Official Logo"
          className={`${cfg.img} object-contain drop-shadow-xs relative z-10`}
        />
      </div>

      <div className="flex flex-col text-left justify-center">
        <span
          className={`font-black tracking-tight leading-none ${
            isLight ? "text-white" : "text-[#0B1F3A]"
          } ${cfg.title} transition-colors`}
        >
          MARKET <span className="text-[#00A88F] group-hover:text-emerald-500 transition-colors">HEALERS</span>
        </span>
        <span
          className={`uppercase font-bold tracking-[0.22em] mt-1.5 leading-none ${
            isLight ? "text-slate-300" : "text-slate-500"
          } ${cfg.sub}`}
        >
          Financial Intelligence
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="inline-flex items-center transition-opacity hover:opacity-95">
        {content}
      </Link>
    );
  }

  return content;
};
