import Image from "next/image";
import { IoOpenOutline } from "react-icons/io5";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  owner: { login: string };
};

const user = "Patryk725";

export default async function Page() {
  const starredRes = await fetch(
    `https://api.github.com/users/${user}/starred`,
    {
      next: { revalidate: 3600 },
    },
  );
  const starred: Repo[] = starredRes.ok ? await starredRes.json() : [];
  const repos = starred.filter(repo => repo.owner.login === user);

  return (
    <div className="content flex flex-col gap-12">
      <section className="flex flex-col-reverse items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <a
          href={`https://github.com/${user}`}
          rel="nofollow"
          target="_blank"
          className="flex items-center gap-2 underline hover:no-underline"
        >
          <h2 className="text-2xl">{user}</h2>
          <IoOpenOutline />
        </a>
        <Image
          src={`https://github.com/${user}.png`}
          alt={`Zdjęcie profilowe ${user}`}
          width={160}
          height={160}
          className="size-32 rounded-full select-none sm:size-40"
        />
      </section>

      <Image
        src={`https://raw.githubusercontent.com/${user}/${user}/main/banner.png`}
        alt={`Baner ${user}`}
        width={1200}
        height={400}
        sizes="100vw"
        className="h-auto w-full select-none"
      />

      {repos.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">Repozytoria</h2>
          <ul className="flex flex-col gap-2">
            {repos.map(repo => (
              <li key={repo.id}>
                <details>
                  <summary className="cursor-pointer">
                    <a
                      href={repo.html_url}
                      rel="nofollow"
                      target="_blank"
                      className="inline-flex items-center gap-2 underline hover:no-underline"
                    >
                      {repo.name}
                      <IoOpenOutline />
                    </a>
                  </summary>
                  <p className="pt-2 text-sm">
                    {repo.description ?? "Brak opisu"}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
