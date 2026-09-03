"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubmitPromptPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "web-dev",
    engine: "ChatGPT / GPT-4o",
    description: "",
    promptText: "",
    tags: "",
    isPrivate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // সিমুলেটেড সাবমিট (পরবর্তীতে ব্যাকএন্ড API এর সাথে কানেক্ট করতে পারেন)
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
      router.refresh();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] py-10 text-paper font-sans">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        
        {/* Top Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full border border-violet/30 bg-violet/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-violet">
                CREATOR HUB
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-extrabold text-white md:text-3xl">
              Submit New AI Prompt
            </h1>
            <p className="mt-1 text-xs text-mist">
              Share your engineered prompts with the community or save them privately.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-mist hover:bg-white/10 hover:text-white transition-all"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Main Form Area */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column: Form Controls (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Title */}
            <div className="rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-xl">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white">
                Prompt Title <span className="text-violet">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Next.js 15 Full-Stack Architecture & Better Auth Template"
                className="w-full rounded-xl border border-white/10 bg-[#07090e] px-4 py-3 text-xs text-white placeholder:text-mist/40 focus:border-violet focus:outline-none transition-all"
              />
              <p className="mt-2 text-[11px] text-mist">
                A clear, descriptive title helps users understand the exact output of your prompt.
              </p>
            </div>

            {/* Target AI Model & Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-xl">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white">
                  Target AI Model <span className="text-violet">*</span>
                </label>
                <select
                  name="engine"
                  value={formData.engine}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#07090e] px-4 py-3 text-xs text-white focus:border-violet focus:outline-none transition-all"
                >
                  <option value="ChatGPT / GPT-4o">ChatGPT / GPT-4o</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  <option value="Midjourney v6">Midjourney v6</option>
                  <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro</option>
                  <option value="DALL-E 3">DALL-E 3</option>
                  <option value="DeepSeek R1">DeepSeek R1</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white">
                  Category <span className="text-violet">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-[#07090e] px-4 py-3 text-xs text-white focus:border-violet focus:outline-none transition-all"
                >
                  <option value="web-dev">Web Development</option>
                  <option value="writing">Content & Copywriting</option>
                  <option value="design-ui">UI/UX & Design</option>
                  <option value="marketing">Digital Marketing & SEO</option>
                  <option value="productivity">Productivity & Business</option>
                </select>
              </div>
            </div>

            {/* Short Description */}
            <div className="rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-xl">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white">
                Short Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly explain what problem this prompt solves and how to use it..."
                className="w-full rounded-xl border border-white/10 bg-[#07090e] px-4 py-3 text-xs text-white placeholder:text-mist/40 focus:border-violet focus:outline-none transition-all"
              />
            </div>

            {/* Prompt Code / Core Text */}
            <div className="rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-white">
                  Full Prompt Instructions <span className="text-violet">*</span>
                </label>
                <span className="text-[10px] font-medium text-violet">
                  Markdown & Placeholders Supported
                </span>
              </div>
              <textarea
                name="promptText"
                required
                rows={10}
                value={formData.promptText}
                onChange={handleChange}
                placeholder="Act as a Principal Software Engineer. Write a production-grade Next.js App Router boilerplate including..."
                className="w-full font-mono rounded-xl border border-white/10 bg-[#06080e] p-4 text-xs leading-relaxed text-emerald-400 placeholder:text-mist/30 focus:border-violet focus:outline-none transition-all"
              />
            </div>

            {/* Tags */}
            <div className="rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-xl">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="nextjs, tailwind, auth, React, boilerplate"
                className="w-full rounded-xl border border-white/10 bg-[#07090e] px-4 py-3 text-xs text-white placeholder:text-mist/40 focus:border-violet focus:outline-none transition-all"
              />
            </div>

          </div>

          {/* Right Column: Settings & Tips (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Visibility Settings */}
            <div className="rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-xl">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
                Publishing Options
              </h3>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5">
                <input
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#07090e] text-violet focus:ring-0"
                />
                <label htmlFor="isPrivate" className="cursor-pointer">
                  <span className="block text-xs font-bold text-white">Keep as Private Prompt</span>
                  <span className="block mt-0.5 text-[11px] text-mist">
                    Only visible inside your dashboard (Pro feature).
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-violet py-3.5 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? "Publishing Prompt..." : "✦ Publish Prompt Now"}
              </button>
            </div>

            {/* Pro Creator Guidelines Card */}
            <div className="rounded-2xl border border-amber/30 bg-gradient-to-b from-amber/10 via-[#0d111a] to-[#07090e] p-6 shadow-xl">
              <span className="inline-block rounded-full bg-amber/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber border border-amber/30">
                PRO TIPS
              </span>
              <h4 className="mt-3 font-display text-sm font-bold text-white">
                How to write top-rated prompts
              </h4>

              <ul className="mt-4 flex flex-col gap-2.5 text-xs text-mist">
                <li className="flex items-start gap-2">
                  <span className="text-amber">✦</span>
                  <span><strong>Specify Persona:</strong> Define clear roles (e.g., "Act as a Senior Developer").</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber">✦</span>
                  <span><strong>Use Placeholders:</strong> Mark dynamic inputs like <code className="text-amber">[PROJECT_NAME]</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber">✦</span>
                  <span><strong>Output Format:</strong> Instruct the AI on code blocks or JSON structures.</span>
                </li>
              </ul>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}