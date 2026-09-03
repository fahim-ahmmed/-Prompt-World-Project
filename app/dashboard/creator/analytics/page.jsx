"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-white font-sans text-xs">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d111a] px-6 py-4 shadow-2xl">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet border-t-transparent" />
          <span className="font-medium text-mist">Loading Analytics Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-paper font-sans space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl">
        <div>
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet uppercase tracking-wider">
            Performance Metrics
          </span>
          <h1 className="mt-2 font-display text-xl font-black text-white">
            Analytics &amp; Creator Growth
          </h1>
          <p className="mt-0.5 text-xs text-mist">
            Track engagement, total views, prompt copies, and bookmark trends.
          </p>
        </div>

        <Link
          href="/dashboard/add-prompt"
          className="rounded-2xl bg-violet px-5 py-3 text-xs font-bold text-white shadow-xl shadow-violet/25 hover:bg-violet/90 transition-all text-center"
        >
          + Create New Prompt
        </Link>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-white/5 bg-[#0d111a] p-5 shadow-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-mist">Total Prompt Views</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-black text-white">1,482</span>
            <span className="text-[10px] font-bold text-emerald-400">+12% vs last week</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#0d111a] p-5 shadow-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-mist">Total Copies</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-black text-white">348</span>
            <span className="text-[10px] font-bold text-emerald-400">+18% vs last week</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#0d111a] p-5 shadow-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-mist">Total Bookmarks</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-black text-white">96</span>
            <span className="text-[10px] font-bold text-violet">+5 new</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#0d111a] p-5 shadow-xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-mist">Creator Rank</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-black text-amber">Top 10%</span>
            <span className="text-[10px] font-bold text-mist">Verified</span>
          </div>
        </div>
      </div>

      {/* Growth Visualization Bar Chart (Pure CSS Modern Mockup) */}
      <div className="rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Prompt Engagement Trend (Last 7 Days)
            </h2>
            <p className="text-[11px] text-mist mt-0.5">Daily prompt copies and interactions</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[10px] font-bold text-emerald-400">
            Live Updates
          </span>
        </div>

        {/* Visual Bar Chart Grid */}
        <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
          {[
            { day: "Mon", copies: 24, height: "40%" },
            { day: "Tue", copies: 38, height: "60%" },
            { day: "Wed", copies: 22, height: "35%" },
            { day: "Thu", copies: 55, height: "85%" },
            { day: "Fri", copies: 42, height: "70%" },
            { day: "Sat", copies: 68, height: "100%" },
            { day: "Sun", copies: 49, height: "75%" },
          ].map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-mist opacity-0 group-hover:opacity-100 transition-opacity">
                {item.copies}
              </span>
              <div
                style={{ height: item.height }}
                className="w-full max-w-[32px] rounded-xl bg-gradient-to-t from-violet/30 to-violet border border-violet/50 group-hover:bg-violet transition-all duration-300"
              />
              <span className="text-[10px] font-bold text-mist uppercase">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}