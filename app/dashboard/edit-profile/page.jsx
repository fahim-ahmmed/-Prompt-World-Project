"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; // আপনার authClient-এর সঠিক পাথ নিশ্চিত করুন

export default function EditProfilePage() {
  const router = useRouter();
  const session = authClient.useSession(); // বর্তমান ইউজার সেশন

  const [formData, setFormData] = useState({
    name: session.data?.user?.name || "",
    email: session.data?.user?.email || "",
    photoURL: session.data?.user?.image || session.data?.user?.photoURL || "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Better Auth-এর মাধ্যমে নাম এবং ছবি আপডেট করা
      const { error: updateError } = await authClient.updateUser({
        name: formData.name,
        image: formData.photoURL,
      });

      if (updateError) {
        throw new Error(updateError.message || "Failed to update profile");
      }

      // আপডেট সফল হলে ড্যাশবোর্ডে রিডাইরেক্ট এবং পেজ রিফ্রেশ
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong while updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-[#07090e] px-4 py-12 text-paper">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Edit Profile</h1>
            <p className="mt-1 text-xs text-mist">Update your personal account settings</p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-mist hover:text-white"
          >
            Cancel
          </Link>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
          
          {/* Avatar Preview */}
          <div className="flex items-center gap-4">
            <img
              src={formData.photoURL || "https://avatar.iran.liara.run/public"}
              alt="Avatar Preview"
              className="h-16 w-16 rounded-2xl border-2 border-violet/40 object-cover"
            />
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-mist">
                Photo URL
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-white/10 bg-[#07090e] px-4 py-2.5 text-xs text-paper placeholder:text-mist/40 focus:border-violet focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#07090e] px-4 py-3 text-xs text-paper focus:border-violet focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mist">
              Email Address (Read Only)
            </label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-xs text-mist/60 cursor-not-allowed"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-violet py-3.5 text-xs font-semibold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </Button>

        </form>

      </div>
    </div>
  );
}