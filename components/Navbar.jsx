"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const myImageLink = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80";
  
  // ১. প্রাথমিক অবস্থায় user স্টেট null থাকবে (যাতে শুরুতেইLogged In না দেখায়)
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ২. শুধুমাত্র Local Storage-এ ইউজার তথ্য থাকলেই কেবল স্টেট আপডেট হবে
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          ...parsed,
          photoURL: parsed.photoURL || myImageLink,
        });
      } catch (err) {
        console.error("Failed to parse user data", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [pathname]); // রাউট পরিবর্তনের সাথে সাথে চেক আপডেট হবে

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  // ৩. লগইন থাকা বা না থাকার ওপর ভিত্তি করে ডাইনামিক নেভিগেশন লিংক
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Prompts", href: "/all-prompts" },
    { name: "Categories", href: "/categories" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <header className="border-b border-white/10 bg-[#07090e]/90 backdrop-blur-md sticky top-0 z-50 font-sans text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-[18px] bg-gradient-to-tr from-violet via-purple-500/50 to-amber-300/80 p-[1.5px] shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[16.5px] bg-[#07090e]">
              <span className="text-lg text-[#9e7afe] drop-shadow-[0_0_10px_rgba(158,122,254,0.8)]">
                ✦
              </span>
            </div>
          </div>

          <span className="font-display text-xl font-bold tracking-tight flex items-center">
            <span className="text-white font-extrabold">Prompt</span>
            <span className="bg-gradient-to-r from-[#b392ff] via-[#dcae78] to-transparent bg-clip-text text-transparent opacity-80 pl-0.5">
              World
            </span>
          </span>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-all ${
                  isActive ? "text-white font-extrabold" : "text-mist hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute left-0 bottom-0 h-[2.5px] w-full rounded-full bg-violet shadow-sm shadow-violet" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* USER PROFILE & ENHANCED LOGOUT BUTTON */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* User Profile Info */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md shadow-inner">
                <img
                  src={user.photoURL || myImageLink}
                  alt={user.name || "User"}
                  className="h-8 w-8 rounded-xl object-cover border border-violet/50 shadow-md"
                />
                <span className="text-sm font-bold text-white max-w-[130px] truncate">
                  {user.name || "User"}
                </span>
              </div>

              {/* Styled Modern Logout Button */}
              <button
                onClick={handleLogout}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/10 px-4.5 py-2 text-xs font-bold text-red-400 backdrop-blur-md shadow-lg shadow-red-500/5 hover:border-red-500/50 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-300"
              >
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-violet px-5 py-2 text-sm font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}