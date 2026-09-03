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

      // Fix trailing slashes in environment variable URL
      const cleanUrl = backendUrl.replace(/\/$/, "");

      const res = await fetch(`${cleanUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Fixed: Safely verify content type before calling res.json() to prevent HTML DOCTYPE JSON errors
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned an invalid response (HTML Error Page). Please check your backend URL and MongoDB connection."
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password!");
      }

      // LocalStorage-এ টোকেন ও ইউজার ডেটা সেভ করা
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("🎉 Logged in successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      if (err.name === "TypeError" && err.message === "Failed to fetch") {
        setError(
          "Cannot connect to server! Ensure backend is deployed and running."
        );
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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