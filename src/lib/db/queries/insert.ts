"use server";
import { verifySession } from "@/lib/dal";
import { db } from "@/lib/db";
import { blogs, newBlogSchema } from "@/lib/db/schema";
import { z } from "zod";

type BlogInput = z.infer<typeof newBlogSchema>;

export type BlogFormState =
  | { errors?: z.core.$ZodFlattenedError<BlogInput>; message?: string }
  | undefined;

export async function createBlog(
  prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const { user } = await verifySession();

  const parsed = newBlogSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: z.flattenError(parsed.error) };

  try {
    await db.insert(blogs).values({ ...parsed.data, userId: user.id });
  } catch {
    return { message: "Nie udało się zapisać bloga" };
  }

  return { message: "Blog dodany" };
}
