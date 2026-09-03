"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center px-6 text-center font-sans text-paper">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-violet/10 border border-violet/30 shadow-2xl">
        <span className="text-4xl text-violet font-black">404</span>
      </div>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-white md:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-xs md:text-sm text-mist max-w-md leading-relaxed">
        The prompt route or page you are looking for doesn't exist or has been moved to another location.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-xl bg-violet px-6 py-3 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all"
        >
          Back to Home
        </Link>
        <Link
          href="/all-prompts"
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition-all"
        >
          Explore Prompts
        </Link>
      </div>
    </div>
  );
}