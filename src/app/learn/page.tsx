"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DBCourse, DBEnrollment, DBCertificate } from "@/types/database";
import { courseService } from "@/lib/services/courseService";
import { MOCK_CERTIFICATES } from "@/lib/db/mockDb";
import {
  BookOpen,
  GraduationCap,
  Award,
  Play,
  Clock,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LearnOverviewPage() {
  const [courses, setCourses] = useState<DBCourse[]>([]);
  const [enrollments, setEnrollments] = useState<DBEnrollment[]>([]);

  useEffect(() => {
    courseService.getAllCourses().then(setCourses);
    courseService.getUserEnrollments("demo_user").then(setEnrollments);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
            LEARNING PLATFORM
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight">
            Curriculum &amp; Progression Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Structured modules engineered from financial market first principles.
          </p>
        </div>

        <Link
          href="/learn/courses"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold rounded-md shadow-xs transition-colors self-start sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#00A88F]" />
          <span>Browse All 6 Levels</span>
        </Link>
      </div>

      {/* Active Enrollments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0B1F3A]">My Active Learning</h2>
          <span className="text-xs text-slate-500 font-mono">
            {enrollments.length} Enrolled Courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {enrollments.map((enr) => {
            const course = courses.find((c) => c.id === enr.courseId);
            if (!course) return null;

            return (
              <div
                key={enr.id}
                className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-[#00A88F] font-semibold border border-teal-200">
                      {course.level}
                    </span>
                    {enr.isCompleted ? (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-[#0B1F3A]">
                        {enr.progressPercent}% Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#0B1F3A] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                    <div
                      className="bg-[#00A88F] h-full rounded-full transition-all duration-300"
                      style={{ width: `${enr.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-mono">
                    Instructor: {course.instructor.name}
                  </div>
                  <Link
                    href={`/learn/courses/${course.id}/lesson/${enr.currentLessonId || "les-1-1-1"}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A88F] hover:underline"
                  >
                    <span>{enr.isCompleted ? "Review Course" : "Resume Lesson"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Courses Catalog */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0B1F3A]">Recommended Next Modules</h2>
          <Link href="/learn/courses" className="text-xs font-semibold text-[#00A88F] hover:underline">
            View Syllabus Catalog &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.slice(2, 5).map((course) => (
            <div
              key={course.id}
              className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    {course.level}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {course.durationHours} Hours
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B1F3A] mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{course.tagline}</p>

                <div className="space-y-1.5 mb-5">
                  <div className="text-[10px] font-semibold uppercase text-slate-400">
                    Skills Covered:
                  </div>
                  {course.skillsLearned.slice(0, 3).map((skill, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F]" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Self-Paced</span>
                <Link
                  href={`/learn/courses/${course.id}`}
                  className="text-xs font-semibold text-[#0B1F3A] hover:text-[#00A88F] flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Certificates Banner */}
      <div className="bg-[#08111F] text-slate-200 border border-[#1E2D44] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0E1A2B] border border-amber-500/30 text-[#C9A227] flex items-center justify-center shrink-0 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              ACADEMIC RECOGNITION
            </div>
            <h3 className="text-lg font-bold text-white">
              Verified Market Healers Certificates
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete each level's practical assignments and quizzes to mint your tamper-proof institutional credentials.
            </p>
          </div>
        </div>

        <Link
          href="/profile"
          className="px-5 py-2.5 bg-[#0E1A2B] hover:bg-[#15253C] border border-slate-700 text-white text-xs font-semibold rounded-md transition-colors shrink-0"
        >
          View My Credentials
        </Link>
      </div>

    </div>
  );
}
