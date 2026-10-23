import { Filter } from "@/components/ui/Filter";
import { Pagination } from "@/components/ui/Pagination";
import { Rating } from "@/components/ui/Review";
import { Search } from "@/components/ui/Search";
import { getBlogs } from "@/lib/db/queries/select";
import { categories } from "@/lib/db/schema";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";

const categoryOptions = [
  { value: "", label: "Wszystkie kategorie" },
  ...categories.enumValues.map(c => ({ value: c, label: c })),
];

const sortOptions = [
  { value: "", label: "Najnowsze" },
  { value: "oldest", label: "Najstarsze" },
  { value: "review", label: "Najlepiej oceniane" },
];

const placeholder = (title: string, bg: string, fg: string) =>
  `https://placehold.co/400x250/${bg}/${fg}/webp?font=montserrat&text=${encodeURIComponent(`${title}\\n(brak zdjęcia)`)}`;

export default async function Page(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const { q, category, sort, page } = await props.searchParams;
  const { blogs, totalPages } = await getBlogs({
    q,
    category,
    sort,
    page: Number(page) || 1,
  });

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Archiwum</h1>
      <div className="flex flex-wrap gap-2">
        <Search placeholder="Szukaj po tytule" />
        <Filter name="category" label="Kategoria" options={categoryOptions} />
        <Filter name="sort" label="Sortowanie" options={sortOptions} />
      </div>

      {!blogs.length && <p>Brak wpisów</p>}

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

      <Pagination totalPages={totalPages} />
    </section>
  );
}
