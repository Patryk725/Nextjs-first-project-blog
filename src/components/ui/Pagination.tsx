"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Paginacja" className="flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Link
          key={page}
          href={createPageURL(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`rounded-sm border px-3 py-1 ${page === currentPage ? "bg-foreground text-background" : ""}`}
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
