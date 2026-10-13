import { drizzle } from "drizzle-orm/postgres-js";

const createDb = () =>
  drizzle({
    connection: process.env.DATABASE_URL,
    casing: "snake_case",
  });

const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof createDb>;
};

export const db = globalForDb.db ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb.db = db;
