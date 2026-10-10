import { db } from "@/lib/db";
import { blogs, ratings } from "@/lib/db/schema";
import { asc, avg, count, desc, eq, getTableColumns, sql } from "drizzle-orm";
import "server-only";

const avgRating = avg(ratings.rating);

const blogPreview = {
  ...getTableColumns(blogs),
  content: sql<string>`left(${blogs.content}, 200)`,
  avgRating,
  ratingsCount: count(ratings.id),
};

export async function getLatestBlogs(limit = 9) {
  return db
    .select(blogPreview)
    .from(blogs)
    .leftJoin(ratings, eq(ratings.blogId, blogs.id))
    .groupBy(blogs.id)
    .orderBy(desc(blogs.createdAt))
    .limit(limit);
}

export async function getOldestBlogs(limit = 9) {
  return db
    .select(blogPreview)
    .from(blogs)
    .leftJoin(ratings, eq(ratings.blogId, blogs.id))
    .groupBy(blogs.id)
    .orderBy(asc(blogs.createdAt))
    .limit(limit);
}

export async function getTopRatedBlogs(limit = 9) {
  return db
    .select(blogPreview)
    .from(blogs)
    .leftJoin(ratings, eq(ratings.blogId, blogs.id))
    .groupBy(blogs.id)
    .orderBy(sql`${avgRating} desc nulls last`, desc(blogs.createdAt))
    .limit(limit);
}

// /blog/[id]
export async function getBlogById(id: string) {
  const [blog] = await db
    .select({
      ...getTableColumns(blogs),
      avgRating,
      ratingsCount: count(ratings.id),
    })
    .from(blogs)
    .leftJoin(ratings, eq(ratings.blogId, blogs.id))
    .where(eq(blogs.id, id))
    .groupBy(blogs.id)
    .limit(1);
  return blog;
}
