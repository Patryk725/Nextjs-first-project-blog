import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../../auth-schema";
import { db } from "./db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: process.env.NODE_ENV !== "production",
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      prompt: "select_account",
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
});
