"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0b0f19] py-12 text-paper shadow-2xl">
      
      {/* Background Subtle Accent Lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -left-20 top-0 h-40 w-40 rounded-full bg-violet/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-40 w-40 rounded-full bg-amber/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Column 1: Brand Info (5 cols) */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet via-amber to-amber-500 p-0.5 shadow-lg shadow-violet/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07090e]">
                  <span className="text-base font-bold text-violet">✦</span>
                </div>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Prompt<span className="bg-gradient-to-r from-violet via-amber to-amber-500 bg-clip-text text-transparent">World</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-mist">
              The premier marketplace for engineered AI prompts. Production-ready workflows tested for ChatGPT, Claude 3.5, Midjourney, and Gemini.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400">
                ● Systems Operational
              </span>
              <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-[10px] font-bold text-violet">
                v2.0 Active
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Marketplace
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs text-mist">
              <li>
                <Link href="/all-prompts" className="hover:text-violet transition-colors">
                  All Prompts
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-violet transition-colors">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link href="/submit-prompt" className="hover:text-violet transition-colors">
                  Submit a Prompt
                </Link>
              </li>
              <li>
                <Link href="/upgrade" className="font-semibold text-amber hover:underline">
                  ⚡ Pro Access ($5)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Account & Support (4 cols) */}
          <div className="md:col-span-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
              Account & Ecosystem
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-xs text-mist">
              <li>
                <Link href="/dashboard" className="hover:text-violet transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/edit-profile" className="hover:text-violet transition-colors">
                  Profile Settings
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-violet transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-violet transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-mist/80 md:flex-row">
          <p>© {new Date().getFullYear()} PromptWorld. Built with Next.js & Better Auth.</p>
          <div className="flex gap-6 text-[11px]">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}