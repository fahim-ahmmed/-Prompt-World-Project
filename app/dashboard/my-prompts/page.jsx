"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPromptsPage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyPrompts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/prompts/my-prompts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch prompts");
      }

      setPrompts(data.prompts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPrompts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/prompts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setPrompts(prompts.filter((p) => p._id !== id));
        alert("Prompt deleted successfully!");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete prompt");
      }
    } catch (err) {
      alert("Error deleting prompt");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-white font-sans text-xs">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d111a] px-6 py-4 shadow-2xl">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet border-t-transparent" />
          <span className="font-medium text-mist">Loading My Prompts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-paper font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl">
          <div>
            <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet uppercase tracking-wider">
              Management
            </span>
            <h1 className="mt-2 font-display text-xl font-black text-white">
              My Created Prompts
            </h1>
            <p className="mt-0.5 text-xs text-mist">
              View, edit, and track status of all your submitted prompts.
            </p>
          </div>

          <Link
            href="/dashboard/add-prompt"
            className="rounded-2xl bg-violet px-5 py-3 text-xs font-bold text-white shadow-xl shadow-violet/25 hover:bg-violet/90 transition-all text-center"
          >
            + Create New Prompt
          </Link>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* Prompts Table */}
        <div className="rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl overflow-hidden">
          {prompts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#07090e]/50 p-12 text-center space-y-3">
              <p className="text-xs text-mist">No prompts found in your account.</p>
              <Link
                href="/dashboard/add-prompt"
                className="inline-block text-xs font-bold text-violet hover:underline"
              >
                + Add your first prompt
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-bold uppercase text-mist">
                    <th className="pb-3 px-4">Title</th>
                    <th className="pb-3 px-4">AI Tool</th>
                    <th className="pb-3 px-4">Category</th>
                    <th className="pb-3 px-4">Visibility</th>
                    <th className="pb-3 px-4">Status</th>
                    <th className="pb-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {prompts.map((prompt) => (
                    <tr key={prompt._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-bold text-white max-w-xs truncate">
                        {prompt.title}
                      </td>
                      <td className="py-4 px-4 text-mist">{prompt.aiTool}</td>
                      <td className="py-4 px-4 text-mist">{prompt.category}</td>
                      <td className="py-4 px-4">
                        <span className="capitalize text-[11px] font-semibold text-white/80">
                          {prompt.visibility || "Public"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                            prompt.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : prompt.status === "rejected"
                              ? "bg-red-500/10 text-red-400 border border-red-500/30"
                              : "bg-amber/10 text-amber border border-amber/30"
                          }`}
                        >
                          {prompt.status || "pending"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleDelete(prompt._id)}
                          className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[11px] font-bold text-red-400 hover:bg-red-500/20 transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}