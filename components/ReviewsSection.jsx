"use client";

import { motion } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Full-Stack Engineer",
    comment: "The Next.js 15 architecture prompts saved our team weeks of boilerplate setup. Highly recommended!",
    rating: 5,
    avatar: "A",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "AI Art Lead",
    comment: "Midjourney v6 prompts here are unmatched in terms of lighting control and consistency.",
    rating: 5,
    avatar: "S",
  },
  {
    id: 3,
    name: "Michael Tan",
    role: "SaaS Founder",
    comment: "Upgrading to Premium was worth every penny. Access to private prompts doubled our outreach conversion.",
    rating: 5,
    avatar: "M",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-[#07090e] border-t border-white/5 font-sans">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto">
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1 text-xs font-semibold text-violet uppercase tracking-wider">
            Community Feedback
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white md:text-4xl">
            Trusted by Creators &amp; Engineers
          </h2>
          <p className="mt-2 text-xs text-mist">
            See how developers and designers build faster using our verified prompt collection.
          </p>
        </div>

        {/* Reviews Cards Grid with Framer Motion */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-[#0d111a] p-6 shadow-xl flex flex-col justify-between hover:border-violet/40 transition-all"
            >
              <div>
                <div className="flex items-center gap-1 text-amber text-xs">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="mt-4 text-xs text-mist leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="h-8 w-8 rounded-full bg-violet/20 border border-violet/50 text-violet flex items-center justify-center font-bold text-xs">
                  {rev.avatar}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">{rev.name}</h3>
                  <p className="text-[10px] text-mist">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}