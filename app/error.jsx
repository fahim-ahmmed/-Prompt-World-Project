"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Route Execution Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#07090e] px-4 text-center text-white">
      <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0d111a] p-8 shadow-2xl">
        <span className="text-4xl">⚠️</span>
        <h2 className="mt-4 font-display text-xl font-bold text-white">
          Application Error Encountered
        </h2>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          An issue occurred while rendering this component or fetching data.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 w-full rounded-xl bg-violet py-3 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}