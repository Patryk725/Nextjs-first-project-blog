"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

export function Filter({ name, label, options }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) params.set(name, value);
    else params.delete(name);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      aria-label={label}
      defaultValue={searchParams.get(name) ?? ""}
      onChange={e => handleChange(e.target.value)}
      className="bg-background rounded-sm border p-2"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
