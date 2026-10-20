"use client";
import { starIcon } from "@/components/ui/Review";
import { useActionState, useState } from "react";

export default function RateBlog({ blogId }: { blogId: string }) {
  const [state, formAction, pending] = useActionState(
    RateBlog.bind(null, blogId),
    undefined,
  );
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex text-2xl" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className="relative">
            {starIcon(star, hover || selected)}
            {[star * 2 - 1, star * 2].map((value, i) => (
              <button
                key={value}
                type="submit"
                name="rating"
                value={value}
                disabled={pending}
                onMouseEnter={() => setHover(value)}
                onFocus={() => setHover(value)}
                onClick={() => setSelected(value)}
                aria-label={`Oceń na ${value / 2} z 5`}
                className={`absolute inset-y-0 w-1/2 cursor-pointer ${i ? "right-0" : "left-0"}`}
              />
            ))}
          </span>
        ))}
      </div>
      {state?.message && <p className="text-sm">{state.message}</p>}
    </form>
  );
}
