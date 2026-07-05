"use client";
import { usePathname } from "next/navigation";
import { IoHome } from "react-icons/io5";
import Link from "./Link";

const LABELS: { [key: string]: string } = {
  "about-me": "O mnie",
  "about-app": "O stronie",
};

function handleLabel(slug: string) {
  return (
    LABELS[slug] ??
    slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())
  );
}

export default function Breadcrumbs({
  separator = "/",
}: {
  separator?: string | React.ReactElement;
}) {
  const pathname = usePathname();
  if (pathname === "/") return null; //* no breadcrumbs on homepage
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="border-foreground-hover flex w-full flex-wrap items-center gap-2 rounded-xl border px-3 py-2">
      <IoHome size={20} />
      <Link href="/">Strona główna</Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        return (
          <span key={href} className="flex items-center gap-2">
            {separator}
            <Link href={href}>{handleLabel(seg)}</Link>
          </span>
        );
      })}
    </nav>
  );
}
