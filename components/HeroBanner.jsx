"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroBanner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-prompts?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#07090e]">
      {/* Background Glow Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Tagline Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-4 py-1.5 text-xs font-semibold text-violet"
          >
            <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
            <span>Next-Gen AI Prompt Marketplace</span>
          </motion.div>

          {/* Heading Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-display text-4xl font-extrabold text-white md:text-6xl leading-tight"
          >
            Supercharge Your Workflow with <br />
            <span className="bg-gradient-to-r from-violet via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Verified AI Prompts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-xs md:text-sm text-mist leading-relaxed"
          >
            Discover, copy, and publish production-ready prompts for ChatGPT, Midjourney, Claude 3.5, and Gemini.
          </motion.p>

          {/* Search Bar Form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0d111a] p-2 shadow-2xl max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search prompts by topic, tag, or AI model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 text-xs text-white placeholder-mist focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-violet px-5 py-3 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all whitespace-nowrap"
            >
              Search Prompts
            </button>
          </motion.form>

          {/* Trending Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2 flex-wrap text-[11px]"
          >
            <span className="text-mist font-semibold">Trending:</span>
            {["NextJS15", "MidjourneyV6", "SEO Writer", "Cold Email"].map((tag) => (
              <Link
                key={tag}
                href={`/all-prompts?search=${tag}`}
                className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-mist hover:text-white hover:border-violet/40 transition-all"
              >
                #{tag}
              </Link>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}