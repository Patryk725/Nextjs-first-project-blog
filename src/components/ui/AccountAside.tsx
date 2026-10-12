"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/account/blogs", label: "Moje wpisy" },
  { href: "/account/ratings", label: "Moje oceny" },
];

export function AccountAside() {
  const pathname = usePathname();

  return (
    <aside className="border-foreground flex flex-col gap-2 rounded-sm border p-4">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(pathname === link.href && "font-semibold underline")}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
