import DefaultButton from "@/components/ui/Button/DefaultButton";
import { Modal } from "@/components/ui/Modal";
import { verifySession } from "@/lib/dal";
import { deleteBlog } from "@/lib/db/queries/delete";
import { getBlogsByUser } from "@/lib/db/queries/select";
import { IoAddOutline, IoCreateOutline } from "react-icons/io5";

export default async function Page() {
  const { user } = await verifySession();
  const blogs = await getBlogsByUser(user.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Moje wpisy</h2>
        <DefaultButton href="/blog/new" iconStart={<IoAddOutline />}>
          Nowy wpis
        </DefaultButton>
      </div>

      {!blogs.length && <p>Nie masz jeszcze wpisów</p>}

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
    </div>
  );
}
