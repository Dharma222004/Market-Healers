"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DBCourse } from "@/types/database";
import { courseService } from "@/lib/services/courseService";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Play,
  FileText,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  User,
} from "lucide-react";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "course-2";

  const [course, setCourse] = useState<DBCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getCourseById(courseId).then((c) => {
      setCourse(c);
      setLoading(false);
    });
  }, [courseId]);

  if (loading) {
    return <div className="max-w-5xl mx-auto p-8 animate-pulse text-slate-400">Loading course syllabus...</div>;
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-[#0B1F3A]">Course Not Found</h2>
        <Link href="/learn/courses" className="text-xs text-[#00A88F] underline mt-2 block">
          Return to Course Matrix
        </Link>
      </div>
    );
  }

  const firstLessonId = course.modules[0]?.lessons[0]?.id || "les-1-1-1";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Breadcrumb / Back */}
      <Link
        href="/learn/courses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A88F] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Courses
      </Link>

      {/* Hero Header */}
      <div className="bg-[#08111F] text-slate-200 rounded-xl p-6 sm:p-8 border border-[#1E2D44] flex flex-col md:flex-row justify-between gap-6 shadow-md">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#0E1A2B] text-[#00A88F] border border-[#1E3352] font-semibold">
              {course.level}
            </span>
            <span className="text-xs font-mono text-slate-400">{course.category} Track</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {course.title}
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#00A88F]" /> {course.durationHours} Hours Total
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#00A88F]" /> {course.modules.length} Modules &bull; {course.lessonsCount} Lessons
            </span>
            <span>&bull;</span>
            <span>Verified Certificate Included</span>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start md:items-end gap-4 shrink-0">
          <div className="text-left md:text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Instructor</span>
            <div className="text-sm font-bold text-white">{course.instructor.name}</div>
            <div className="text-xs text-slate-400">{course.instructor.title}</div>
          </div>

          <Link
            href={`/learn/courses/${course.id}/lesson/${firstLessonId}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A88F] hover:bg-[#008B76] text-white text-xs font-semibold rounded-md shadow-sm transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Level Curriculum</span>
          </Link>
        </div>
      </div>

      {/* Modules Syllabus List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#0B1F3A]">Curriculum &amp; Module Breakdown</h2>

        <div className="space-y-4">
          {course.modules.map((mod, mIdx) => (
            <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#00A88F] font-bold">
                    MODULE 0{mIdx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#0B1F3A] mt-0.5">
                    {mod.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {mod.durationMinutes} Mins
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {mod.lessons.map((les, lIdx) => (
                  <Link
                    key={les.id}
                    href={`/learn/courses/${course.id}/lesson/${les.id}`}
                    className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-mono text-xs flex items-center justify-center font-semibold group-hover:bg-[#00A88F] group-hover:text-white transition-colors">
                        {lIdx + 1}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#0B1F3A]">
                          {les.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">
                          {les.contentSummary}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] font-mono text-slate-400">
                        {les.durationMinutes}m
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00A88F] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
