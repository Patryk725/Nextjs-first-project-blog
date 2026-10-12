"use server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { newRatingSchema, ratings } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
