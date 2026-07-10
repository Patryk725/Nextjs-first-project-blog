import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="wrapper content">
      <Breadcrumbs />
      {children}
    </section>
  );
}
