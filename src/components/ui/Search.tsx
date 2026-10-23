"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) params.set("q", term);
    else params.delete("q");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder={placeholder}
      aria-label={placeholder}
      defaultValue={searchParams.get("q") ?? ""}
      onChange={e => handleSearch(e.target.value)}
      className="bg-background rounded-sm border p-2"
    />
  );
}
