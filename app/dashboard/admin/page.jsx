"use client";

import { useState } from "react";

const INITIAL_PENDING = [
  {
    _id: "p1",
    title: "Kubernetes Automated Deployment Script Prompt",
    creator: "User Dev",
    category: "Development",
    aiTool: "ChatGPT-4o",
    promptCode: "Write a helm chart configuration...",
  },
  {
    _id: "p2",
    title: "Midjourney Photorealistic Product Mockup",
    creator: "Creative Studio",
    category: "Design",
    aiTool: "Midjourney v6",
    promptCode: "/imagine product mockup on wooden table --v 6.0",
  },
];

export default function AdminDashboardPage() {
  const [prompts, setPrompts] = useState(INITIAL_PENDING);

  const handleApprove = (id) => {
    setPrompts(prompts.filter((p) => p._id !== id));
    alert("✅ Prompt Approved and published to Marketplace!");
  };

  const handleReject = (id) => {
    const reason = prompt("Enter Rejection Feedback Reason:");
    if (reason) {
      setPrompts(prompts.filter((p) => p._id !== id));
      alert(`❌ Prompt Rejected. Feedback sent: "${reason}"`);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] py-12 px-6 font-sans text-paper">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-black text-white">Admin Moderation Panel</h1>
        <p className="text-xs text-mist mt-1">Review pending user prompts and update marketplace status.</p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-xl">
          <h2 className="font-bold text-sm text-white mb-4">Pending Approvals ({prompts.length})</h2>

          {prompts.length === 0 ? (
            <p className="text-xs text-mist py-8 text-center">No pending prompts to review.</p>
          ) : (
            <div className="space-y-4">
              {prompts.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-white/10 bg-[#07090e] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold text-violet bg-violet/10 border border-violet/30 px-2 py-0.5 rounded-md">
                      {item.aiTool}
                    </span>
                    <h3 className="font-bold text-sm text-white mt-1">{item.title}</h3>
                    <p className="text-xs text-mist font-mono mt-1 bg-black/40 p-2 rounded-lg">
                      {item.promptCode}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item._id)}
                      className="rounded-xl bg-red-500/20 border border-red-500/40 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}