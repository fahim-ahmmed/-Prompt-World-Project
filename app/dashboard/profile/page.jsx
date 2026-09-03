"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const defaultAiAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";

  const [user, setUser] = useState({
    name: "",
    email: "",
    photoURL: defaultAiAvatar,
    bio: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          name: parsed.name || "",
          email: parsed.email || "",
          photoURL: parsed.photoURL || defaultAiAvatar,
          bio: parsed.bio || "AI Prompt Enthusiast & Creator",
          role: parsed.role || "user",
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedUser = { 
      ...user, 
      photoURL: user.photoURL || defaultAiAvatar 
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage({ type: "success", text: "🎉 Profile updated successfully!" });
    setLoading(false);
    setTimeout(() => router.refresh(), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans text-paper">
      <div className="rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl flex items-center justify-between">
        <div>
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet uppercase tracking-wider">
            Account Management
          </span>
          <h1 className="mt-2 font-display text-2xl font-black text-white">
            Edit Profile Settings
          </h1>
          <p className="mt-0.5 text-xs text-mist">
            Update your public profile, display avatar, and personal preferences.
          </p>
        </div>
      </div>

      {message.text && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400">
          {message.text}
        </div>
      )}

      <div className="rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl">
        <form onSubmit={handleUpdate} className="space-y-6">
          
          {/* Avatar Preview */}
          <div className="flex items-center gap-6 pb-6 border-b border-white/5">
            <div className="h-20 w-20 rounded-2xl border-2 border-violet shadow-xl shadow-violet/20 bg-[#07090e] overflow-hidden shrink-0">
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="h-full w-full object-cover"
                onError={(e) => { e.target.src = defaultAiAvatar; }}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{user.name || "User"}</h3>
              <p className="text-xs text-mist">{user.email}</p>
              <span className="mt-2 inline-block rounded-full bg-violet/20 border border-violet/30 px-2.5 py-0.5 text-[10px] font-bold text-violet uppercase">
                {user.role} Account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-[#07090e] p-3.5 text-xs text-white focus:border-violet focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-mist mb-2">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 text-xs text-mist cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-2">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={user.photoURL}
              onChange={(e) => setUser({ ...user, photoURL: e.target.value })}
              className="w-full rounded-2xl border border-white/10 bg-[#07090e] p-3.5 text-xs text-white focus:border-violet focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-violet px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-violet/25 hover:bg-violet/90 transition-all"
          >
            {loading ? "Saving..." : "Save Profile Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}