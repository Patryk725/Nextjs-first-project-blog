"use server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { newRatingSchema, ratings } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import z from "zod";
import { blogs, newBlogSchema } from "../schema";
import { BlogFormState } from "./insert";

export async function updateRating(id: string, formData: FormData) {
  const { user } = await verifySession();

  const parsed = newRatingSchema.pick({ rating: true }).safeParse({
    rating: Number(formData.get("rating")),
  });
  if (!parsed.success) return;

  await db
    .update(ratings)
    .set({ rating: parsed.data.rating })
    .where(and(eq(ratings.id, id), eq(ratings.userId, user.id)));

  revalidatePath("/account/ratings");
}

export async function updateBlog(
  id: string,
  prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const { user } = await verifySession();

  const parsed = newBlogSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: z.flattenError(parsed.error) };

  //* upload thing doesn't delete old photo
  const [old] = await db
    .select({ imageKey: blogs.imageKey })
    .from(blogs)
    .where(and(eq(blogs.id, id), eq(blogs.userId, user.id)))
    .limit(1);

  try {
    await db
      .update(blogs)
      .set(parsed.data)
      .where(and(eq(blogs.id, id), eq(blogs.userId, user.id)));
  } catch (error) {
    console.error(error);
    return { message: "Nie udało się zapisać zmian" };
  }

  if (
    old?.imageKey &&
    parsed.data.imageKey &&
    old.imageKey !== parsed.data.imageKey
  ) {
    await new UTApi().deleteFiles(old.imageKey);
  }

  revalidatePath("/account/blogs");
  return { message: "Zmiany zapisane" };
}
