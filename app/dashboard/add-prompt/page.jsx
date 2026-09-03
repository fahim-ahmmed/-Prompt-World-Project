"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPromptPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    promptCode: "",
    category: "Development",
    aiTool: "ChatGPT-4o",
    tags: "",
    difficulty: "Beginner",
    visibility: "Public",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const tagsArray = formData.tags.split(",").map((t) => t.trim());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/prompts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, tags: tagsArray }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) {
          alert("⚠️ " + data.message);
          router.push("/checkout");
          return;
        }
        throw new Error(data.message || "Failed to create prompt.");
      }

      alert("🎉 Prompt submitted! It is currently pending Admin Approval.");
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] py-12 px-6 font-sans text-paper">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl">
        <h1 className="font-display text-2xl font-black text-white">Create New AI Prompt</h1>
        <p className="text-xs text-mist mt-1">
          Submitted prompts will be reviewed by admins before appearing on the marketplace.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Full-Stack Next.js 15 Architect"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-white mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Writing">Writing</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-white mb-1">AI Tool</label>
              <select
                value={formData.aiTool}
                onChange={(e) => setFormData({ ...formData, aiTool: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
              >
                <option value="ChatGPT-4o">ChatGPT-4o</option>
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="Midjourney v6">Midjourney v6</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">Prompt Instruction Code</label>
            <textarea
              required
              rows={4}
              value={formData.promptCode}
              onChange={(e) => setFormData({ ...formData, promptCode: e.target.value })}
              placeholder="Act as a senior software architect..."
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-white mb-1">Tags (Comma Separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="NextJS, React, Architecture"
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-white mb-1">Visibility</label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
              >
                <option value="Public">Public (Free Access)</option>
                <option value="Private">Private (Premium Only)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet py-3.5 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all mt-4"
          >
            {loading ? "Submitting..." : "Submit Prompt for Review"}
          </button>
        </form>
      </div>
    </div>
  );
}