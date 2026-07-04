import { clsx } from "clsx";
import Image from "next/image";
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
    <nav className={clsx(sticky && "sticky top-0", "")}>
      <div className="my-4 flex flex-wrap items-center justify-around gap-x-12 gap-y-6">
        <div>
          <div className="p-4">
            <Image src="/logo.png" alt="logo" width={336 / 2} height={90 / 2} />
          </div>
        </div>
        <div>
          <ul className="flex flex-col flex-wrap gap-6 md:flex-row">
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
      </div>
    </nav>
  );
}
