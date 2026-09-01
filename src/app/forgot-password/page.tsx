"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate reset link dispatch
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-24 px-4 flex items-center justify-center bg-[#F6F8FA] min-h-[calc(100vh-140px)]">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#0B1F3A]">Reset Password</h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your email to receive secure instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 text-[#00A88F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Reset Link Dispatched
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If an account is associated with <strong className="text-slate-800">{email}</strong>, you will receive password reset instructions shortly.
            </p>
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A88F] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@domain.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#00A88F] text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#00A88F]" />
              ) : (
                <span>Send Reset Instructions</span>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
