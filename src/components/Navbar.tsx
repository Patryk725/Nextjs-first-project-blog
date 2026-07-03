import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import Link from "./ui/Link";

type NavLink = {
  label: string;
  href: string;
};

type NavProps = {
  sticky?: boolean;
  navLink?: NavLink[];
};

const defaultLinks: NavLink[] = [
  { label: "Strona główna", href: "/" },
  { label: "Kontakt", href: "/about" },
  { label: "Dodatkowe info o stronie", href: "/info" },
  { label: "O mnie", href: "/about-me" },
];

export default function Navbar({
  sticky = false,
  navLink = defaultLinks,
}: NavProps) {
  const pathname: string = usePathname();
  return (
    <nav className={clsx(sticky && "sticky top-0")}>
      <div>{/* <Image /> */}</div>
      <div>
        <ul className="flex flex-wrap gap-6">
          {navLink.map((e) => (
            <li
              key={e.label}
              className={clsx("item", pathname == e.href && "active")}
            >
              <Link href={e.href}>{e.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
