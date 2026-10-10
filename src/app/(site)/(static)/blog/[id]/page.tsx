import { Rating } from "@/components/ui/Rating";
import { getBlogById } from "@/lib/db/queries/select";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) notFound();

  return (
    <article className="bg-background-hover flex flex-col gap-4 p-8">
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
      <p className="whitespace-pre-line">{blog.content}</p>
    </article>
  );
}
