"use client";

import { useState } from "react";

export default function ReportModal({ isOpen, onClose, promptTitle }) {
  const [reason, setReason] = useState("Inappropriate Content");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0d111a] p-6 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
            <span>🚨</span> Report Prompt
          </h3>
          <button onClick={onClose} className="text-mist hover:text-white text-xs">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center text-xs font-bold text-emerald-400">
            ✓ Report submitted successfully. Our admin team will review it.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-xs text-mist">
              Reporting: <strong className="text-white">{promptTitle}</strong>
            </p>

            <div>
              <label className="block text-[11px] font-bold text-white uppercase mb-1">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:outline-none"
              >
                <option value="Inappropriate Content">Inappropriate Content</option>
                <option value="Spam / Misleading">Spam / Misleading</option>
                <option value="Copyright Violation">Copyright Violation</option>
                <option value="Broken Code">Broken Code / Fraudulent</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-white uppercase mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain why this prompt violates policies..."
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-mist hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 shadow-lg shadow-red-600/20"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}