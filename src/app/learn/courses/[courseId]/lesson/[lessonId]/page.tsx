"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DBCourse, DBLesson } from "@/types/database";
import { courseService } from "@/lib/services/courseService";
import { userDashboardService } from "@/lib/services/userDashboardService";
import { useAuth } from "@/lib/auth/authContext";
import { ruzhaaServiceExtended, IChatMessage } from "@/lib/services/aiServicesExtended";
import {
  Play,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Send,
  X,
  FileText,
} from "lucide-react";

export default function LessonPlayerPage() {
  const { user } = useAuth();
  const params = useParams();
  const courseId = (params?.courseId as string) || "course-2";
  const lessonId = (params?.lessonId as string) || "les-2-1-1";

  const [lessonData, setLessonData] = useState<{ lesson: DBLesson; course: DBCourse } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Ruzhaa Contextual Drawer State
  const [ruzhaaOpen, setRuzhaaOpen] = useState(false);
  const [ruzhaaMessages, setRuzhaaMessages] = useState<IChatMessage[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    courseService.getLesson(courseId, lessonId).then((res) => {
      setLessonData(res);
      setLoading(false);
    });
    ruzhaaServiceExtended.getConversation().then(setRuzhaaMessages);
  }, [courseId, lessonId]);

  if (loading) {
    return <div className="p-8 text-slate-400">Loading lesson player...</div>;
  }

  if (!lessonData) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-[#0B1F3A]">Lesson Not Found</h2>
        <Link href={`/learn/courses/${courseId}`} className="text-xs text-[#00A88F] underline mt-2 block">
          Return to Course
        </Link>
      </div>
    );
  }

  const { lesson, course } = lessonData;

  const handleToggleComplete = async () => {
    const activeUserId = user?.id || "demo_user";
    await courseService.markLessonComplete(activeUserId, course.id, lesson.id);
    await userDashboardService.recordLessonCompletion(activeUserId, course.id, lesson.id);
    setIsCompleted(true);
  };

  const handleSendRuzhaa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const q = userQuery;
    setUserQuery("");
    setIsAiThinking(true);
    await ruzhaaServiceExtended.sendMessage(`${q} (Context: ${course.title} - ${lesson.title})`);
    const updated = await ruzhaaServiceExtended.getConversation();
    setRuzhaaMessages(updated);
    setIsAiThinking(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left relative">
      
      {/* Top Breadcrumbs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/learn/courses" className="hover:text-[#00A88F]">Courses</Link>
          <span>/</span>
          <Link href={`/learn/courses/${course.id}`} className="hover:text-[#00A88F]">{course.title}</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">{lesson.title}</span>
        </div>

        <button
          onClick={() => setRuzhaaOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A88F] text-xs font-semibold hover:bg-teal-100 transition-colors shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Ruzhaa About This Lesson</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Lesson Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Institutional Video Simulation Canvas */}
          <div className="aspect-video w-full rounded-xl bg-[#08111F] border border-[#1E2D44] flex flex-col items-center justify-center text-slate-300 p-6 relative overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-financial-grid-dark opacity-40 pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-[#0E1A2B] border border-[#00A88F]/40 flex items-center justify-center text-[#00A88F] hover:scale-105 transition-transform cursor-pointer shadow-lg z-10">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
            <div className="z-10 mt-4 text-center">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {course.level} // LESSON VIDEO
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {lesson.title}
              </h3>
              <span className="text-xs font-mono text-[#00A88F] mt-1 block">
                Duration: {lesson.durationMinutes} Minutes &bull; 1080p Master Class
              </span>
            </div>
          </div>

          {/* Lesson Actions & Overview */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                  {lesson.title}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Module: Understanding Market Geometry &bull; Instructor: {course.instructor.name}
                </p>
              </div>

              <button
                onClick={handleToggleComplete}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-[#0B1F3A] hover:bg-[#132742] text-white shadow-xs"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? "Completed" : "Mark as Completed"}</span>
              </button>
            </div>

            {/* Core Notes & Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Lesson Briefing
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {lesson.contentSummary}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="p-4 rounded-lg bg-[#F6F8FA] border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                CORE TAKEAWAYS FOR INVESTORS:
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {lesson.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Curriculum Navigator */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold text-[#0B1F3A]">Curriculum Navigation</span>
            <span className="text-[10px] font-mono text-slate-400">{course.level}</span>
          </div>

          <div className="space-y-3">
            {course.modules.map((mod, mIdx) => (
              <div key={mod.id} className="space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold px-2">
                  Module 0{mIdx + 1}: {mod.title}
                </div>
                <div className="space-y-1">
                  {mod.lessons.map((l) => {
                    const isCurrent = l.id === lesson.id;
                    return (
                      <Link
                        key={l.id}
                        href={`/learn/courses/${course.id}/lesson/${l.id}`}
                        className={`flex items-center justify-between p-2.5 rounded-md text-xs transition-colors ${
                          isCurrent
                            ? "bg-[#0B1F3A] text-white font-semibold shadow-xs"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Play className={`w-3 h-3 shrink-0 ${isCurrent ? "text-[#00A88F]" : "text-slate-400"}`} />
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span className={`text-[10px] font-mono ml-2 shrink-0 ${isCurrent ? "text-slate-300" : "text-slate-400"}`}>
                          {l.durationMinutes}m
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Contextual "Ask Ruzhaa" Drawer */}
      {ruzhaaOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#08111F] text-slate-200 border-l border-[#1E2D44] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#1E2D44] flex items-center justify-between bg-[#0A1424]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#00A88F] text-white flex items-center justify-center font-bold text-xs">
                R
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Ruzhaa AI Tutor</h4>
                <span className="text-[9px] font-mono text-slate-400">Context: {lesson.title}</span>
              </div>
            </div>
            <button
              onClick={() => setRuzhaaOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs scrollbar-none">
            {ruzhaaMessages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-3 leading-relaxed ${
                      isUser
                        ? "bg-[#1B355A] text-white"
                        : "bg-[#0E1A2B] border border-[#1E2D44] text-slate-300"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.suggestedFollowUps && (
                      <div className="mt-2.5 pt-2 border-t border-[#1E2D44] flex flex-wrap gap-1">
                        {msg.suggestedFollowUps.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => setUserQuery(chip)}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[#00A88F] transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isAiThinking && (
              <div className="text-[11px] font-mono text-[#00A88F] animate-pulse">
                Ruzhaa is synthesizing market pedagogy...
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <form onSubmit={handleSendRuzhaa} className="p-3 border-t border-[#1E2D44] bg-[#0A1424] flex items-center gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask Ruzhaa about this lesson..."
              className="flex-1 px-3 py-2 text-xs bg-[#0E1A2B] border border-[#1E2D44] rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#00A88F]"
            />
            <button
              type="submit"
              className="p-2 bg-[#00A88F] hover:bg-[#008B76] text-white rounded transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
