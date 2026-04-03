function GridContentSkeleton({
  count = 12,
}: {
  count?: number;
  title?: string;
}) {
  return (
    <ul className="grid w-full grid-cols-2 gap-2 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <div className="animate-pulse">
            {/* Image Placeholder */}
            <div className="aspect-2/3 w-full rounded-lg bg-gray-700" />

            {/* Title Placeholder */}
            <div className="mt-2 h-4 w-3/4 rounded bg-gray-600" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GridContentSkeleton;
