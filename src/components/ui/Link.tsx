import { clsx } from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  pathnameHighlight?: boolean;
  children: React.ReactNode;
};

const active = "";

export default function Link({
  href,
  pathnameHighlight = true,
  children,
}: Props) {
  const pathname: string = usePathname();
  const highlight = pathnameHighlight && pathname === href;
  return (
    <NextLink
      href={href}
      className={clsx(
        highlight ? "font-semibold" : "hover:underline",
        "dark:decoration-slate-300 decoration-slate-800 decoration-1",
      )}
    >
      {children}
    </NextLink>
  );
}
