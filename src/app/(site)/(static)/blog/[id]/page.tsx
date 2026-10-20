import UpsertRatingForm from "@/components/ui/forms/review/upsert";
import { Rating } from "@/components/ui/Review";
import { auth } from "@/lib/auth";
import { getBlogById } from "@/lib/db/queries/select";
import DOMPurify from "isomorphic-dompurify";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) notFound();

  return (
    <article className="bg-background-hover flex flex-col gap-4 rounded-sm p-8">
      {blog.imageUrl && (
        <div className="relative aspect-8/5 w-full overflow-hidden rounded-sm">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span className="text-foreground-hover">{blog.category}</span>
        <Rating avgRating={blog.avgRating} ratingsCount={blog.ratingsCount} />
      </div>
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      {/* <p className="whitespace-pre-line">{blog.content}</p> */}
      <div
        className="prose dark:prose-invert max-w-none [--tw-prose-bullets:var(--foreground)] [--tw-prose-invert-bullets:var(--foreground)]"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
      />
      <hr />
      <div className="flex items-center justify-end gap-2 text-sm">
        {blog.authorImage && (
          <Image
            src={blog.authorImage}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span>{blog.authorName}</span>
      </div>
      {session && session.user.id !== blog.userId && (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Oceń wpis</h2>
          <UpsertRatingForm blogId={blog.id} />
        </div>
      )}
    </article>
  );
}
