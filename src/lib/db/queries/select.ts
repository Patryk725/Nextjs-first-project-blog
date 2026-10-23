import { db } from "@/lib/db";
import { blogs, categories, ratings } from "@/lib/db/schema";
import {
  and,
  asc,
  avg,
  count,
  desc,
  eq,
  getTableColumns,
  ilike,
  sql,
} from "drizzle-orm";
import "server-only";
import { user } from "../../../../auth-schema";

const ARTICLE_PER_PAGE = 3;

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

const blogOrder = {
  latest: [desc(blogs.createdAt), desc(blogs.id)],
  oldest: [asc(blogs.createdAt), asc(blogs.id)],
  review: [
    sql`${avgRating} desc nulls last`,
    desc(blogs.createdAt),
    desc(blogs.id),
  ],
};

type BlogFilters = {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  userId?: string;
};

export async function getBlogs({
  q,
  category,
  sort,
  page = 1,
  userId,
}: BlogFilters) {
  const validCategory = categories.enumValues.find(c => c === category);
  const order = blogOrder[sort as keyof typeof blogOrder] ?? blogOrder.latest;

  const where = and(
    q ? ilike(blogs.title, `%${q}%`) : undefined,
    validCategory ? eq(blogs.category, validCategory) : undefined,
    userId ? eq(blogs.userId, userId) : undefined,
  );

  const [items, [{ total }]] = await Promise.all([
    db
      .select(blogPreview)
      .from(blogs)
      .leftJoin(ratings, eq(ratings.blogId, blogs.id))
      .where(where)
      .groupBy(blogs.id)
      .orderBy(...order)
      .limit(ARTICLE_PER_PAGE)
      .offset((page - 1) * ARTICLE_PER_PAGE),
    db.select({ total: count() }).from(blogs).where(where),
  ]);

  return { blogs: items, totalPages: Math.ceil(total / ARTICLE_PER_PAGE) };
}

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

type RatingFilters = { userId: string; q?: string; page?: number };

export async function getRatingsByUser({ userId, q, page = 1 }: RatingFilters) {
  const where = and(
    eq(ratings.userId, userId),
    q ? ilike(blogs.title, `%${q}%`) : undefined,
  );

  const [items, [{ total }]] = await Promise.all([
    db
      .select({
        id: ratings.id,
        rating: ratings.rating,
        blogId: blogs.id,
        blogTitle: blogs.title,
      })
      .from(ratings)
      .innerJoin(blogs, eq(blogs.id, ratings.blogId))
      .where(where)
      .orderBy(desc(blogs.createdAt), desc(ratings.id))
      .limit(ARTICLE_PER_PAGE)
      .offset((page - 1) * ARTICLE_PER_PAGE),
    db
      .select({ total: count() })
      .from(ratings)
      .innerJoin(blogs, eq(blogs.id, ratings.blogId))
      .where(where),
  ]);

  return { ratings: items, totalPages: Math.ceil(total / ARTICLE_PER_PAGE) };
}
