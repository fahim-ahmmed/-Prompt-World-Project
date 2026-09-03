"use client";

import { useState } from "react";

export default function AdminPromptsPage() {
  const [prompts, setPrompts] = useState([
    {
      _id: "p101",
      title: "Advanced Next.js Architecture Prompt",
      creator: { name: "Shihab Ahmmed", email: "shihab@example.com" },
      status: "pending",
      visibility: "public",
    },
  ]);
  const [feedback, setFeedback] = useState({});

  const handleApprove = (id) => {
    setPrompts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "approved" } : p))
    );
  };

  const handleReject = (id) => {
    const reason = feedback[id] || "Does not meet quality standards.";
    setPrompts((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, status: "rejected", rejectionFeedback: reason }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#07090e] p-6 text-paper">
      <h1 className="font-display text-2xl font-bold text-white">
        Admin — Prompt Moderation Panel
      </h1>
      <p className="mt-1 text-xs text-mist">
        Approve or Reject newly submitted user prompts before marketplace publication.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#0d111a] p-4">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 text-mist uppercase font-semibold">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Creator</th>
              <th className="p-3">Status</th>
              <th className="p-3">Rejection Feedback</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white">
            {prompts.map((p) => (
              <tr key={p._id}>
                <td className="p-3 font-semibold">{p.title}</td>
                <td className="p-3 text-mist">{p.creator.name}</td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      p.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : p.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border border-red-500/30"
                        : "bg-amber/10 text-amber border border-amber/30"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Feedback if rejecting..."
                    value={feedback[p._id] || ""}
                    onChange={(e) =>
                      setFeedback({ ...feedback, [p._id]: e.target.value })
                    }
                    className="w-full rounded-lg border border-white/10 bg-[#07090e] px-2.5 py-1 text-xs text-white"
                  />
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => handleApprove(p._id)}
                    className="rounded-lg bg-emerald-600 px-3 py-1 font-bold text-white hover:bg-emerald-500"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(p._id)}
                    className="rounded-lg bg-red-600 px-3 py-1 font-bold text-white hover:bg-red-500"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}