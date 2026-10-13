import { IoOpenOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="bleed bg-foreground text-background text-md flex flex-col items-center gap-8 py-8 text-center">
      <div className="content">
        <span className="flex justify-between gap-4">
          Webiste made by:
          <a
            href="https://github.com/Patryk725"
            rel="nofollow"
            className="text-underline flex gap-2 hover:no-underline"
          >
            Patrykka <IoOpenOutline />
          </a>
        </span>
        <span>Website is made for portfolio/training purpose.</span>
      </div>
    </div>
  );
}
