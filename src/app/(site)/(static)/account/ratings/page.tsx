import DefaultButton from "@/components/ui/Button/DefaultButton";
import UpsertRatingForm from "@/components/ui/forms/review/upsert";
import { Pagination } from "@/components/ui/Pagination";
import { Search } from "@/components/ui/Search";
import { verifySession } from "@/lib/dal";
import { deleteRating } from "@/lib/db/queries/delete";
import { getRatingsByUser } from "@/lib/db/queries/select";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";

export default async function Page(props: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { user } = await verifySession();
  const { q, page } = await props.searchParams;
  const { ratings: userRatings, totalPages } = await getRatingsByUser({
    userId: user.id,
    q,
    page: Number(page) || 1,
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Moje oceny</h2>

      <Search placeholder="Szukaj po tytule wpisu" />

      {!userRatings.length && <p>Brak ocen</p>}

      <ul className="flex flex-col gap-3">
        {userRatings.map(r => (
          <li
            key={r.id}
            className="flex items-center justify-between gap-4 rounded-sm border p-4"
          >
            <Link href={`/blog/${r.blogId}`} className="font-bold">
              {r.blogTitle}
            </Link>
            <div className="flex items-center gap-2">
              <UpsertRatingForm blogId={r.blogId} defaultRating={r.rating} />
              <form action={deleteRating.bind(null, r.id)}>
                <DefaultButton type="submit" iconStart={<IoTrashOutline />}>
                  Usuń
                </DefaultButton>
              </form>
            </div>
          </li>
        ))}
      </ul>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
