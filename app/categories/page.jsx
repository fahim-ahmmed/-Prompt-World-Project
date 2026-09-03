"use client";

import { useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "webdev",
      title: "Web Development",
      count: "128 Prompts",
      desc: "Full-stack code generation, React components, Next.js architecture & API integrations.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "design",
      title: "UI/UX & AI Art",
      count: "94 Prompts",
      desc: "Midjourney v6 photorealistic prompts, Figma UI components, DALL-E 3 visual assets.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "marketing",
      title: "Copywriting & Marketing",
      count: "112 Prompts",
      desc: "High-converting SaaS landing page copies, B2B email sequences & SEO blog outlines.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "database",
      title: "SQL & Data Engineering",
      count: "65 Prompts",
      desc: "Complex SQL query optimization, database schema design, and query debugging.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "automation",
      title: "AI Workflows & Automation",
      count: "88 Prompts",
      desc: "Zapier & Make.com custom webhook scripts, Python automation & data scrapers.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "academic",
      title: "Research & Writing",
      count: "54 Prompts",
      desc: "Academic paper summarization, thesis restructuring, and formal literature review.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07090e] font-sans text-paper px-4 py-12 md:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* 1. TOP HEADER BANNER WITH STATS & SEARCH */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] p-8 md:p-12 shadow-2xl space-y-8">
        
        {/* Glow Effects */}
        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-violet/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-amber/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <span className="rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1 text-xs font-bold text-violet uppercase tracking-wider">
              Marketplace Taxonomy
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-black text-white">
              Browse by Category
            </h1>
            <p className="text-xs md:text-sm text-mist leading-relaxed">
              Find production-tested AI prompts categorized specifically for your engineering, design, and business workflows.
            </p>
          </div>

          {/* Quick Category Search Input */}
          <div className="w-full md:w-80 relative z-10">
            <input
              type="text"
              placeholder="Search category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-[#07090e]/90 px-4 py-3 text-xs text-white placeholder:text-mist/50 focus:border-violet focus:outline-none shadow-xl transition-all"
            />
          </div>
        </div>

        {/* 2. STATS OVERVIEW BAR (NEW TOP ADDITION) */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-mist">Total Categories</p>
            <p className="mt-1 font-display text-xl font-black text-white">6 Domains</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-mist">Active Prompts</p>
            <p className="mt-1 font-display text-xl font-black text-violet">540+ Prompts</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-mist">Supported LLMs</p>
            <p className="mt-1 font-display text-xl font-black text-white">GPT, Claude, Midjourney</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-mist">Average Rating</p>
            <p className="mt-1 font-display text-xl font-black text-amber">★ 4.9 / 5.0</p>
          </div>
        </div>

      </div>

      {/* 3. CATEGORY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <Link
            key={cat.id}
            href="/all-prompts"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] shadow-2xl hover:border-violet/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Background Cover Image with Gradient Mask */}
            <div className="h-44 w-full relative overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-[#0d111a]/40 to-transparent" />
              <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-[#07090e]/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-violet">
                {cat.count}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-white group-hover:text-violet transition-colors">
                  {cat.title}
                </h2>
                <p className="mt-2 text-xs text-mist leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-violet">
                <span>Explore Prompts</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}