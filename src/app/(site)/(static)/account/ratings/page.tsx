import DefaultButton from "@/components/ui/Button/DefaultButton";
import { verifySession } from "@/lib/dal";
import { deleteRating } from "@/lib/db/queries/delete";
import { getRatingsByUser } from "@/lib/db/queries/select";
import { RateBlog } from "@/lib/db/queries/upsert";
import Link from "next/link";
import { IoSaveOutline, IoTrashOutline } from "react-icons/io5";

export default async function Page() {
  const { user } = await verifySession();
  const userRatings = await getRatingsByUser(user.id);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Moje oceny</h2>

      {!userRatings.length && <p>Nie oceniłeś jeszcze żadnego wpisu</p>}

      <ul className="flex flex-col gap-3">
        {userRatings.map(r => (
          <li
            key={r.id}
            className="flex items-center justify-between gap-4 rounded-sm border p-4"
          >
            <Link href={`/blog/${r.blogId}`} className="font-bold">
              {r.blogTitle}
            </Link>
            <div className="flex gap-2">
              <form action={RateBlog.bind(null, r.id)} className="flex gap-2">
                <select name="rating" defaultValue={r.rating}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <DefaultButton type="submit" iconStart={<IoSaveOutline />}>
                  Zapisz
                </DefaultButton>
              </form>
              <form action={deleteRating.bind(null, r.id)}>
                <DefaultButton type="submit" iconStart={<IoTrashOutline />}>
                  Usuń
                </DefaultButton>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
