import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "../../../auth-schema";

z.config(z.locales.pl());

// const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle";
// const pool = postgres(connectionString, { max: 1 });

// export const db = drizzle(pool);

// * MY tables

export const categories = pgEnum("blog_category", [
  "programming",
  "cooking",
  "fitness",
  "other",
]);

export const blogs = pgTable(
  "blogs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    category: categories("category").notNull(),
    imageUrl: text("image_url"),
    imageKey: text("image_key"),
  },
  table => [
    index("blogs_category_created_idx").on(
      table.category,
      table.createdAt.desc(),
    ),
    index("blogs_user_idx").on(table.userId),
  ],
);

export const newBlogSchema = createInsertSchema(blogs, {
  title: schema => schema.trim().min(3).max(100),
  content: schema => schema.trim().min(3),
  imageUrl: z.url({ protocol: /^https$/, hostname: /\.ufs\.sh$/ }).optional(),
  imageKey: schema => schema.min(1),
}).omit({ id: true, userId: true, createdAt: true });

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;

export const ratings = pgTable(
  "ratings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    blogId: text("blogId")
      .notNull()
      .references(() => blogs.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
  },
  table => [unique("ratings_user_blog_unique").on(table.userId, table.blogId)],
);

export const newRatingSchema = createInsertSchema(ratings, {
  rating: schema => schema.int().min(1).max(10),
}).omit({ id: true, userId: true });
