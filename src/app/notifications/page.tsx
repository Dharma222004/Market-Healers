"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DBNotification } from "@/types/database";
import { notificationService } from "@/lib/services/notificationService";
import {
  Bell,
  CheckCheck,
  Award,
  BookOpen,
  Sparkles,
  Users,
  Info,
  ArrowRight,
} from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<DBNotification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const loadData = () => {
    notificationService.getNotifications().then(setNotifications);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    loadData();
  };

  const handleMarkRead = async (id: string) => {
    await notificationService.markAsRead(id);
    loadData();
  };

  const filtered =
    activeFilter === "ALL"
      ? notifications
      : notifications.filter((n) => n.type === activeFilter);

  const getIcon = (type: string) => {
    switch (type) {
      case "CERTIFICATE":
        return <Award className="w-4 h-4 text-[#C9A227]" />;
      case "LESSON_REMINDER":
      case "COURSE_UPDATE":
        return <BookOpen className="w-4 h-4 text-[#00A88F]" />;
      case "COMMUNITY":
        return <Users className="w-4 h-4 text-blue-600" />;
      case "SYSTEM":
      case "AI_COMPLETION":
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#00A88F]" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
              Notification Center
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Course reminders, community webinars, and intelligence updates
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors self-start sm:self-auto"
        >
          <CheckCheck className="w-3.5 h-3.5 text-[#00A88F]" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {["ALL", "LESSON_REMINDER", "COMMUNITY", "CERTIFICATE", "SYSTEM"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
              activeFilter === tab
                ? "bg-[#0B1F3A] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-2xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMarkRead(item.id)}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                item.isRead ? "bg-white" : "bg-teal-50/20"
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    {item.createdAt}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.message}
                </p>

                {item.linkUrl && (
                  <div className="pt-2">
                    <Link
                      href={item.linkUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#00A88F] hover:underline"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
