"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/authContext";
import {
  Settings,
  Lock,
  Bell,
  Sun,
  Shield,
  CheckCircle2,
  LogOut,
  Laptop,
} from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [theme, setTheme] = useState("system");
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [aiNotifications, setAiNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Platform Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your account preferences, security sessions, and notification thresholds
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-[#00A88F] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Your settings have been saved successfully.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Account Info */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#0B1F3A] pb-2 border-b border-slate-100">
            Account Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Display Name</label>
              <input
                type="text"
                defaultValue={user?.name || "Investor"}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-[#00A88F] text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                readOnly
                defaultValue={user?.email || "investor@markethealers.com"}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-md text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Security & Sessions */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Lock className="w-4 h-4 text-[#00A88F]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Security &amp; Active Sessions
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Laptop className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="font-bold text-[#0B1F3A]">Current Device // Windows Browser</div>
                  <div className="text-[10px] text-slate-400">IP: 192.168.1.x &bull; Active Now</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                className="px-3.5 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={logout}
                className="px-3.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded font-semibold transition-colors"
              >
                Logout All Sessions
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Thresholds */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="w-4 h-4 text-[#00A88F]" />
            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Notification Preferences
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">Market Surveillance &amp; Ticker Alerts</div>
                <div className="text-[11px] text-slate-500">Major index trend crossovers and volatility shifts</div>
              </div>
              <input
                type="checkbox"
                checked={marketAlerts}
                onChange={(e) => setMarketAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#00A88F]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">Course &amp; Lesson Reminders</div>
                <div className="text-[11px] text-slate-500">Milestone reminders to sustain your 7-day learning streak</div>
              </div>
              <input
                type="checkbox"
                checked={courseUpdates}
                onChange={(e) => setCourseUpdates(e.target.checked)}
                className="w-4 h-4 accent-[#00A88F]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">AI Tool Updates &amp; Research Dossiers</div>
                <div className="text-[11px] text-slate-500">Notices when Dhruvan or Jaro calibration models are updated</div>
              </div>
              <input
                type="checkbox"
                checked={aiNotifications}
                onChange={(e) => setAiNotifications(e.target.checked)}
                className="w-4 h-4 accent-[#00A88F]"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            Save Preferences
          </button>
        </div>

      </form>

    </div>
  );
}
