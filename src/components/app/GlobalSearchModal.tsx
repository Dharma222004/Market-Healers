"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { MOCK_COURSES } from "@/lib/db/mockDb";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by topbar
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickTools = [
    { name: "Ruzhaa AI Tutor", path: "/ai-tools/ruzhaa", category: "AI Tool" },
    { name: "Dhaleo Stock Screener", path: "/ai-tools/dhaleo", category: "AI Tool" },
    { name: "Determind Investor Profiler", path: "/ai-tools/determind", category: "AI Tool" },
    { name: "Jaro Company Analysis", path: "/ai-tools/jaro", category: "AI Tool" },
    { name: "Dhruvan LSTM Prediction", path: "/ai-tools/dhruvan", category: "AI Tool" },
  ];

  const quickStocks = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", path: "/ai-tools/jaro" },
    { symbol: "TCS", name: "Tata Consultancy Services", path: "/ai-tools/jaro" },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", path: "/ai-tools/jaro" },
    { symbol: "INFY", name: "Infosys Ltd", path: "/ai-tools/jaro" },
  ];

  const filteredCourses = MOCK_COURSES.filter(
    (c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.level.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTools = quickTools.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  const filteredStocks = quickStocks.filter(
    (s) => s.symbol.toLowerCase().includes(query.toLowerCase()) || s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, tools, or stock tickers (e.g. TCS, Ruzhaa)..."
            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Courses & Syllabi
              </div>
              <div className="space-y-1">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/learn/courses/${c.id}`)}
                    className="p-2.5 rounded-md hover:bg-slate-100 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#00A88F]" />
                      <span className="font-semibold text-slate-800 group-hover:text-[#0B1F3A]">
                        {c.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{c.level}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Tools */}
          {filteredTools.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                AI Decision Tools
              </div>
              <div className="space-y-1">
                {filteredTools.map((t) => (
                  <div
                    key={t.name}
                    onClick={() => handleSelect(t.path)}
                    className="p-2.5 rounded-md hover:bg-slate-100 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span className="font-semibold text-slate-800">{t.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stocks */}
          {filteredStocks.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Equities & Companies
              </div>
              <div className="space-y-1">
                {filteredStocks.map((s) => (
                  <div
                    key={s.symbol}
                    onClick={() => handleSelect(s.path)}
                    className="p-2.5 rounded-md hover:bg-slate-100 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#00A88F]" />
                      <span className="font-mono font-bold text-[#0B1F3A]">{s.symbol}</span>
                      <span className="text-slate-500 text-[11px]">&bull; {s.name}</span>
                    </div>
                    <span className="text-[10px] text-[#00A88F] font-mono">Open in Jaro</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with &uarr;&darr; and Enter</span>
          <span>ESC to close</span>
        </div>

      </div>
    </div>
  );
};
