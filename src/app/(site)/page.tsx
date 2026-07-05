"use client";

import Hero from "@/components/ui/Hero";
import {
  IoCreateOutline,
  IoPeopleOutline,
  IoShareOutline,
} from "react-icons/io5";

export default function Home() {
  return (
    <main className="min-h-[200vw]">
      <Hero
        title="BlogRn"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est vero accusamus veniam ut, dolore necessitatibus non aliquid dicta cupiditate ducimus vitae corrupti quisquam! Eius, ea. Ab modi architecto vitae neque."
        symbols={[
          <IoCreateOutline key="create" />,
          <IoPeopleOutline key="people" />,
          <IoShareOutline key="share" />,
        ]}
      />
    </main>
  );
}
