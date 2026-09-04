import { NextResponse } from "next/server";

export function middleware(request) {
  // Client-side authentication (localStorage) ব্যবহারের জন্য মিডলওয়্যার রিডাইরেক্ট বাইপাস করা হলো
  return NextResponse.next();
}

export const config = {
  matcher: [], // কোনো রুটে মিডলওয়্যার চেক চলবে না
};