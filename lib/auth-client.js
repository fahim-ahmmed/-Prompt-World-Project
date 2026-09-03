"use client";

import { createAuthClient } from "better-auth/react";

// No baseURL needed: every /api/auth/* call goes to the app's OWN origin,
// and next.config.mjs proxies it to the Express server from there.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
