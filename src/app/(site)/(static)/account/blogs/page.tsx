import DefaultButton from "@/components/ui/Button/DefaultButton";
import { Filter } from "@/components/ui/Filter";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { Search } from "@/components/ui/Search";
import { verifySession } from "@/lib/dal";
import { deleteBlog } from "@/lib/db/queries/delete";
import { getBlogs } from "@/lib/db/queries/select";
import { categories } from "@/lib/db/schema";
import { IoAddOutline, IoCreateOutline } from "react-icons/io5";

const categoryOptions = [
  { value: "", label: "Wszystkie kategorie" },
  ...categories.enumValues.map(c => ({ value: c, label: c })),
];

export default async function Page(props: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const { user } = await verifySession();
  const { q, category, page } = await props.searchParams;
  const { blogs, totalPages } = await getBlogs({
    q,
    category,
    page: Number(page) || 1,
    userId: user.id,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Moje wpisy</h2>
        <DefaultButton href="/blog/new" iconStart={<IoAddOutline />}>
          Nowy wpis
        </DefaultButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <Search placeholder="Szukaj po tytule" />
        <Filter name="category" label="Kategoria" options={categoryOptions} />
      </div>

      {!blogs.length && <p>Brak wpisów</p>}

      <ul className="flex flex-col gap-3">
        {blogs.map(blog => (
          <li
            key={blog.id}
            className="flex items-center justify-between gap-4 rounded-sm border p-4"
          >
            <div>
              <h3 className="font-bold">{blog.title}</h3>
              <span className="text-foreground-hover text-sm">
                {blog.category}
              </span>
            </div>
            <div className="flex gap-2">
              <DefaultButton
                href={`/account/blogs/${blog.id}/edit`}
                iconStart={<IoCreateOutline />}
              >
                Edytuj
              </DefaultButton>
              <Modal
                trigger="Usuń"
                message="Czy na pewno chcesz usunąć ten wpis?"
                confirmLabel="Usuń"
                action={deleteBlog.bind(null, blog.id)}
              />
            </div>
          </li>
        ))}
      </ul>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
