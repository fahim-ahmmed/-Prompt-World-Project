"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [bookmarks, setBookmarks] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  // Prompt Data
  const [prompts, setPrompts] = useState([
    {
      id: "p1",
      title: "Senior SQL Debugger & Query Optimizer",
      category: "database",
      engine: "Claude 3.5 Sonnet",
      badgeColor: "bg-amber/10 border-amber/30 text-amber",
      copies: 1240,
      rating: "4.9",
      author: "Shihab Ahmmed",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
      code: "You are a senior SQL engineer. Given this query and its error message, explain the root cause in one sentence, then return a corrected query with nothing else changed.\n\nQuery: {{query}}\nError: {{error}}",
    },
    {
      id: "p2",
      title: "Next.js 15 App Router Architecture Generator",
      category: "webdev",
      engine: "GPT-4o",
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      copies: 3420,
      rating: "5.0",
      author: "Alex Rivers",
      authorAvatar: "https://avatar.iran.liara.run/public/3",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      code: "Act as a Principal Full-Stack Engineer. Generate an optimal folder structure for Next.js 15 App Router using Server Actions, Better Auth, and Tailwind CSS. Ensure strict TypeScript types.",
    },
    {
      id: "p3",
      title: "Midjourney Photorealistic Cyberpunk Portrait",
      category: "design",
      engine: "Midjourney v6",
      badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
      copies: 2890,
      rating: "4.8",
      author: "Elena Rostova",
      authorAvatar: "https://avatar.iran.liara.run/public/4",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      code: "A cinematic hyper-realistic photo of a developer in a dark neon-lit studio, holographic screens, shot on 85mm lens, f/1.8, RAW photo --v 6.0 --ar 16:9",
    },
    {
      id: "p4",
      title: "B2B SaaS Landing Page Copywriter Engine",
      category: "marketing",
      engine: "Gemini 1.5 Pro",
      badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      copies: 890,
      rating: "4.7",
      author: "Devin Miller",
      authorAvatar: "https://avatar.iran.liara.run/public/6",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      code: "You are an elite conversion copywriter. Write a headline, subheadline, and 3 high-converting bullet points for an AI SaaS product targeting startup CTOs.",
    },
  ]);

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEngine =
      selectedEngine === "all" ||
      prompt.engine.toLowerCase().includes(selectedEngine.toLowerCase());

    return matchesSearch && matchesEngine;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    setPrompts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, copies: item.copies + 1 } : item
      )
    );

    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const faqs = [
    {
      q: "How do PromptWorld prompts work?",
      a: "Our prompts are crafted and manually tested across multiple AI models (GPT-4o, Claude 3.5, Midjourney) to ensure production-quality output. Simply copy and paste them into your workspace using dynamic variable placeholders."
    },
    {
      q: "Can I submit my own engineered prompts?",
      a: "Yes! You can publish your engineered prompts to the public marketplace or keep them saved privately inside your dashboard."
    },
    {
      q: "Is account creation required to copy prompts?",
      a: "Free prompts can be copied instantly with a single click. Creating a free account unlocks personalized dashboard features, favorite saving, and submission tools."
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] font-sans text-paper space-y-20 pb-20">
      
      {/* 1. HERO SECTION WITH FUTURISTIC GLOW & BACKGROUND PATTERN */}
      <section className="relative overflow-hidden border-b border-white/10 px-4 pt-20 pb-16 md:px-6 md:pt-28 md:pb-24">
        
        {/* Glowing Background Image & Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80"
            alt="Hero BG"
            className="h-full w-full object-cover opacity-20 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090e] via-[#07090e]/80 to-[#07090e]" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-96 w-96 rounded-full bg-violet/30 blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-amber/20 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/15 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-violet shadow-lg shadow-violet/20">
                <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
                <span>Curated &amp; Verified Prompts</span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-black tracking-tight text-white md:text-6xl md:leading-[1.12]">
                The prompt you <br /> need has <span className="text-violet">arrived.</span>
              </h1>

              <p className="mt-6 max-w-xl text-xs leading-relaxed text-mist md:text-sm">
                PromptWorld is the marketplace for high-performing AI prompts. Tested and rated for ChatGPT, Gemini, Claude, and Midjourney. Search, copy, and get results instantly.
              </p>

              {/* Search Bar */}
              <div className="mt-8 flex max-w-md items-center gap-2 rounded-2xl border border-white/15 bg-[#0d111a]/90 backdrop-blur-xl p-2 shadow-2xl focus-within:border-violet/60 transition-all">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Try "SQL query debugging" or "Midjourney portrait"'
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-mist/50 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-xl bg-violet px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all"
                >
                  Search
                </button>
              </div>

              {/* Trending Tags */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-medium text-mist">Trending:</span>
                {["SQL", "Next.js", "Midjourney", "Copywriting", "Unit Tests"].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-mist hover:text-white transition-colors"
                  >
                    #{tag.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Mockup */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0d111a]/90 p-6 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs font-semibold text-mist">sql-debugging.prompt</span>
                  </div>
                  <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-0.5 text-[10px] font-bold text-violet">
                    Claude 3.5
                  </span>
                </div>

                <div className="my-6 rounded-2xl border border-white/5 bg-[#06080e] p-4 font-mono text-xs leading-relaxed text-emerald-400">
                  <p className="text-mist">You are a senior SQL engineer. Given this query and its error message, explain the root cause in one sentence, then return a corrected query with nothing else changed.</p>
                  <p className="mt-3 text-white"><span className="text-violet">Query:</span> {"{{query}}"}</p>
                  <p className="text-white"><span className="text-red-400">Error:</span> {"{{error}}"}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-mist pt-2">
                  <div className="flex items-center gap-4">
                    <span>🔥 1.2k Copies</span>
                    <span className="text-amber">★ 4.9 (128 reviews)</span>
                  </div>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    Verified Prompt ✓
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ENGINE COMPATIBILITY BANNER */}
      <section className="border-b border-white/10 bg-[#090d16] py-10 shadow-xl">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-violet">
            ✦ Tested &amp; Optimized for Leading AI Engines
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              { name: "ChatGPT (GPT-4o)", icon: "🤖", border: "hover:border-emerald-500/40" },
              { name: "Claude 3.5 Sonnet", icon: "🧠", border: "hover:border-amber/40" },
              { name: "Google Gemini 1.5", icon: "✨", border: "hover:border-violet/40" },
              { name: "Midjourney v6", icon: "🎨", border: "hover:border-cyan-500/40" },
              { name: "DeepSeek R1", icon: "⚡", border: "hover:border-pink-500/40" },
            ].map((engine, i) => (
              <div
                key={i}
                className={`flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0d111a] px-4 py-4 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 ${engine.border}`}
              >
                <span className="text-xl">{engine.icon}</span>
                <span>{engine.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-violet">DISCOVER</span>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-white md:text-3xl">Popular Prompt Categories</h2>
            <p className="mt-1 text-xs text-mist">Curated AI prompt collections engineered for high accuracy</p>
          </div>
          <Link href="/categories" className="text-xs font-bold text-violet hover:underline">
            View All Categories →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Web Development", icon: "💻", count: "128 Prompts", desc: "React, Next.js, Architecture & APIs" },
            { name: "UI/UX & Design", icon: "🎨", count: "84 Prompts", desc: "Midjourney, Figma, DALL-E 3" },
            { name: "Content Copywriting", icon: "✍️", count: "95 Prompts", desc: "Sales Copies, Landing Pages & SEO" },
            { name: "SQL & Databases", icon: "🗄️", count: "62 Prompts", desc: "Query Optimization & Debugging" },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href="/categories"
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/50 hover:shadow-violet/10"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-mist group-hover:border-violet/30 group-hover:text-white transition-all">
                    {cat.count}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-base font-bold text-white group-hover:text-violet transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-mist">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-semibold text-violet">
                <span>Browse Category</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROMPTS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-violet">
              MARKETPLACE
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
              Featured Prompts
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Engines" },
              { id: "gpt", label: "GPT-4o" },
              { id: "claude", label: "Claude 3.5" },
              { id: "midjourney", label: "Midjourney" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedEngine(tab.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedEngine === tab.id
                    ? "bg-violet text-white shadow-lg shadow-violet/25"
                    : "border border-white/10 bg-white/5 text-mist hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPrompts.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d111a] shadow-2xl transition-all hover:border-violet/50 hover:-translate-y-1 duration-300"
            >
              <div className="h-28 w-full relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-[#0d111a]/60 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className={`rounded-full border px-3 py-0.5 text-[10px] font-bold backdrop-blur-md ${item.badgeColor}`}>
                    {item.engine}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(item.id)}
                      className={`text-sm ${
                        bookmarks[item.id] ? "text-amber" : "text-mist hover:text-white"
                      }`}
                    >
                      {bookmarks[item.id] ? "★" : "☆"}
                    </button>
                    <span className="text-xs text-amber font-bold">★ {item.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-violet transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-3 rounded-xl border border-white/10 bg-[#06080e]/90 p-3.5 font-mono text-[11px] leading-relaxed text-emerald-400 line-clamp-3">
                    {item.code}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.authorAvatar}
                      alt={item.author}
                      className="h-6 w-6 rounded-full object-cover border border-violet/30"
                    />
                    <span className="text-xs text-mist font-medium">{item.author}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item.code, item.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-violet hover:border-violet transition-all active:scale-95 shadow-md"
                  >
                    {copiedId === item.id ? "✓ Copied!" : "📋 Copy Prompt"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PROMPT CREATORS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div>
            <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet uppercase tracking-wider">
              Community Leaders
            </span>
            <h2 className="mt-2 font-display text-2xl font-black text-white md:text-3xl">
              Featured Prompt Creators
            </h2>
            <p className="mt-1 text-xs text-mist">Top engineers and creators publishing production-grade AI prompts</p>
          </div>
          <Link href="/dashboard/add-prompt" className="text-xs font-bold text-violet hover:underline shrink-0">
            Become a Creator →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Shihab Ahmmed",
              role: "Senior AI Architect & Art Creator",
              bio: "Specializing in Next.js full-stack development, database query optimization, and Midjourney v6 art prompts.",
              prompts: "42 Published",
              copies: "12.4k",
              rating: "4.95 ★",
              badge: "Top Creator",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
              cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
            },
            {
              name: "Elena Rostova",
              role: "LLM Systems Specialist",
              bio: "Crafting structured JSON-output prompts for Claude 3.5 Sonnet, GPT-4o, and automated enterprise API workflows.",
              prompts: "38 Published",
              copies: "9.8k",
              rating: "4.92 ★",
              badge: "Verified Engineer",
              avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
              cover: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80",
            },
            {
              name: "Alex Rivers",
              role: "SaaS Growth & Copywriter",
              bio: "Creating high-converting landing page prompt sequences, B2B cold emails, and SEO copywriting workflows.",
              prompts: "56 Published",
              copies: "18.2k",
              rating: "5.0 ★",
              badge: "Pro Marketer",
              avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
              cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
            },
          ].map((creator, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] shadow-2xl hover:border-violet/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="h-32 w-full relative overflow-hidden">
                  <img
                    src={creator.cover}
                    alt="Cover"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 rounded-full border border-violet/40 bg-[#07090e]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-violet uppercase">
                    {creator.badge}
                  </span>
                </div>

                <div className="px-6 relative -mt-10 flex items-end gap-4">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="h-16 w-16 rounded-2xl object-cover border-2 border-violet shadow-xl shadow-violet/20 bg-[#07090e]"
                  />
                  <div className="pb-1">
                    <h3 className="font-display text-base font-extrabold text-white group-hover:text-violet transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-[11px] font-medium text-mist">{creator.role}</p>
                  </div>
                </div>

                <p className="p-6 text-xs text-mist leading-relaxed line-clamp-3">
                  {creator.bio}
                </p>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold">
                <div>
                  <p className="text-white font-bold">{creator.prompts}</p>
                  <p className="text-[10px] text-mist">Prompts</p>
                </div>
                <div>
                  <p className="text-white font-bold">{creator.copies}</p>
                  <p className="text-[10px] text-mist">Copies</p>
                </div>
                <div>
                  <p className="text-amber font-bold">{creator.rating}</p>
                  <p className="text-[10px] text-mist">Avg Rating</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PROMPT ENGINEERING ESSENTIALS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="border-b border-white/10 pb-6">
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet uppercase tracking-wider">
            Masterclass
          </span>
          <h2 className="mt-2 font-display text-2xl font-black text-white md:text-3xl">
            Prompt Engineering Essentials
          </h2>
          <p className="mt-1 text-xs text-mist">Core principles to design high-accuracy AI prompts with predictable outputs</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "System Role & Persona Framing",
              desc: "Assign a specific expert identity (e.g., 'Act as a Principal Security Auditor') to force the model to adopt domain-specific knowledge and vocabulary.",
              tag: "Core Foundation",
              image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
            },
            {
              title: "Few-Shot Pattern Matching",
              desc: "Provide 2 to 3 input and output examples inside the prompt body. This eliminates formatting hallucinations and guarantees structured responses.",
              tag: "Accuracy Booster",
              image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
            },
            {
              title: "Chain-of-Thought Reasoning",
              desc: "Instruct the model to 'Think step-by-step before answering'. This forces reasoning tokens to generate before final conclusions, solving complex math/logic tasks.",
              tag: "Advanced Logic",
              image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-[#0d111a] overflow-hidden shadow-2xl hover:border-violet/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-[#07090e]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-violet">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-display text-base font-extrabold text-white group-hover:text-violet transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-mist leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-violet group-hover:underline">
                  Learn Technique <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. QUALITY ASSURED BANNER */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-3xl border border-violet/30 bg-gradient-to-r from-violet/20 via-[#0d111a] to-[#0d111a] p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="rounded-full bg-violet/20 border border-violet/30 px-3 py-1 text-[10px] font-bold text-violet uppercase">
              Quality Assured
            </span>
            <h2 className="text-xl font-black text-white">100% Tested &amp; Verified Prompts</h2>
            <p className="text-xs text-mist max-w-xl">
              Every prompt submitted to PromptWorld goes through automated syntax checking and community moderation.
            </p>
          </div>
          <Link
            href="/dashboard/add-prompt"
            className="rounded-2xl bg-violet px-6 py-3.5 text-xs font-bold text-white shadow-xl shadow-violet/25 hover:bg-violet/90 transition-all shrink-0"
          >
            Submit Your Prompt
          </Link>
        </div>
      </section>

      {/* 8. LOVED BY DEVELOPERS & ENGINEERS WITH AVATARS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber">COMMUNITY TESTIMONIALS</span>
          <h2 className="mt-1 font-display text-2xl font-bold text-white">Loved by Developers &amp; Engineers</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              quote: "The Next.js architecture prompt saved me hours of setup time. Highly recommended for full-stack devs!",
              name: "Fahim Ahmmed",
              title: "Senior Full-Stack Engineer",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            },
            {
              quote: "SQL debugging prompt is spot on. Corrected complex JOIN queries without wasting OpenAI tokens.",
              name: "SM Rafid",
              title: "Data Engineer & LLM Specialist",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
            },
            {
              quote: "The UI design prompts for Midjourney v6 give photorealistic results on the very first attempt.",
              name: "Rakibul Islam",
              title: "UI/UX Product Designer",
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
            },
          ].map((review, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-xl hover:border-violet/30 transition-all flex flex-col justify-between">
              <div>
                <div className="text-amber text-xs font-bold">★★★★★</div>
                <p className="mt-3 text-xs leading-relaxed text-mist">"{review.quote}"</p>
              </div>
              <div className="mt-6 border-t border-white/5 pt-4 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-10 w-10 rounded-full object-cover border border-violet/40 shadow-md"
                />
                <div>
                  <h4 className="font-display text-xs font-bold text-white">{review.name}</h4>
                  <p className="text-[10px] text-mist">{review.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-violet">GOT QUESTIONS?</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#0d111a] overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left text-xs font-bold text-white"
              >
                <span>{faq.q}</span>
                <span className="text-mist">{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 text-xs leading-relaxed text-mist border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}