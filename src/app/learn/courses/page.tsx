"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DBCourse } from "@/types/database";
import { courseService } from "@/lib/services/courseService";
import { BookOpen, Clock, FileText, ArrowRight, Filter } from "lucide-react";

export default function CoursesCatalogPage() {
  const [courses, setCourses] = useState<DBCourse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    courseService.getAllCourses().then(setCourses);
  }, []);

  const categories = ["All", "Foundations", "Technical", "Fundamental", "Portfolio", "Derivatives", "Institutional"];

  const filtered = selectedCategory === "All" ? courses : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#00A88F] font-semibold">
          STRUCTURED CURRICULUM
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight mt-1">
          The 6-Level Course Matrix
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Progress from absolute beginner to sophisticated equity analyst through sequential modules.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-slate-200">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-[#0B1F3A] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="p-6 bg-white border border-slate-200 rounded-xl flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#0B1F3A]">
                  {course.level}
                </span>
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {course.durationHours} Hours
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0B1F3A] mb-1">
                {course.title}
              </h3>
              <div className="text-xs text-slate-500 font-medium mb-3">
                {course.tagline}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                {course.description}
              </p>

              <div className="space-y-1.5 mb-6">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                  Competencies Mastered:
                </div>
                {course.skillsLearned.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Instructor: <span className="font-semibold text-slate-800">{course.instructor.name}</span>
              </div>
              <Link
                href={`/learn/courses/${course.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B1F3A] hover:bg-[#132742] text-white text-xs font-semibold transition-colors"
              >
                <span>View Syllabus</span>
                <ArrowRight className="w-3 h-3 text-[#00A88F]" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
