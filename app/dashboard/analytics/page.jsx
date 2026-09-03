"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  // Visual Chart Data
  const chartData = [
    { date: "Day 1", views: 400, sales: 24, revenue: 240 },
    { date: "Day 5", views: 700, sales: 45, revenue: 450 },
    { date: "Day 10", views: 1200, sales: 88, revenue: 880 },
    { date: "Day 15", views: 900, sales: 60, revenue: 600 },
    { date: "Day 20", views: 1800, sales: 120, revenue: 1200 },
    { date: "Day 25", views: 2400, sales: 175, revenue: 1750 },
    { date: "Day 30", views: 3100, sales: 210, revenue: 2100 },
  ];

  const stats = [
    { label: "Total Views", value: "24,520", change: "+18.4%", isPositive: true },
    { label: "Prompt Downloads", value: "1,420", change: "+12.1%", isPositive: true },
    { label: "Total Revenue", value: "$3,840.00", change: "+24.5%", isPositive: true },
    { label: "Conversion Rate", value: "5.79%", change: "-0.4%", isPositive: false },
  ];

  const topPrompts = [
    { title: "Midjourney v6 Photorealistic Portrait Architect", sales: 412, revenue: "$1,236.00" },
    { title: "Full-Stack Next.js 15 & Tailwind Code Generator", sales: 310, revenue: "$930.00" },
    { title: "SaaS Landing Page High-Converting Copywriter", sales: 245, revenue: "$735.00" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans text-paper">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet uppercase tracking-wider">
            Performance Metrics
          </span>
          <h1 className="mt-2 font-display text-2xl md:text-3xl font-black text-white">
            Analytics & Growth
          </h1>
          <p className="text-xs text-mist">
            Track your AI prompt sales, conversion performance, and marketplace audience growth.
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="flex items-center gap-2 bg-[#0d111a] p-1.5 rounded-2xl border border-white/10 text-xs">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                timeRange === range
                  ? "bg-violet text-white shadow-md shadow-violet/20"
                  : "text-mist hover:text-white"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl border border-white/10 bg-[#0d111a] space-y-3 shadow-xl relative overflow-hidden"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-mist">
              {stat.label}
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl font-black text-white">
                {stat.value}
              </span>
              <span
                className={`text-xs font-extrabold rounded-full px-2 py-0.5 ${
                  stat.isPositive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE GROWTH VISUAL CHART */}
      <div className="p-6 rounded-3xl border border-white/10 bg-[#0d111a] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-white">
              Growth & Revenue Overview
            </h2>
            <p className="text-xs text-mist">Real-time marketplace engagement metrics</p>
          </div>
          <span className="text-xs text-violet font-bold bg-violet/10 border border-violet/20 px-3 py-1 rounded-full">
            ✦ Recharts Powered
          </span>
        </div>

        {/* Recharts Area Chart Container */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#07090e",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorViews)"
                name="Page Views"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Prompts Table */}
      <div className="p-6 rounded-3xl border border-white/10 bg-[#0d111a] space-y-4 shadow-2xl">
        <h2 className="font-display text-base font-bold text-white">
          Top Performing Prompts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-mist font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3 px-2">Prompt Title</th>
                <th className="pb-3 px-2 text-center">Sales</th>
                <th className="pb-3 px-2 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topPrompts.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-2 font-semibold text-white truncate max-w-xs">
                    {item.title}
                  </td>
                  <td className="py-3 px-2 text-center font-bold text-violet">
                    {item.sales}
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-amber">
                    {item.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}