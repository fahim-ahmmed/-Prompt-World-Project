"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  const aiAvatar =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      }
    }
  }, []);

  const isActive = (path) => pathname === path;
  const userRole = user?.role || "User";

  return (
    <div className="flex min-h-screen bg-[#07090e] font-sans text-paper">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#0d111a] p-6 hidden md:flex flex-col justify-between shrink-0">
        <div>
          {/* Header Brand */}
          <div className="flex items-center gap-2.5 pb-6 border-b border-white/10">
            <span className="text-xl font-bold text-violet">✦</span>
            <div>
              <h2 className="font-display text-sm font-bold text-white">PromptWorld</h2>
              <p className="text-[10px] font-bold text-amber uppercase tracking-wider">
                {userRole} Portal
              </p>
            </div>
          </div>

          {/* USER PROFILE CARD */}
          <div className="mt-6 mb-4 p-3 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-3">
            <img
              src={user?.photoURL || aiAvatar}
              alt={user?.name || "User"}
              className="h-10 w-10 rounded-xl object-cover border border-violet/40 shrink-0"
            />
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-white truncate">
                {user?.name || "User Name"}
              </h3>
              <p className="text-[10px] text-mist truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 text-xs font-semibold">
            <span className="text-[10px] font-bold uppercase tracking-widest text-mist px-3 my-2">
              Workspace
            </span>
            <Link
              href="/dashboard"
              className={`rounded-xl px-3.5 py-2.5 transition-all ${
                isActive("/dashboard")
                  ? "bg-violet text-white font-bold shadow-lg shadow-violet/20"
                  : "text-mist hover:bg-white/5 hover:text-white"
              }`}
            >
              📊 Overview
            </Link>

            {/* Analytics & Growth Link */}
            <Link
              href="/dashboard/analytics"
              className={`rounded-xl px-3.5 py-2.5 transition-all ${
                isActive("/dashboard/analytics")
                  ? "bg-violet text-white font-bold shadow-lg shadow-violet/20"
                  : "text-mist hover:bg-white/5 hover:text-white"
              }`}
            >
              📈 Analytics & Growth
            </Link>

            <Link
              href="/dashboard/my-prompts"
              className={`rounded-xl px-3.5 py-2.5 transition-all ${
                isActive("/dashboard/my-prompts")
                  ? "bg-violet text-white font-bold shadow-lg shadow-violet/20"
                  : "text-mist hover:bg-white/5 hover:text-white"
              }`}
            >
              📂 My Prompts
            </Link>
            <Link
              href="/dashboard/profile"
              className={`rounded-xl px-3.5 py-2.5 transition-all ${
                isActive("/dashboard/profile")
                  ? "bg-violet text-white font-bold shadow-lg shadow-violet/20"
                  : "text-mist hover:bg-white/5 hover:text-white"
              }`}
            >
              👤 My Profile
            </Link>

            {/* Creator Links */}
            {(userRole.toLowerCase() === "creator" || userRole.toLowerCase() === "admin") && (
              <>
                <span className="text-[10px] font-bold uppercase tracking-widest text-mist px-3 my-2 mt-4">
                  Creator Suite
                </span>
                <Link
                  href="/dashboard/add-prompt"
                  className={`rounded-xl px-3.5 py-2.5 transition-all ${
                    isActive("/dashboard/add-prompt")
                      ? "bg-violet text-white font-bold shadow-lg shadow-violet/20"
                      : "text-mist hover:bg-white/5 hover:text-white"
                  }`}
                >
                  ✦ Add New Prompt
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Footer Back Link */}
        <div className="border-t border-white/10 pt-4">
          <Link
            href="/"
            className="block text-center rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold text-mist hover:text-white hover:bg-white/10 transition-all"
          >
            ← Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>

    </div>
  );
}