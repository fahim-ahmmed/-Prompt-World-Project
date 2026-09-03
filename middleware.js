import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic check only - it confirms a session cookie EXISTS, not that it's
// still valid. Real role/permission checks still happen server-side (the
// Express middleware in server/src/middleware) on every protected request.
// This just keeps a logged-out visitor from ever seeing a private route flash
// on screen before redirecting.
export function middleware(request) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/prompts/:path*", "/payment/:path*"],
};
