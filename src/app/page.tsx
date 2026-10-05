import Hero from "@/components/Hero";
import { IoCreateOutline, IoPeopleOutline } from "react-icons/io5";

export default async function Home() {
  return (
    <section className="wrapper">
      <Hero
        title="BlogRn"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Est vero accusamus veniam ut, dolore necessitatibus non aliquid dicta cupiditate ducimus vitae corrupti quisquam! Eius, ea. Ab modi architecto vitae neque."
        symbols={[
          <IoCreateOutline key="create" />,
          <IoPeopleOutline key="people" />,
        ]}
      />
      <div>text</div>
    </section>
  );
}
