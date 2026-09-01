"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ruzhaaServiceExtended, IChatMessage } from "@/lib/services/aiServicesExtended";
import {
  MessageSquare,
  Send,
  Trash2,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  Loader2,
  ExternalLink,
} from "lucide-react";

export default function RuzhaaChatPage() {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What is a moving average?",
    "Explain PE ratio.",
    "How does a stock screener work?",
    "What should I learn after technical analysis?",
  ];

  const loadConversation = () => {
    ruzhaaServiceExtended.getConversation().then(setMessages);
  };

  useEffect(() => {
    loadConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setInputText("");
    setIsTyping(true);
    await ruzhaaServiceExtended.sendMessage(text);
    const updated = await ruzhaaServiceExtended.getConversation();
    setMessages(updated);
    setIsTyping(false);
  };

  const handleClear = async () => {
    await ruzhaaServiceExtended.clearConversation();
    loadConversation();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-80px)] flex flex-col text-left">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/ai-tools" className="p-1.5 rounded text-slate-500 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00A88F]" />
              <h1 className="text-base sm:text-lg font-bold text-[#0B1F3A]">
                Ruzhaa AI // Financial Learning Assistant
              </h1>
            </div>
            <p className="text-[11px] text-slate-500">
              Interactive concept tutor for market terminology, mechanics &amp; balance sheets
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Reset conversation"
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 px-2.5 py-1.5 rounded hover:bg-slate-100 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Standalone Official Website Launch Banner */}
      <div className="mt-3 p-3.5 bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00A88F] animate-pulse shrink-0" />
          <div>
            <p className="text-xs font-bold text-[#0B1F3A]">Official Standalone Platform</p>
            <p className="text-[11px] text-slate-500">Access the full standalone AI assistant at <strong className="text-[#00A88F]">ruzhaa.online</strong></p>
          </div>
        </div>
        <a
          href="https://www.ruzhaa.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00A88F] hover:bg-[#008f7a] text-white text-xs font-semibold rounded-md shadow-xs transition-colors self-start sm:self-auto"
        >
          <span>Open ruzhaa.online ↗</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Mandatory Regulatory Notice Banner */}
      <div className="my-3 p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center gap-2 shrink-0">
        <AlertCircle className="w-4 h-4 text-[#00A88F] shrink-0" />
        <span>
          <strong>Notice: </strong>Ruzhaa is an educational assistant designed to clarify financial concepts. It does not provide personalized investment advice or guaranteed return calls.
        </span>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-none">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-2.5 max-w-[90%] sm:max-w-2xl">
                {!isUser && (
                  <div className="w-7 h-7 rounded-md bg-[#00A88F] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                    R
                  </div>
                )}

                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-[#0B1F3A] text-white rounded-tr-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Follow-up suggestions */}
                  {msg.suggestedFollowUps && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                        Suggested Concept Inquiries:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((chip, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(chip)}
                            className="text-xs px-2.5 py-1 rounded bg-[#F6F8FA] hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-[#0B1F3A] transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#00A88F] font-mono">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Ruzhaa is synthesizing market concepts...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Pills (When chat is young) */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
        <span className="text-[10px] font-mono uppercase text-slate-400 shrink-0">Try asking:</span>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="text-xs px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-[#00A88F] hover:text-[#00A88F] text-slate-700 whitespace-nowrap shadow-2xs transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Composer */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="pt-2 shrink-0">
        <div className="flex items-center gap-2 p-2 bg-white border border-slate-300 rounded-xl shadow-xs focus-within:border-[#00A88F]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Ruzhaa anything (e.g. How does ROCE compare to ROE in financial analysis?)..."
            className="flex-1 px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2 bg-[#0B1F3A] hover:bg-[#132742] disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5 text-[#00A88F]" />
          </button>
        </div>
      </form>

    </div>
  );
}
