"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#07090e] p-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0d111a] p-8 text-center shadow-2xl">
          <span className="text-4xl">⚠️</span>
          <h2 className="mt-4 font-display text-xl font-bold text-white">
            Critical Global Error
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            An unhandled application error occurred.
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 w-full rounded-xl bg-violet px-5 py-3 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all"
          >
            Reset Application State
          </button>
        </div>
      </body>
    </html>
  );
}