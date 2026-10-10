type RatingProps = { avgRating: string | null; ratingsCount: number };

export function Rating({ avgRating, ratingsCount }: RatingProps) {
  if (!avgRating) return <span>brak ocen</span>;

  return (
    <span>
      {(Number(avgRating) / 2).toFixed(1)}/5 ({ratingsCount})
    </span>
  );
}
