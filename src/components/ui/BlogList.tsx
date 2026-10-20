import {
  getLatestBlogs,
  getOldestBlogs,
  getTopRatedBlogs,
} from "@/lib/db/queries/select";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "./Review";

type BlogsListProps = { sortBy: "latest" | "oldest" | "review" };

export async function BlogsList({ sortBy }: BlogsListProps) {
  const blogs =
    sortBy === "latest"
      ? await getLatestBlogs()
      : sortBy === "oldest"
        ? await getOldestBlogs()
        : await getTopRatedBlogs();

  const headings: Record<BlogsListProps["sortBy"], string> = {
    latest: "Najnowsze",
    oldest: "Najstarsze",
    review: "Najlepiej oceniane",
  };

  if (!blogs.length) return <p>Brak wpisów</p>;

  const placeholder = (title: string, bg: string, fg: string) =>
    `https://placehold.co/400x250/${bg}/${fg}/webp?font=montserrat&text=${encodeURIComponent(`${title}\\n(brak zdjęcia)`)}`;

  return (
    <section className="my-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{headings[sortBy]} wpisy</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(blog => (
          <li
            key={blog.id}
            className="shadow-card row-span-4 grid grid-rows-subgrid transition-[box-shadow,translate] hover:-translate-y-2 hover:shadow-[0_16px_12px_-8px_var(--card-shadow),0_16px_12px_-8px_var(--card-shadow)]"
          >
            <Link
              href={`/blog/${blog.id}`}
              className="group row-span-4 grid grid-rows-subgrid gap-2 rounded-sm border px-2 py-4"
            >
              <div className="relative aspect-8/5 w-full overflow-hidden rounded-sm">
                {blog.imageUrl ? (
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <Image
                      src={placeholder(blog.title, "FFFFFF", "000000")}
                      alt=""
                      fill
                      sizes="600px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 dark:hidden"
                    />
                    <Image
                      src={placeholder(blog.title, "000000", "FFFFFF")}
                      alt=""
                      fill
                      sizes="600px"
                      className="hidden object-cover transition-transform duration-300 group-hover:scale-105 dark:block"
                    />
                  </>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-hover">{blog.category}</span>
                <Rating
                  avgRating={blog.avgRating}
                  ratingsCount={blog.ratingsCount}
                  stars={false}
                />
              </div>
              <h3 className="font-bold">{blog.title}</h3>
              {/* <p>{blog.content}</p> */}
              <p>
                {DOMPurify.sanitize(blog.content, { ALLOWED_TAGS: [] }).slice(
                  0,
                  200,
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
