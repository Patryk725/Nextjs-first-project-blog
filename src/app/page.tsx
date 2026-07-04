"use client";

import Navbar from "@/components/Navbar";
import DefaultButton from "@/components/ui/Button/DefaultButton";

export default function Home() {
  return (
    <main className="min-h-[200vw]">
      <Navbar sticky />
      <DefaultButton>Hej, klikaj</DefaultButton>
    </main>
  );
}
