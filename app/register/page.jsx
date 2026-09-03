"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed!");
      }

      // LocalStorage-এ টোকেন ও ইউজার ডেটা সেভ করা
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Success Toast Notification
      toast.success("🎉 Account created successfully!");
      
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      // Error Toast Notification
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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