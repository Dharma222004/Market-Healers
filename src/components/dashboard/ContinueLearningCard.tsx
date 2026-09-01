"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DBCourse, DBEnrollment } from "@/types/database";
import { courseService } from "@/lib/services/courseService";
import { BookOpen, Play, CheckCircle2, ArrowRight } from "lucide-react";

export const ContinueLearningCard: React.FC = () => {
  const [activeData, setActiveData] = useState<{
    enrollment: DBEnrollment;
    course: DBCourse;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getActiveEnrollment("demo_user").then((res) => {
      setActiveData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="h-56 rounded-xl bg-slate-200/70 animate-pulse" />;
  }

  if (!activeData) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-left flex flex-col justify-between shadow-2xs">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            CONTINUE LEARNING
          </span>
          <h3 className="text-lg font-bold text-[#0B1F3A] mt-1">
            No learning journey started yet.
          </h3>
          <p className="text-xs text-slate-600 mt-2">
            Enroll in Level 01: Market Foundations to begin reading order books and market structures.
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/learn/courses"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md transition-colors"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00A88F]" />
          </Link>
        </div>
      </div>
    );
  }

  const { course, enrollment } = activeData;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 text-left flex flex-col justify-between shadow-2xs">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            CONTINUE LEARNING
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500">
            {course.level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#0B1F3A] mb-1">
          {course.title}
        </h3>
        <div className="text-xs text-slate-600 mb-4">
          Next Lesson: <strong className="text-slate-800">Understanding Support & Resistance</strong>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 mb-5">
          <div className="flex justify-between text-xs font-mono text-slate-500">
            <span>Course Progress</span>
            <span className="font-bold text-[#0B1F3A]">{enrollment.progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#00A88F] h-full rounded-full transition-all duration-300"
              style={{ width: `${enrollment.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
        <Link
          href={`/learn/courses/${course.id}/lesson/${enrollment.currentLessonId || "les-2-1-1"}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current text-[#00A88F]" />
          <span>Continue Learning</span>
        </Link>
        <Link
          href={`/learn/courses/${course.id}`}
          className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
        >
          View Syllabus
        </Link>
      </div>
    </div>
  );
};
