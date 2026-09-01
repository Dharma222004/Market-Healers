"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is Market Healers a stock advisory or tips service?",
      answer:
        "No. Market Healers is strictly an educational platform and financial technology decision-support ecosystem. We do not provide buy/sell calls, managed trading accounts, or guaranteed profit schemes. Our sole mission is to empower individuals to analyze markets independently, manage personal risk, and build disciplined investment habits.",
    },
    {
      question: "How do the five AI tools fit together in practice?",
      answer:
        "Our AI tools form a complete cognitive workflow: Ruzhaa clarifies complex concepts and terminology; Dhaleo screens the equity universe based on fundamental criteria; Jaro compiles deep company analyst dossiers; Determind assesses your personal behavioral psychology and risk tolerance; and Dhruvan provides probabilistic machine learning research models for time-series pattern analysis.",
    },
    {
      question: "What does 'Dhruvan AI LSTM prediction' actually mean?",
      answer:
        "Dhruvan employs Long Short-Term Memory (LSTM) recurrent neural network architectures trained on historical multi-variate market price and volume sequences. It estimates statistical tendencies rather than definitive future outcomes. All machine learning predictions are probabilistic, accompanied by confidence metrics, and are explicitly not financial advice.",
    },
    {
      question: "Can I start as an absolute beginner with zero market knowledge?",
      answer:
        "Yes. Level 01 (Market Foundations) starts from first principles—demystifying order books, exchange mechanics, stock terminology, and financial statements. Our platform is intentionally structured to take you from a complete beginner to a methodical, data-driven market participant.",
    },
    {
      question: "Is Market Healers SEBI-registered as an investment advisor?",
      answer:
        "Market Healers is an educational and analytical software platform and does not offer SEBI-registered personalized investment advisory or portfolio management services. All materials and analytical tools are provided for educational and decision-support purposes.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00A88F] mb-3">
            QUESTIONS & CLARITY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight">
            Frequently Asked Questions.
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            Straightforward answers regarding our educational philosophy, technology, and operating standards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/90 rounded-xl overflow-hidden transition-all bg-[#F6F8FA]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-[#0B1F3A] hover:text-[#00A88F] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-500 ${
                      isOpen ? "rotate-180 text-[#00A88F]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
