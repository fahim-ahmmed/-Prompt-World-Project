"use client";

import { useState } from "react";

const SAMPLE_PROMPTS = [
  {
    id: "1",
    title: "Enterprise Full-Stack Architecture Generator",
    description: "Generates production-ready Next.js 15 & Node.js backend boilerplates with clean structure.",
    promptCode: "Act as a Senior Principal Architect. Construct a modular Next.js 15 schema with Auth handlers...",
    model: "Claude 3.5 Sonnet",
    category: "Development",
    copies: 1420,
    rating: 4.9,
    price: "Free",
    tags: ["NextJS15", "Architecture", "Backend"],
    // পূর্বে অব্যবহৃত নতুন ইউনিক টেক ইমেজ
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Ultra-Realistic Photorealistic Portrait Prompt",
    description: "Creates high-detail studio lighting portrait prompts with realistic skin textures and focal lengths.",
    promptCode: "/imagine prompt: Cinematic portrait, 85mm lens, natural studio lighting, ultra detailed skin texture --ar 16:9 --v 6.0",
    model: "Midjourney v6",
    category: "Design & Art",
    copies: 2890,
    rating: 5.0,
    price: "Pro",
    tags: ["MidjourneyV6", "Photorealism", "Portrait"],
    coverImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "SaaS Cold Email & Sales Pitch Copywriter",
    description: "Crafts high-converting cold outbound emails tailored for B2B tech decision makers.",
    promptCode: "You are an expert SaaS copywriter. Write a 3-step cold email sequence for a B2B Analytics tool targeting CTOs...",
    model: "ChatGPT-4o",
    category: "Marketing",
    copies: 850,
    rating: 4.8,
    price: "Free",
    tags: ["Sales", "ColdEmail", "Copywriting"],
    coverImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Comprehensive SEO Article Writer & Schema Builder",
    description: "Outputs long-form SEO articles formatted with JSON-LD schema markup and meta tags.",
    promptCode: "Write an exhaustive 2000-word article on modern web caching strategies. Include JSON-LD FAQ schema...",
    model: "Claude 3.5 Sonnet",
    category: "Writing",
    copies: 1120,
    rating: 4.7,
    price: "Free",
    tags: ["SEO", "ContentStrategy", "Schema"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    title: "SQL Query Optimizer & Indexing Advisor",
    description: "Analyzes complex SQL queries, identifies bottlenecks, and provides optimized index plans.",
    promptCode: "Analyze the following PostgreSQL query for performance bottlenecks and suggest index creations...",
    model: "ChatGPT-4o",
    category: "Development",
    copies: 640,
    rating: 4.9,
    price: "Free",
    tags: ["PostgreSQL", "Database", "Performance"],
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    title: "3D Isometric Icon & Asset Generator",
    description: "Prompts designed to render clean isometric 3D illustrations for UI/UX landing pages.",
    promptCode: "/imagine prompt: Clean isometric 3D icon of a cloud database server, vibrant neon violet accents, dark theme background --v 6.0",
    model: "Midjourney v6",
    category: "Design & Art",
    copies: 1980,
    rating: 4.8,
    price: "Pro",
    tags: ["3DIcons", "UIAssets", "Illustration"],
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
  },
];

const POPULAR_TAGS = ["All", "NextJS15", "MidjourneyV6", "SEO", "ColdEmail", "Database"];

export default function AllPromptsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModel, setSelectedModel] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeModalPrompt, setActiveModalPrompt] = useState(null);

  const models = ["All", "ChatGPT-4o", "Claude 3.5 Sonnet", "Midjourney v6"];

  const filteredPrompts = SAMPLE_PROMPTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModel = selectedModel === "All" || item.model === selectedModel;
    const matchesTag = selectedTag === "All" || item.tags.includes(selectedTag);
    return matchesSearch && matchesModel && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#07090e] py-12 px-6 font-sans text-paper">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1 text-xs font-semibold text-violet uppercase tracking-wider">
            Verified Directory
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white md:text-5xl">
            Explore All AI Prompts
          </h1>
          <p className="mt-3 text-xs md:text-sm text-mist">
            Discover battle-tested prompts curated for developers, designers, and marketers.
          </p>
        </div>

        {/* 1. FEATURED PROMPT BANNER */}
        <div className="mt-10 rounded-3xl border border-violet/40 bg-gradient-to-r from-violet/20 via-[#0d111a] to-[#0d111a] p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow Image */}
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"
            alt="Master Banner BG"
            className="absolute inset-0 h-full w-full object-cover opacity-10 pointer-events-none"
          />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <span className="rounded-full bg-violet px-3 py-1 text-[10px] font-black uppercase text-white shadow-lg shadow-violet/40">
                PROMPT OF THE WEEK ✦
              </span>
              <h2 className="mt-3 font-display text-2xl font-black text-white">
                Autonomous AI Agent System Prompt
              </h2>
              <p className="mt-2 text-xs text-mist leading-relaxed">
                A structured master prompt to run LLMs as autonomous task execution agents with memory management and tool calling integration.
              </p>
            </div>
            <button
              onClick={() => setActiveModalPrompt(SAMPLE_PROMPTS[0])}
              className="rounded-2xl bg-white px-6 py-3.5 text-xs font-bold text-black shadow-xl hover:bg-slate-200 transition-all shrink-0"
            >
              Inspect Master Prompt →
            </button>
          </div>
        </div>

        {/* 2. TAGS & FILTER BAR */}
        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0d111a] p-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Search prompts by keyword or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />

            <div className="flex flex-wrap items-center gap-2">
              {models.map((model) => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    selectedModel === model
                      ? "bg-violet text-white shadow-md shadow-violet/30"
                      : "bg-white/5 text-mist hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tag Filters */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 overflow-x-auto">
            <span className="text-[11px] font-bold text-mist mr-2">Tags:</span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  selectedTag === tag
                    ? "bg-violet/30 text-violet border border-violet/50"
                    : "text-mist hover:text-white"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3. PROMPTS GRID WITH INTEGRATED COVER IMAGES */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] shadow-xl hover:border-violet/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Cover Banner */}
                <div className="h-32 w-full relative overflow-hidden">
                  <img
                    src={prompt.coverImage}
                    alt={prompt.title}
                    className="h-full w-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-[#0d111a]/40 to-transparent" />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-md border border-violet/30 bg-[#07090e]/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-violet uppercase">
                      {prompt.model}
                    </span>
                    <div className="flex items-center gap-2">
                      {prompt.price === "Pro" && (
                        <span className="rounded-md bg-amber/20 border border-amber/40 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-amber">
                          PRO
                        </span>
                      )}
                      <span className="text-xs font-bold text-white backdrop-blur-md bg-[#07090e]/60 px-2 py-0.5 rounded-md">★ {prompt.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-2">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-violet transition-colors">
                    {prompt.title}
                  </h3>
                  <p className="mt-2 text-xs text-mist line-clamp-2 leading-relaxed">
                    {prompt.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {prompt.tags.map((t) => (
                      <span key={t} className="text-[10px] text-mist bg-white/5 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/10 mt-4 flex items-center justify-between pt-4">
                <button
                  onClick={() => setActiveModalPrompt(prompt)}
                  className="text-xs font-bold text-mist hover:text-white transition-all"
                >
                  View Details
                </button>
                <button
                  onClick={() => alert("Prompt copied to clipboard!")}
                  className="rounded-xl bg-violet/20 border border-violet/40 px-4 py-2 text-xs font-bold text-violet hover:bg-violet hover:text-white transition-all active:scale-95 shadow-md"
                >
                  Copy Prompt
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4. PAGINATION CONTROLS */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="rounded-xl border border-white/10 bg-[#0d111a] px-4 py-2 text-xs font-bold text-mist hover:text-white">
            ← Previous
          </button>
          <button className="rounded-xl bg-violet px-4 py-2 text-xs font-bold text-white">
            1
          </button>
          <button className="rounded-xl border border-white/10 bg-[#0d111a] px-4 py-2 text-xs font-bold text-mist hover:text-white">
            2
          </button>
          <button className="rounded-xl border border-white/10 bg-[#0d111a] px-4 py-2 text-xs font-bold text-mist hover:text-white">
            3
          </button>
          <button className="rounded-xl border border-white/10 bg-[#0d111a] px-4 py-2 text-xs font-bold text-mist hover:text-white">
            Next →
          </button>
        </div>

      </div>

      {/* PROMPT DETAIL MODAL */}
      {activeModalPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setActiveModalPrompt(null)}
              className="absolute top-6 right-6 text-mist hover:text-white text-lg font-bold z-10"
            >
              ✕
            </button>
            <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet">
              {activeModalPrompt.model}
            </span>
            <h2 className="mt-3 font-display text-xl font-bold text-white">
              {activeModalPrompt.title}
            </h2>
            <p className="mt-2 text-xs text-mist">{activeModalPrompt.description}</p>

            <div className="mt-6">
              <label className="block text-[11px] font-bold uppercase text-white mb-2">
                Prompt Code &amp; Instruction:
              </label>
              <div className="rounded-2xl border border-white/10 bg-[#06080e] p-4 font-mono text-xs text-emerald-400 max-h-60 overflow-y-auto">
                {activeModalPrompt.promptCode}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalPrompt(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeModalPrompt.promptCode);
                  alert("Copied to clipboard!");
                }}
                className="rounded-xl bg-violet px-5 py-2 text-xs font-bold text-white shadow-lg shadow-violet/25"
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}