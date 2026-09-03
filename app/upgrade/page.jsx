"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UpgradePage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState("card"); // 'card' | 'paypal' | 'bkash'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Card Form State
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  // Mobile Banking State
  const [mobileNumber, setMobileNumber] = useState("");
  const [trxId, setTrxId] = useState("");

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAutofillCard = () => {
    setCardData({
      number: "4242 4242 4242 4242",
      expiry: "12/28",
      cvc: "123",
    });
    setError("");
  };

  // Execute Payment without alerts / redirects directly
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (selectedMethod === "card") {
      if (!cardData.number || cardData.number.replace(/\s/g, "").length < 16) {
        setError("Please enter a valid 16-digit card number.");
        return;
      }
    } else if (selectedMethod === "bkash") {
      if (!mobileNumber || !trxId) {
        setError("Please enter both your mobile number and Transaction ID.");
        return;
      }
    }

    processSuccess();
  };

  const processSuccess = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 700);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06080e] px-4 py-12 font-sans text-white">
      <div className="w-full max-w-5xl">
        
        {/* Top Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-[#0d131f] text-cyan-400 shadow-xl shadow-cyan-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5"
              />
            </svg>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Upgrade Your Account
          </h1>
          <p className="mt-2 text-xs font-medium text-slate-400">
            Unlock premium prompt engineering templates and advanced AI assets
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Summary Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-[#0b0f19] p-8 shadow-2xl">
            <div>
              <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                LIFETIME PLAN
              </span>

              <h2 className="mt-4 font-display text-2xl font-bold text-white">
                PromptWorld Pro Access
              </h2>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-black text-white">$5.00</span>
                <span className="text-xs font-medium text-slate-400">/ one-time payment</span>
              </div>

              <ul className="mt-8 flex flex-col gap-3.5 text-xs font-medium text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-[10px] font-bold text-emerald-400">
                    ✓
                  </span>
                  Unlock all locked Private & Premium prompts
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-[10px] font-bold text-emerald-400">
                    ✓
                  </span>
                  Unlimited copy-to-clipboard actions
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-[10px] font-bold text-emerald-400">
                    ✓
                  </span>
                  Engage with rating and feedback reviews
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-[10px] font-bold text-emerald-400">
                    ✓
                  </span>
                  Priority access to future AI models
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/80 text-[10px] font-bold text-emerald-400">
                    ✓
                  </span>
                  Lifetime ownership with Gold Creator Badge
                </li>
              </ul>
            </div>

            <div className="mt-10 border-t border-slate-800/60 pt-4 text-[11px] font-medium text-slate-500 flex items-center gap-2">
              <span>🛡</span> Payments secured and encrypted via 256-bit SSL.
            </div>
          </div>

          {/* Right Payment Methods Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-[#0b0f19] p-8 shadow-2xl">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Select Payment Method
              </h3>

              {/* Payment Method Tabs */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod("card");
                    setError("");
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-3.5 transition-all ${
                    selectedMethod === "card"
                      ? "border-violet-500 bg-violet-950/30 text-white shadow-lg shadow-violet-500/10"
                      : "border-slate-800/80 bg-[#06080e] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className="text-base">💳</span>
                  <span className="mt-1 text-[11px] font-bold">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod("paypal");
                    setError("");
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-3.5 transition-all ${
                    selectedMethod === "paypal"
                      ? "border-violet-500 bg-violet-950/30 text-white shadow-lg shadow-violet-500/10"
                      : "border-slate-800/80 bg-[#06080e] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className="text-base">🅿️</span>
                  <span className="mt-1 text-[11px] font-bold">PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedMethod("bkash");
                    setError("");
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-3.5 transition-all ${
                    selectedMethod === "bkash"
                      ? "border-violet-500 bg-violet-950/30 text-white shadow-lg shadow-violet-500/10"
                      : "border-slate-800/80 bg-[#06080e] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span className="text-base">📱</span>
                  <span className="mt-1 text-[11px] font-bold">bKash / Nagad</span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-5 rounded-xl border border-red-900/50 bg-red-950/40 p-3 text-xs font-semibold text-red-400">
                  {error}
                </div>
              )}

              {/* 1. Credit Card Form */}
              {selectedMethod === "card" && (
                <form onSubmit={handlePaymentSubmit} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="number"
                        maxLength={19}
                        value={cardData.number}
                        onChange={handleCardChange}
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-xl border border-slate-800 bg-[#06080e] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleAutofillCard}
                        className="absolute right-2 top-2 rounded-lg border border-emerald-500/40 bg-emerald-950/60 px-2.5 py-1 text-[10px] font-bold text-emerald-400 hover:bg-emerald-900/40 transition-all"
                      >
                        Autofill ❯
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="12/28"
                        className="w-full rounded-xl border border-slate-800 bg-[#06080e] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        maxLength={4}
                        value={cardData.cvc}
                        onChange={handleCardChange}
                        placeholder="123"
                        className="w-full rounded-xl border border-slate-800 bg-[#06080e] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 w-full rounded-xl bg-violet-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-500 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Pay One-time $5.00"}
                  </button>
                </form>
              )}

              {/* 2. PayPal Gateway Option */}
              {selectedMethod === "paypal" && (
                <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-[#06080e] p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-2xl text-blue-400">
                    🅿️
                  </div>
                  <h4 className="mt-3 font-display text-sm font-bold text-white">
                    Fast & Secure Checkout with PayPal
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">
                    You will be redirected to PayPal to complete your $5.00 purchase.
                  </p>
                  <button
                    type="button"
                    onClick={processSuccess}
                    disabled={loading}
                    className="mt-6 w-full rounded-xl bg-[#0070ba] py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-[#005ea6] active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    {loading ? "Redirecting to PayPal..." : "Continue to PayPal ($5.00)"}
                  </button>
                </div>
              )}

              {/* 3. bKash / Nagad Option */}
              {selectedMethod === "bkash" && (
                <form onSubmit={handlePaymentSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="rounded-xl border border-pink-500/30 bg-pink-950/20 p-4 text-xs text-pink-200">
                    <p className="font-bold">bKash Merchant / Personal Cash Out:</p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Send <strong>550 BDT</strong> ($5 equivalent) to <strong>017XXXXXXXX</strong> and enter your TrxID below.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      bKash / Nagad Account Number
                    </label>
                    <input
                      type="text"
                      maxLength={11}
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                        setError("");
                      }}
                      placeholder="01700000000"
                      className="w-full rounded-xl border border-slate-800 bg-[#06080e] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Transaction ID (TrxID)
                    </label>
                    <input
                      type="text"
                      value={trxId}
                      onChange={(e) => {
                        setTrxId(e.target.value);
                        setError("");
                      }}
                      placeholder="e.g. BAX8923KL"
                      className="w-full rounded-xl border border-slate-800 bg-[#06080e] px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:border-violet-500 focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-xl bg-pink-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-pink-600/30 hover:bg-pink-500 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Confirm bKash Payment"}
                  </button>
                </form>
              )}

              {/* Stripe Sandbox Simulation */}
              <div className="mt-8 rounded-xl border border-dashed border-slate-800 bg-[#080c14] p-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  SANDBOX SIMULATION
                </span>
                <p className="mt-1 text-[11px] text-slate-400">
                  Testing local setup without active payment keys? Click below to instantly complete.
                </p>
                <button
                  type="button"
                  onClick={processSuccess}
                  disabled={loading}
                  className="mt-3 w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  Simulate Instant $5 Checkout
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/dashboard" className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">
                ← Back to Dashboard
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}