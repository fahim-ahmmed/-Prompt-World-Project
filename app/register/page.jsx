"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    role: "creator", // ডিফল্ট Creator
  });
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

      const res = await fetch(`${cleanUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned an invalid response. Please check backend connection."
        );
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed!");
      }

      // LocalStorage-এ টোকেন ও ইউজার ডেটা সেভ করা
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🚀 Navbar ও পুরো অ্যাপকে আপডেট করতে Custom Event
      window.dispatchEvent(new Event("authChange"));

      // 🚀 ড্যাশবোর্ডে রিডাইরেক্ট
      router.push("/dashboard");
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
            Join Platform
          </span>
          <h1 className="mt-4 font-display text-2xl font-black text-white">
            Create an Account
          </h1>
          <p className="mt-1 text-xs text-mist">
            Choose your account type and start managing AI prompts.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs text-red-400">
            {error}
          </div>
        )}

        {/* 🚀 GOOGLE REGISTER BUTTON */}
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
            Sign up with Google
          </button>
        </div>

        {/* DIVIDER */}
        <div className="my-6 flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[10px] font-bold uppercase text-mist">OR</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ২টি ক্লিক্যাবল সিলেকশন কার্ড (Default: Creator) */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "creator" })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  formData.role === "creator"
                    ? "border-violet bg-violet/10 text-white shadow-lg shadow-violet/10"
                    : "border-white/10 bg-[#07090e] text-mist hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Creator</span>
                  {formData.role === "creator" && (
                    <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
                  )}
                </div>
                <p className="mt-1 text-[10px] text-mist leading-tight">
                  Publish & sell AI prompts
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "user" })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  formData.role === "user"
                    ? "border-violet bg-violet/10 text-white shadow-lg shadow-violet/10"
                    : "border-white/10 bg-[#07090e] text-mist hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">User</span>
                  {formData.role === "user" && (
                    <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
                  )}
                </div>
                <p className="mt-1 text-[10px] text-mist leading-tight">
                  Explore & bookmark prompts
                </p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Shihab Ahmmed"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="user@example.com"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              value={formData.photoURL}
              onChange={(e) =>
                setFormData({ ...formData, photoURL: e.target.value })
              }
              placeholder="https://example.com/photo.jpg"
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet py-3.5 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all mt-2 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-mist">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-violet hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}