"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/authContext";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  MessageSquare,
  Filter,
  Compass,
  LineChart,
  Cpu,
  BarChart3,
  ListTree,
  Users,
  User,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  LogOut,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isExternal?: boolean;
  isComingSoon?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigationGroups: NavGroup[] = [
    {
      group: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      group: "LEARNING",
      items: [
        { label: "Courses", href: "/learn/courses", icon: BookOpen },
        { label: "My Learning", href: "/learn", icon: GraduationCap },
        { label: "Certificates", href: "/profile", icon: Award },
      ],
    },
    {
      group: "AI TOOLS",
      items: [
        { label: "Ruzhaa AI", href: "https://www.ruzhaa.online/", icon: MessageSquare, badge: "Live ↗", isExternal: true },
        { label: "Dhaleo AI", href: "https://dhaleo.vercel.app/", icon: Filter, badge: "Live ↗", isExternal: true },
        { label: "Determind AI", href: "https://determind.online/", icon: Compass, badge: "Live ↗", isExternal: true },
        { label: "Jaro AI", href: "/ai-tools/jaro", icon: LineChart, badge: "Coming Soon", isComingSoon: true },
        { label: "Dhruvan AI", href: "/ai-tools/dhruvan", icon: Cpu, badge: "Coming Soon", isComingSoon: true },
      ],
    },
    {
      group: "MARKETS",
      items: [
        { label: "Market Overview", href: "/markets/overview", icon: BarChart3 },
        { label: "Watchlist", href: "/markets/watchlist", icon: ListTree },
      ],
    },
    {
      group: "COMMUNITY",
      items: [
        { label: "Community", href: "/community", icon: Users },
      ],
    },
    {
      group: "ACCOUNT",
      items: [
        { label: "Profile", href: "/profile", icon: User },
        { label: "Subscription", href: "/subscription", icon: CreditCard },
        { label: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-[#1E2D44] bg-[#08111F] text-slate-300 transition-all duration-300 z-30 shrink-0 select-none ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header & Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1E2D44]">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <Logo variant="light" size="sm" withLink={false} />
          </div>
        ) : (
          <div className="w-8 h-8 rounded bg-[#0B1F3A] border border-[#1E3352] flex items-center justify-center text-[#00A88F] font-bold text-xs">
            MH
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
        {navigationGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            {!collapsed && (
              <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
                {group.group}
              </div>
            )}
            {group.items.map((item: any) => {
              const Icon = item.icon;
              const isActive = !item.isExternal && (pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)));

              const badgeEl = item.badge ? (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    item.isComingSoon
                      ? "bg-amber-950/70 text-amber-300 border border-amber-800/50"
                      : item.isExternal
                      ? "bg-teal-950/70 text-teal-300 border border-teal-800/40"
                      : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              ) : null;

              if (item.isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all group relative text-slate-400 hover:text-white hover:bg-slate-800/60 ${
                      collapsed ? "justify-center" : ""
                    }`}
                    title={collapsed ? `${item.label} (External Live Suite)` : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0 transition-colors text-[#00A88F]" />
                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between">
                        <span>{item.label}</span>
                        {badgeEl}
                      </div>
                    )}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all group relative ${
                    isActive
                      ? "bg-[#0E1A2B] text-white border-l-2 border-[#00A88F] font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-[#00A88F]" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {badgeEl}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom User Area */}
      <div className="p-3 border-t border-[#1E2D44] bg-[#0A1424] space-y-2">
        <Link
          href="/subscription"
          className={`flex items-center gap-2 p-2 rounded-md bg-[#0E1A2B] border border-[#1E2D44] text-xs hover:border-slate-700 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
          {!collapsed && (
            <div className="flex-1 flex items-center justify-between text-[11px]">
              <span className="text-slate-300">Current Plan</span>
              <span className="font-mono text-[#00A88F] font-semibold">
                {(user as any)?.subscriptionPlan === "pro" || (user as any)?.isPro === true || user?.role === "PREMIUM_USER"
                  ? "PRO"
                  : "FREE"}
              </span>
            </div>
          )}
        </Link>

        <div className={`flex items-center justify-between pt-1 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#15253C] border border-[#1E2D44] text-[#00A88F] font-bold text-xs flex items-center justify-center shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {!collapsed && (
              <div className="overflow-hidden text-left">
                <div className="text-xs font-semibold text-white truncate">
                  {user?.name || "Market Participant"}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user?.email || "investor@markethealers.com"}
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
