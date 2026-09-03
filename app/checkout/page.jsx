"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/payments/success`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            transactionId: "TXN_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            amount: 5,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // LocalStorage এ ইউজারের সাবস্ক্রিপশন আপডেট
        const updatedUser = { ...user, subscription: "Premium" };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("🎉 Congratulations! Your Account is now Upgraded to Premium.");
        router.push("/all-prompts");
        router.refresh();
      } else {
        alert(data.message || "Payment Failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Payment processing failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] py-16 px-6 font-sans text-paper flex items-center justify-center">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0d111a] p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center">
          <span className="rounded-full border border-amber/30 bg-amber/10 px-3.5 py-1 text-[11px] font-bold text-amber uppercase tracking-wider">
            One-Time Access Pass
          </span>
          <h1 className="mt-4 font-display text-2xl font-black text-white">
            Upgrade to Pro Creator Access
          </h1>
          <p className="mt-2 text-xs text-mist">
            Unlock all private/premium prompts, remove copy restrictions, and get priority prompt approval.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="mt-6 rounded-2xl border border-violet/30 bg-violet/10 p-5 text-center">
          <span className="text-xs text-violet font-semibold">Total Amount</span>
          <div className="mt-1 font-display text-4xl font-black text-white">
            $5.00 <span className="text-xs font-normal text-mist">USD / Lifetime</span>
          </div>
        </div>

        {/* Dummy Payment Form */}
        <form onSubmit={handlePayment} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              required
              defaultValue={user?.name || ""}
              placeholder="Shihab Ahmmed"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-white mb-1">
              Card Number (Stripe Card)
            </label>
            <input
              type="text"
              required
              maxLength={19}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242 •••• •••• 4242"
              className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-white mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase text-white mb-1">
                CVC Code
              </label>
              <input
                type="text"
                required
                maxLength={4}
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#07090e] p-3 text-xs text-white focus:border-violet focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet py-3.5 text-xs font-bold text-white shadow-lg shadow-violet/25 hover:bg-violet/90 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Processing Payment..." : "Pay $5.00 & Upgrade"}
          </button>
        </form>

      </div>
    </div>
  );
}