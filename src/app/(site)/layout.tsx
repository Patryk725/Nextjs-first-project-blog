import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { IoChevronForwardOutline } from "react-icons/io5";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper">
      <Navbar sticky />
      <div className="my-3">
        <div className="my-12">
          {<Breadcrumbs separator={<IoChevronForwardOutline size={24} />} />}
        </div>
        {children}
      </div>
    </div>
  );
}
