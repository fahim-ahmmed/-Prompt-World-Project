"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const cleanUrl = backendUrl.replace(/\/$/, "");

      const res = await fetch(`${cleanUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned an invalid response. Please check backend connection."
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password!");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChange"));

      // 🚀 লগইন সফল হওয়ামাত্র সরাসরি হোম পেজে (/) পাঠাবে
      router.push("/");
      router.refresh();
    } catch (err) {
      let errorMessage = err.message;
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        errorMessage =
          "Cannot connect to server! Ensure backend is deployed and running.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // ব্যাকএন্ডে Google OAuth সেটআপ থাকলে এই লিংকে রিডাইরেক্ট হবে
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const cleanUrl = backendUrl.replace(/\/$/, "");
    window.location.href = `${cleanUrl}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#07090e] py-16 px-6 font-sans text-paper flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl">
        <div className="text-center">
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1 text-[11px] font-bold text-violet uppercase tracking-wider">
            Welcome Back
          </span>
          <h1 className="mt-4 font-display text-2xl font-black text-white">
            Log In to Account
          </h1>
          <p className="mt-1 text-xs text-mist">
            Access your saved prompts and creator dashboard.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-400">
            {error}
          </div>
        )}

        {/* 🚀 GOOGLE LOGIN BUTTON */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.6-.8-1-1.8-1-3z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 22.3 12 23z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* DIVIDER */}
        <div className="my-6 flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[10px] font-bold uppercase text-mist">OR</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet py-3.5 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all mt-2 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-mist">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-violet hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}