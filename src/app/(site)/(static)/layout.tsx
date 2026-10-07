export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="wrapper content">{children}</section>;
}
