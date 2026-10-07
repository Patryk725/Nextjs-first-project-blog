import { db } from "@/lib/db";
import { desc } from "drizzle-orm";
import "server-only";
import { blogs } from "../schema";

export async function getLatestBlogs(limit = 9) {
  return db.select().from(blogs).orderBy(desc(blogs.createdAt)).limit(limit);
}
