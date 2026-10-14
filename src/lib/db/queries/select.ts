import { db } from "@/lib/db";
import { blogs, ratings } from "@/lib/db/schema";
import { asc, avg, count, desc, eq, getTableColumns, sql } from "drizzle-orm";
import "server-only";
import { user } from "../../../../auth-schema";

const avgRating = avg(ratings.rating);

const blogPreview = {
  ...getTableColumns(blogs),
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
      authorName: user.name,
      authorImage: user.image,
    })
    .from(blogs)
    .innerJoin(user, eq(user.id, blogs.userId))
    .leftJoin(ratings, eq(ratings.blogId, blogs.id))
    .where(eq(blogs.id, id))
    .groupBy(blogs.id, user.id)
    .limit(1);
  return blog;
}

export async function getBlogsByUser(userId: string) {
  return db
    .select(blogPreview)
    .from(blogs)
    .leftJoin(ratings, eq(ratings.blogId, blogs.id))
    .where(eq(blogs.userId, userId))
    .groupBy(blogs.id)
    .orderBy(desc(blogs.createdAt));
}

export async function getRatingsByUser(userId: string) {
  return db
    .select({
      id: ratings.id,
      rating: ratings.rating,
      blogId: blogs.id,
      blogTitle: blogs.title,
    })
    .from(ratings)
    .innerJoin(blogs, eq(blogs.id, ratings.blogId))
    .where(eq(ratings.userId, userId))
    .orderBy(desc(blogs.createdAt));
}
