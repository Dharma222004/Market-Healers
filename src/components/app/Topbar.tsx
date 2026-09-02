"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/authContext";
import { notificationService } from "@/lib/services/notificationService";
import { Search, Bell, User as UserIcon, Shield, Sparkles } from "lucide-react";

interface TopbarProps {
  onOpenSearch: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenSearch }) => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(2);

  useEffect(() => {
    notificationService.getUnreadCount().then(setUnreadCount);
  }, []);

  const currentDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const firstName = user?.name ? user.name.split(" ")[0] : "Investor";

  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 select-none">
      {/* Left Title & Date */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <h1 className="text-sm sm:text-base font-bold text-[#0B1F3A]">
            Good morning, {firstName}
          </h1>
        </div>
        <div className="text-[11px] text-[#667085] flex items-center gap-2">
          <span>{currentDate}</span>
          <span>&bull;</span>
          <span>Build your market knowledge one step at a time.</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Global Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F6F8FA] border border-slate-200 text-xs text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors shadow-2xs"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Search courses, tools, tickers...</span>
          <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
            Ctrl+K
          </kbd>
        </button>

        {/* Notifications Icon with Badge */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00A88F]" />
          )}
        </Link>

        {/* Profile Avatar Quick Link */}
        <Link
          href="/profile"
          className="flex items-center gap-2 pl-2 border-l border-slate-200"
          title="User Profile"
        >
          <div className="w-8 h-8 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-xs font-semibold shadow-xs">
            {firstName.charAt(0)}
          </div>
        </Link>
      </div>
    </header>
  );
};
