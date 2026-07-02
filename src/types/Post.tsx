import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type Post = z.infer<typeof postSchema>;
