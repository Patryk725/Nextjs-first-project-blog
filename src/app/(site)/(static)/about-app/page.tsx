import { Timeline } from "@/components/ui/timeline";
import {
  SiBetterauth,
  SiDocker,
  SiDrizzle,
  SiGit,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiZod,
} from "react-icons/si";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.";

const data = [
  {
    title: "Docker",
    label: "Środowisko lokalne",
    content: lorem,
    icon: <SiDocker color="#2496ED" />,
  },
  {
    title: "Git + GitHub",
    label: "Kontrola wersji",
    content: lorem,
    icon: <SiGit color="#F03C2E" />,
  },
  {
    title: "Next.js",
    label: "Framework",
    content: lorem,
    icon: <SiNextdotjs />,
  },
  {
    title: "Tailwind",
    label: "Stylowanie",
    content: lorem,
    icon: <SiTailwindcss color="#06B6D4" />,
  },
  {
    title: "Postgres",
    label: "Baza danych",
    content: lorem,
    icon: <SiPostgresql color="#4169E1" />,
  },
  {
    title: "Drizzle",
    label: "ORM",
    content: lorem,
    icon: <SiDrizzle color="#C5F74F" />,
  },
  {
    title: "Better Auth",
    label: "Autoryzacja",
    content: lorem,
    icon: <SiBetterauth />,
  },
  {
    title: "Zod",
    label: "Walidacja danych",
    content: lorem,
    icon: <SiZod color="#408AFF" />,
  },
].map(item => ({
  ...item,
  content: (
    <div className="rounded-sm p-4">
      <p>{item.content}</p>
    </div>
  ),
}));

export default function Page() {
  return <Timeline data={data} />;
}
