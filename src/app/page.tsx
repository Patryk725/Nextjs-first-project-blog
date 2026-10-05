import Hero from "@/components/Hero";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import {
  IoCreateOutline,
  IoNewspaperOutline,
  IoPencilOutline,
  IoPeopleOutline,
} from "react-icons/io5";

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
      >
        <div className="flex gap-2">
          <DefaultButton
            colorInvert
            href="/blog"
            iconStart={<IoNewspaperOutline />}
          >
            Przejdź do archiwum
          </DefaultButton>
          <DefaultButton href="/blog-add" iconStart={<IoPencilOutline />}>
            Napisz artykuł
          </DefaultButton>
        </div>
      </Hero>
      <div>text</div>
    </section>
  );
}
