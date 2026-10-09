export function FieldErrors({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <ul className="text-sm text-red-700 dark:text-red-400">
      {errors.map(error => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}
