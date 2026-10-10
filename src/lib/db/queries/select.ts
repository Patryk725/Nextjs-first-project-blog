import { db } from "@/lib/db";
import { blogs, ratings } from "@/lib/db/schema";
import { asc, avg, count, desc, eq, getTableColumns, sql } from "drizzle-orm";
import "server-only";

const blogPreview = {
  ...getTableColumns(blogs),
  content: sql<string>`left(${blogs.content}, 200)`,
};

export async function getLatestBlogs(limit = 9) {
  return db
    .select(blogPreview)
    .from(blogs)
    .orderBy(desc(blogs.createdAt))
    .limit(limit);
}

export async function getOldestBlogs(limit = 9) {
  return db
    .select(blogPreview)
    .from(blogs)
    .orderBy(asc(blogs.createdAt))
    .limit(limit);
}

export async function getTopRatedBlogs(limit = 9) {
  const avgRating = avg(ratings.rating);

  return db
    .select({ ...blogPreview, avgRating, ratingsCount: count(ratings.id) })
    .from(blogs)
    .leftJoin(ratings, eq(ratings.blogId, blogs.id))
    .groupBy(blogs.id)
    .orderBy(sql`${avgRating} desc nulls last`, desc(blogs.createdAt))
    .limit(limit);
}
