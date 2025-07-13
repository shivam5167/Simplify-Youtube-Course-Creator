import { headers } from "next/headers";
import { cache } from "react";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/drizzle/db";
import * as schema from "@/drizzle/schema";
import { users } from "@/drizzle/schema";
import { env } from "@/env/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: users,
    },
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    generateId: false,
  },
  plugins: [nextCookies()],
});

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export const cachedAuthSession = cache(async (headers: Headers) => {
  const session = await auth.api.getSession({
    headers,
  });

  return session;
});
