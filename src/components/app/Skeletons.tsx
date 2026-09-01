import React from "react";

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200/70 p-5 ${className}`} />
);

export const TableSkeleton: React.FC = () => (
  <div className="space-y-3 p-4">
    <div className="h-6 w-1/3 bg-slate-200 rounded animate-pulse" />
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 w-full bg-slate-100 rounded animate-pulse" />
      ))}
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
    <div className="h-28 w-full bg-slate-200/80 rounded-xl animate-pulse" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 h-64 bg-slate-200/70 rounded-xl animate-pulse" />
      <div className="h-64 bg-slate-200/70 rounded-xl animate-pulse" />
    </div>
    <div className="h-56 w-full bg-slate-200/70 rounded-xl animate-pulse" />
  </div>
);

export const CourseSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-72 rounded-xl bg-slate-200/70 animate-pulse" />
    ))}
  </div>
);
