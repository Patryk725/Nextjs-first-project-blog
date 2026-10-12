import { AccountAside } from "@/components/ui/AccountAside";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-8">
      <section className="flex-1">{children}</section>
      <AccountAside />
    </div>
  );
}
