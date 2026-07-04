"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoLogInOutline, IoPersonCircleOutline } from "react-icons/io5";
import DefaultButton from "./ui/Button/DefaultButton";
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
  { label: "O mnie", href: "/about-me" },
  { label: "O stronie", href: "/about-app" },
];

export default function Navbar({
  sticky = false,
  navLink = defaultLinks,
}: NavProps) {
  const [logged_in_test, setTest] = useState<boolean>(false);
  const handleTest = () => setTest((p) => !p);

  const pathname: string = usePathname();
  return (
    <nav className={clsx(sticky && "sticky top-0")}>
      <div className="flex flex-wrap items-center justify-around gap-x-12 gap-y-6 py-4">
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
        <div>
          <DefaultButton
            onClick={handleTest}
            iconStart={
              logged_in_test ? <IoPersonCircleOutline /> : <IoLogInOutline />
            }
          >
            {logged_in_test ? "username" : "log in"}
          </DefaultButton>
        </div>
      </div>
    </nav>
  );
}
