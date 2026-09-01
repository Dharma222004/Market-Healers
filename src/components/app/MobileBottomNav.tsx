"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  BarChart3,
  User,
} from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Learn", href: "/learn", icon: GraduationCap },
    { label: "AI Tools", href: "/ai-tools", icon: Sparkles },
    { label: "Markets", href: "/markets/overview", icon: BarChart3 },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg safe-area-pb">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          pathname === tab.href || (tab.href !== "/dashboard" && pathname.startsWith(tab.href));

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
              isActive ? "text-[#00A88F]" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
            <span
              className={`text-[10px] tracking-tight mt-0.5 ${
                isActive ? "font-bold text-[#0B1F3A]" : "font-normal"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
