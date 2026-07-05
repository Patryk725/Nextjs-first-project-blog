"use client";
import { usePathname } from "next/navigation";
import { IoHome } from "react-icons/io5";
import Link from "./Link";

export default function Breadcrumbs({
  separator = "/",
}: {
  separator?: string | React.ReactElement;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex flex-wrap items-center gap-2">
      <IoHome size={20} />
      <Link href="/">Strona główna</Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        return (
          <span key={href} className="flex items-center gap-2">
            {separator}
            <Link href={href}>{seg}</Link>
          </span>
        );
      })}
    </nav>
  );
}
