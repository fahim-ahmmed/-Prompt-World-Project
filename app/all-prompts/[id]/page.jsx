"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromptDetailsPage({ params }) {
  const [prompt, setPrompt] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // ডামি ডেটা দিয়ে টেস্ট ইন্টারফেস
    setPrompt({
      id: params.id,
      title: "Master Enterprise SaaS System Architecture",
      description: "Generates production-grade Next.js 15 & Node.js backend boilerplates with clean structure.",
      promptCode: "Act as a Senior Principal Architect. Construct a modular Next.js 15 schema with Auth handlers...",
      visibility: "Private", // Private/Premium
      model: "Claude 3.5 Sonnet",
      creator: { name: "Shihab Ahmmed" }
    });
  }, [params.id]);

  if (!prompt) return <div className="p-10 text-white">Loading...</div>;

  const isLocked = prompt.visibility === "Private" && user?.subscription !== "Premium";

  return (
    <div className="min-h-screen bg-[#07090e] py-16 px-6 text-paper font-sans">
      <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-bold text-violet">
            {prompt.model}
          </span>
          {prompt.visibility === "Private" && (
            <span className="rounded-md bg-amber/20 border border-amber/40 px-2.5 py-1 text-xs font-bold text-amber">
              PREMIUM PROMPT
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-white">{prompt.title}</h1>
        <p className="mt-2 text-xs text-mist">{prompt.description}</p>

        {/* PROMPT CONTENT SECTION WITH LOCK/BLUR */}
        <div className="mt-8">
          <label className="block text-xs font-bold uppercase text-white mb-2">Prompt Code:</label>
          
          {isLocked ? (
            <div className="relative rounded-2xl border border-white/10 bg-[#06080e] p-8 text-center overflow-hidden">
              <div className="filter blur-md select-none font-mono text-xs text-emerald-400">
                {prompt.promptCode}
              </div>
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                <span className="text-3xl">🔒</span>
                <h3 className="mt-2 font-bold text-white text-base">This is a Premium Prompt</h3>
                <p className="mt-1 text-xs text-mist">Upgrade to Premium to copy and view complete prompt execution.</p>
                <Link
                  href="/checkout"
                  className="mt-4 rounded-xl bg-violet px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet/25"
                >
                  Subscribe to Premium ($5)
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#06080e] p-5 font-mono text-xs text-emerald-400">
              {prompt.promptCode}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}