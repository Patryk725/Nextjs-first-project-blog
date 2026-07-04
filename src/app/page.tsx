"use client";

import Navbar from "@/components/Navbar";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  return (
    <main className="min-h-[200vw]">
      <Navbar sticky />
      <DefaultButton iconStart={<IoSearch />}>Hej, kliknij</DefaultButton>
    </main>
  );
}
