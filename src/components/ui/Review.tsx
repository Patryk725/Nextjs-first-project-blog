import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export function starIcon(star: number, value: number) {
  if (value >= star * 2) return <IoStar />;
  if (value >= star * 2 - 1) return <IoStarHalf />;
  return <IoStarOutline />;
}

export function Stars({ value }: { value: number }) {
  return (
    <span role="img" aria-label={`Ocena ${value / 2} z 5`} className="flex">
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star}>{starIcon(star, value)}</span>
      ))}
    </span>
  );
}

type RatingProps = {
  avgRating: string | null;
  ratingsCount: number;
  stars?: boolean;
};

export function Rating({ avgRating, ratingsCount, stars = true }: RatingProps) {
  if (!avgRating) return <span>brak ocen</span>;

  return (
    <span className="flex items-center gap-2">
      {stars && <Stars value={Math.round(Number(avgRating))} />}
      {(Number(avgRating) / 2).toFixed(1)}/5 ({ratingsCount})
    </span>
  );
}
