import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { IoChevronForwardOutline } from "react-icons/io5";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar sticky />
      <div className="container mx-auto mt-4">
        <Breadcrumbs separator={<IoChevronForwardOutline size={24} />} />
        {children}
      </div>
    </div>
  );
}
