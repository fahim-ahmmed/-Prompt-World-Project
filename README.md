# AI Prompt Sharing & Marketplace Platform (PromptWorld)

A modern, SaaS-grade community marketplace platform designed for creating, discovering, bookmarking, and managing AI prompts for ChatGPT, Gemini, Claude, and Midjourney.

## 🚀 Live Demo & Links
- **Live Website:** [Your Vercel Live Link]
- **Client Repository:** [Your GitHub Client Link]
- **Server Repository:** [Your GitHub Server Link]

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Framer Motion, Recharts
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Authentication
- **Payments & Deployment:** Stripe, Vercel, Render/MongoDB Atlas

## ✨ Key Features
1. **JWT & Role-Based Access Control (RBAC):** Distinct roles for User, Creator, and Admin with protected routes.
2. **Dynamic Marketplace:** Server-side search, category/tool filtering, sorting, and MongoDB aggregation.
3. **Admin Moderation Flow:** Submitted prompts stay pending until approved/rejected with feedback by admins.
4. **Stripe Payment Integration:** One-time $5 payment to unlock Pro/Private prompts and unlimited creation.
5. **Interactive Toolkit:** Copy prompt counter, bookmarking (duplicate check), reviews/ratings, and report modal.
6. **Analytics Dashboards:** Dynamic charts powered by Recharts for total copies and prompt growth.

## 📦 NPM Packages Used
`next`, `react`, `framer-motion`, `recharts`, `jsonwebtoken`, `bcryptjs`, `mongoose`, `express`, `cors`, `stripe`, `dotenv`