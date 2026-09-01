"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth/authContext";
import { MarketTicker } from "@/components/marketing/MarketTicker";
import { Menu, X, ArrowRight, UserCircle, ChevronDown } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close on Escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileMenuOpen, handleEscape]);

  const navLinks = [
    { label: "Learn", href: "/#courses" },
    { label: "AI Tools", href: "/#ai-ecosystem" },
    { label: "Markets", href: "/markets/overview" },
    { label: "Community", href: "/#community" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About", href: "/#how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 font-sans">
      <MarketTicker />
      <div
        className={`transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="block sm:hidden"><Logo variant="dark" size="sm" /></div>
            <div className="hidden sm:block"><Logo variant="dark" size="md" /></div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/70 shadow-2xs">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-[14px] font-bold rounded-xl transition-all duration-150 ${
                      isActive
                        ? "bg-white text-[#0B1F3A] shadow-xs"
                        : "text-slate-600 hover:text-[#0B1F3A] hover:bg-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/onboarding"
                    className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl px-3.5 py-2 transition-colors"
                  >
                    <UserCircle className="w-4 h-4 text-[#00A88F]" />
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-[14px] font-bold text-slate-700 hover:text-[#0B1F3A] rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-bold text-white bg-[#0B1F3A] hover:bg-[#132742] rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 text-[#00A88F]" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-[#0B1F3A] focus:outline-none cursor-pointer rounded-lg hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-white border-b border-slate-200 px-5 space-y-4 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-[80vh] pt-4 pb-6 opacity-100' : 'max-h-0 pt-0 pb-0 opacity-0 border-b-0'
        }`}
      >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#00A88F] rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 text-sm text-slate-600 font-medium">
                  Signed in as <span className="font-bold text-slate-900">{user.name}</span>
                </div>
                <Link
                  href="/onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-sm font-bold text-white bg-[#0B1F3A] rounded-xl block shadow-sm"
                >
                  Onboarding & Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-sm text-red-600 font-bold block cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/onboarding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-sm font-bold text-white bg-[#0B1F3A] hover:bg-[#132742] rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 text-[#00A88F]" />
                </Link>
              </>
            )}
          </div>
        </div>
    </header>
  );
};
