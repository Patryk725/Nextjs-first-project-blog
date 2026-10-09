import Hero from "@/components/Hero";
import { BlogsList } from "@/components/ui/BlogList";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  IoCreateOutline,
  IoNewspaperOutline,
  IoPencilOutline,
  IoPeopleOutline,
} from "react-icons/io5";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
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
          <DefaultButton
            href="/blog/new"
            iconStart={<IoPencilOutline />}
            disabled={!session}
            title={!session ? "Zaloguj się, aby napisać artykuł" : ""}
          >
            Napisz artykuł
          </DefaultButton>
        </div>
      </Hero>
      <BlogsList sortBy="latest" />
      {/* <BlogsList sortBy="oldest" /> */}
      {/* <BlogsList sortBy="review" /> */}
    </section>
  );
}
