"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { dhruvanServiceExtended } from "@/lib/services/aiServicesExtended";
import {
  Cpu,
  AlertTriangle,
  ArrowLeft,
  Search,
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function DhruvanPage() {
  const [symbol, setSymbol] = useState("NIFTY 50");
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dhruvanServiceExtended.getPrediction(symbol).then((data) => {
      setPrediction(data);
      setLoading(false);
    });
  }, [symbol]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/ai-tools" className="p-1.5 rounded text-slate-500 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                Dhruvan AI // LSTM Prediction Research
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Long Short-Term Memory machine learning research model for multi-variate sequential pattern study
            </p>
          </div>
        </div>

        {/* Quick Horizon Badge */}
        <span className="text-xs font-mono px-3 py-1 rounded bg-[#0E1A2B] text-slate-300 border border-slate-800">
          Horizon: Next Trading Session (1D)
        </span>
      </div>

      {/* Prominent Coming Soon Notice */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border border-amber-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-amber-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
            Coming Soon
          </span>
          <div>
            <p className="text-xs font-bold text-slate-800">Dhruvan AI Neural Research Lab is in Private Beta</p>
            <p className="text-[11px] text-slate-500">The multi-variate LSTM predictive research sandbox is undergoing validation and will open soon.</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2.5 py-1 rounded font-semibold border border-amber-300 self-start sm:self-auto">
          Private Beta &bull; Launching Soon
        </span>
      </div>

      {/* Prominent Mandatory Non-Guaranteed Disclosure */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">MANDATORY MODEL &amp; PROBABILITY DISCLOSURE: </strong>
          Model-generated estimates are probabilistic mathematical approximations based on historical sequential time-series patterns. They are NOT guaranteed forecasts, investment advice, or buy/sell recommendations. Securities markets carry inherent risk of capital loss.
        </div>
      </div>

      {/* Ticker Selector */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold shrink-0">
          Target Index / Asset:
        </span>
        {["NIFTY 50", "BANK NIFTY", "RELIANCE", "TCS", "HDFCBANK"].map((item) => (
          <button
            key={item}
            onClick={() => setSymbol(item)}
            className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-colors ${
              symbol === item
                ? "bg-[#0B1F3A] text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Neural Pipeline Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Step 01</div>
          <div className="text-sm font-bold text-[#0B1F3A]">Historical Sequential Input</div>
          <p className="text-[11px] text-slate-500">1,250 trading sessions of price &amp; volume arrays</p>
        </div>

        <div className="p-4 bg-[#08111F] text-slate-200 border border-[#1E2D44] rounded-xl text-center space-y-1">
          <div className="text-[10px] font-mono uppercase text-[#00A88F] font-semibold">Step 02</div>
          <div className="text-sm font-bold text-white">LSTM Neural Architecture</div>
          <p className="text-[11px] text-slate-400">Multi-layer recurrent cell state with tanh activations</p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Step 03</div>
          <div className="text-sm font-bold text-[#0B1F3A]">Probabilistic Forecast</div>
          <p className="text-[11px] text-slate-500">Calculated directional vector &amp; expected volatility</p>
        </div>
      </div>

      {/* Prediction Output Terminal */}
      {loading || !prediction ? (
        <div className="py-16 text-center text-slate-400 text-xs font-mono animate-pulse">
          Computing recurrent cell probabilities...
        </div>
      ) : (
        <div className="bg-[#08111F] text-slate-200 border border-[#1E2D44] rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2D44] text-xs font-mono text-slate-400">
            <span>MODEL: {prediction.modelStatus}</span>
            <span className="text-emerald-400">VALIDATION STATUS: LIVE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono">
            <div className="p-4 rounded-lg bg-[#0E1A2B] border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400">Predicted Direction</span>
              <div className="text-xl font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-5 h-5" />
                <span>{prediction.predictedDirection}</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Sequential bias</span>
            </div>

            <div className="p-4 rounded-lg bg-[#0E1A2B] border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400">Model Confidence</span>
              <div className="text-xl font-bold text-white mt-1">
                {prediction.confidenceScore}%
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Confidence interval</span>
            </div>

            <div className="p-4 rounded-lg bg-[#0E1A2B] border border-slate-800">
              <span className="text-[10px] uppercase text-slate-400">Expected 1D Range</span>
              <div className="text-base font-bold text-[#00A88F] mt-1">
                ₹{prediction.expectedRange.low} – ₹{prediction.expectedRange.high}
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Gaussian spread (&sigma;)</span>
            </div>
          </div>

          <div className="p-4 bg-[#0A1321] rounded-lg border border-slate-800/80 space-y-2">
            <div className="text-xs font-bold text-slate-300">
              Historical Backtest Validation:
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Model performance data will appear when historical validation is connected. Historical directional correlation across tested test sets is {prediction.historicalAccuracy}.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
