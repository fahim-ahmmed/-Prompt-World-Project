"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myPrompts, setMyPrompts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchUserPrompts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/prompts/my-prompts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setMyPrompts(data.prompts || []);
        }
      } catch (err) {
        console.error("Error fetching user prompts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPrompts();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-white font-sans text-xs">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d111a] px-6 py-4 shadow-2xl">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-violet border-t-transparent" />
          <span className="font-medium text-mist">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 1. Profile Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80"
            alt="Workspace BG"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d111a] via-[#0d111a]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center gap-5">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-violet/40 to-violet/10 border-2 border-violet/60 text-violet flex items-center justify-center font-display text-2xl font-black shadow-2xl overflow-hidden shrink-0">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="h-full w-full object-cover" />
            ) : (
              user?.name?.charAt(0) || "U"
            )}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-lg md:text-xl font-black text-white tracking-wide">
                {user?.name}
              </h1>
              <span className="rounded-full border border-violet/30 bg-violet/15 px-3 py-0.5 text-[10px] font-extrabold text-violet uppercase tracking-wider">
                {user?.subscription || "FREE"}
              </span>
            </div>
            <p className="mt-1 text-xs text-mist font-medium">{user?.email}</p>
          </div>
        </div>

        {user?.subscription !== "Premium" && (
          <Link
            href="/checkout"
            className="relative z-10 rounded-2xl bg-violet px-6 py-3.5 text-xs font-extrabold text-white shadow-xl shadow-violet/25 hover:bg-violet/90 hover:scale-105 active:scale-95 transition-all"
          >
            Upgrade to Pro — $5
          </Link>
        )}
      </div>

      {/* 2. Quick Action Cards with Images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Create Prompt Card */}
        <Link
          href="/dashboard/add-prompt"
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl hover:border-violet/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48"
        >
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80"
            alt="Create Prompt"
            className="absolute inset-0 h-full w-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-[#0d111a]/70 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="h-10 w-10 rounded-2xl bg-violet/20 border border-violet/40 text-violet flex items-center justify-center font-bold text-lg group-hover:bg-violet group-hover:text-white transition-all shadow-lg">
              +
            </div>
            <span className="text-xs font-bold text-mist group-hover:text-violet transition-colors">→</span>
          </div>

          <div className="relative z-10">
            <h3 className="text-sm font-extrabold text-white group-hover:text-violet transition-colors">
              Create Prompt
            </h3>
            <p className="mt-1 text-xs text-mist">Publish new AI prompt to marketplace</p>
          </div>
        </Link>

        {/* Explore Market Card */}
        <Link
          href="/prompts"
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl hover:border-violet/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48"
        >
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
            alt="Explore Market"
            className="absolute inset-0 h-full w-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-[#0d111a]/70 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="h-10 w-10 rounded-2xl bg-violet/20 border border-violet/40 text-violet flex items-center justify-center font-bold text-sm group-hover:bg-violet group-hover:text-white transition-all shadow-lg">
              🔍
            </div>
            <span className="text-xs font-bold text-mist group-hover:text-violet transition-colors">→</span>
          </div>

          <div className="relative z-10">
            <h3 className="text-sm font-extrabold text-white group-hover:text-violet transition-colors">
              Explore Market
            </h3>
            <p className="mt-1 text-xs text-mist">Find curated ChatGPT &amp; Midjourney prompts</p>
          </div>
        </Link>

        {/* Saved Collection Card */}
        <Link
          href="/dashboard/saved"
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-2xl hover:border-violet/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48"
        >
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80"
            alt="Saved Collection"
            className="absolute inset-0 h-full w-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d111a] via-[#0d111a]/70 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="h-10 w-10 rounded-2xl bg-violet/20 border border-violet/40 text-violet flex items-center justify-center font-bold text-sm group-hover:bg-violet group-hover:text-white transition-all shadow-lg">
              🔖
            </div>
            <span className="text-xs font-bold text-mist group-hover:text-violet transition-colors">→</span>
          </div>

          <div className="relative z-10">
            <h3 className="text-sm font-extrabold text-white group-hover:text-violet transition-colors">
              Saved Collection
            </h3>
            <p className="mt-1 text-xs text-mist">Access your bookmarked prompts fast</p>
          </div>
        </Link>

      </div>

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-white/5 bg-[#0d111a]/60 p-6 shadow-xl">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-mist">Account Role</p>
          <p className="mt-2 font-display text-2xl font-black text-white uppercase tracking-wider">{user?.role || "USER"}</p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#0d111a]/60 p-6 shadow-xl">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-mist">My Submitted Prompts</p>
          <p className="mt-2 font-display text-2xl font-black text-white">{myPrompts.length}</p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#0d111a]/60 p-6 shadow-xl">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-mist">Subscription Status</p>
          <p className="mt-2 font-display text-2xl font-black text-violet capitalize">{user?.subscription || "Free"}</p>
        </div>
      </div>

      {/* 4. Prompt Collection Section */}
      <div className="rounded-3xl border border-white/10 bg-[#0d111a] p-6 md:p-8 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white">
            Your Recent Prompts
          </h2>
          <Link href="/dashboard/my-prompts" className="text-xs text-violet hover:underline font-bold">
            View All ({myPrompts.length}) →
          </Link>
        </div>

        {myPrompts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#07090e]/50 p-10 text-center space-y-3">
            <p className="text-xs text-mist">You haven't submitted any prompts yet.</p>
            <Link
              href="/dashboard/add-prompt"
              className="inline-block text-xs font-extrabold text-violet hover:underline"
            >
              + Create your first prompt
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {myPrompts.slice(0, 3).map((prompt) => (
              <div
                key={prompt._id}
                className="rounded-2xl border border-white/5 bg-[#07090e]/60 p-4.5 flex items-center justify-between hover:border-white/10 transition-all"
              >
                <div>
                  <h3 className="text-xs font-bold text-white">{prompt.title}</h3>
                  <p className="mt-1 text-[11px] text-mist line-clamp-1">{prompt.description}</p>
                </div>
                <span
                  className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                    prompt.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber/10 text-amber border border-amber/30"
                  }`}
                >
                  {prompt.status || "pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. AI Model Compatibility Badges */}
      
      {/* 6. Trending Categories & Creator Guidelines Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Exploration Grid */}
        <div className="rounded-3xl border border-white/10 bg-[#0d111a] p-6 md:p-8 shadow-2xl space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white">
            Top Categories
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {["💻 Coding & WebDev", "✍️ Creative Writing", "🎨 Image Prompts", "📊 Marketing & SEO", "🤖 Automation", "🎓 Academic"].map((cat, i) => (
              <Link
                key={i}
                href="/categories"
                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-mist hover:text-white hover:border-violet/40 transition-all cursor-pointer"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Creator Best Practices Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-violet/30 bg-gradient-to-br from-violet/20 via-[#0d111a] to-[#0d111a] p-6 md:p-8 shadow-2xl space-y-2 flex flex-col justify-between">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80"
            alt="Pro Tip BG"
            className="absolute inset-0 h-full w-full object-cover opacity-15 pointer-events-none"
          />
          <div className="relative z-10 space-y-2">
            <span className="rounded-full bg-violet/20 border border-violet/30 px-3 py-1 text-[10px] font-bold text-violet uppercase">
              Pro Tip
            </span>
            <h3 className="text-sm font-bold text-white">How to write top-rated prompts?</h3>
            <p className="text-xs text-mist leading-relaxed">
              Include clear variable placeholders (e.g., <code className="text-violet">[YOUR_TOPIC]</code>), precise output formats, and example outputs to boost copy rates.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}