/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";
    return [
      {
        // Proxies EVERYTHING under /api - both Better Auth's routes and our
        // own /api/prompts routes - through the Next.js server. This keeps
        // the browser talking to a single origin, so the auth cookie set by
        // Better Auth (running on the Express server) is stored under the
        // client's own domain instead of being blocked as cross-site.
        source: "/api/:path*",
        destination: `${SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
