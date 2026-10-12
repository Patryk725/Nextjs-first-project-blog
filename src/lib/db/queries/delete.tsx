"use server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { blogs, ratings } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

export async function deleteBlog(id: string) {
  const { user } = await verifySession();

  const [deleted] = await db
    .delete(blogs)
    .where(and(eq(blogs.id, id), eq(blogs.userId, user.id)))
    .returning();

  if (deleted?.imageKey) await new UTApi().deleteFiles(deleted.imageKey);

  revalidatePath("/account/blogs");
}

export async function deleteRating(id: string) {
  const { user } = await verifySession();
  await db
    .delete(ratings)
    .where(and(eq(ratings.id, id), eq(ratings.userId, user.id)));
  revalidatePath("/account/ratings");
}
