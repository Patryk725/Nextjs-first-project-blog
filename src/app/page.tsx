"use client";

import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <main>
      Hi! Which font is it?
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle
      </button>
    </main>
  );
}
