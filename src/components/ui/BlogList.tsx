import {
  getLatestBlogs,
  getOldestBlogs,
  getTopRatedBlogs,
} from "@/lib/db/queries/select";
import Image from "next/image";

type BlogsListProps = { sortBy: "latest" | "oldest" | "review" };

export async function BlogsList({ sortBy }: BlogsListProps) {
  const blogs =
    sortBy === "latest"
      ? await getLatestBlogs()
      : sortBy === "oldest"
        ? await getOldestBlogs()
        : await getTopRatedBlogs();
  console.log(blogs.map(b => ({ title: b.title, imageUrl: b.imageUrl })));

  if (!blogs.length) return <p>Brak wpisów</p>;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map(blog => (
        <li key={blog.id} className="flex flex-col gap-2">
          {blog.imageUrl && (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={400}
              height={250}
            />
          )}
          <h3>{blog.title}</h3>
          <span>{blog.category}</span>
        </li>
      ))}
    </ul>
  );
}
