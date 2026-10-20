"use server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { blogs, newRatingSchema, ratings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type RatingFormState = { message?: string } | undefined;

export async function rateBlog(
  blogId: string,
  prev: RatingFormState,
  formData: FormData,
): Promise<RatingFormState> {
  const { user } = await verifySession();

  const parsed = newRatingSchema.pick({ rating: true }).safeParse({
    rating: Number(formData.get("rating")),
  });
  if (!parsed.success) return { message: "Nieprawidłowa ocena" };

  const [blog] = await db
    .select({ userId: blogs.userId })
    .from(blogs)
    .where(eq(blogs.id, blogId))
    .limit(1);
  if (!blog) return { message: "Wpis nie istnieje" };
  if (blog.userId === user.id)
    return { message: "Nie możesz ocenić własnego wpisu" };

  try {
    await db
      .insert(ratings)
      .values({ blogId, userId: user.id, rating: parsed.data.rating })
      .onConflictDoUpdate({
        target: [ratings.userId, ratings.blogId],
        set: { rating: parsed.data.rating },
      });
  } catch {
    return { message: "Nie udało się zapisać oceny" };
  }

  revalidatePath(`/blog/${blogId}`);
  revalidatePath("/account/ratings");
  return { message: "Ocena zapisana" };
}
