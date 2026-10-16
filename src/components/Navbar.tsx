"use client";

import { clsx } from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { AuthButton } from "./ui/Button/AuthButton";
import DefaultButton from "./ui/Button/DefaultButton";
import Link from "./ui/Link";

type NavLink = {
  label: string;
  href: string;
};

type NavProps = {
  sticky?: boolean;
  navLink?: NavLink[];
  className?: string;
  heroOffset?: boolean;
};

const defaultLinks: NavLink[] = [
  { label: "Strona główna", href: "/" },
  { label: "O mnie", href: "/about-me" },
  { label: "O stronie", href: "/about-app" },
];

export default function Navbar({
  sticky = false,
  navLink = defaultLinks,
  className,
}: NavProps) {
  const nav = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!nav.current) return;

    document.documentElement.style.setProperty(
      "--main-nav-height",
      `${nav.current.getBoundingClientRect().height}px`,
    );
  }, []);

  const { theme, setTheme } = useTheme();

  const pathname: string = usePathname();
  return (
    <nav
      className={clsx(
        sticky && "sticky top-0",
        "bg-background/20 bleed z-10 border-b backdrop-blur-md",
        className,
      )}
      ref={nav}
    >
      <div className="flex flex-col flex-wrap items-center justify-around gap-x-12 gap-y-6 py-4 sm:flex-row">
        <div>
          <div className="p-4">
            <Link href="/">
              <Image
                className="select-none dark:hidden"
                src="/logo.png"
                alt="logo"
                width={168}
                height={45}
                loading="eager"
              />
              <Image
                className="hidden select-none dark:block"
                src="/logo_dark.png"
                alt="logo"
                width={168}
                height={45}
                loading="eager"
              />
            </Link>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-6 sm:flex-row">
            {navLink.map(e => (
              <li
                key={e.label}
                className={clsx("item", pathname == e.href && "active")}
              >
                <Link href={e.href}>{e.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <AuthButton />
          <DefaultButton
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            iconStart={
              theme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />
            }
            title="change theme color"
          ></DefaultButton>
        </div>
      </div>
    </nav>
  );
}
