/**
 * A responsive skeleton loader that mirrors the TrailerContent grid layout.
 * Uses Tailwind's animate-pulse for a smooth loading effect.
 */
function TrailerSkeleton({ items = 6 }: { items?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: items }).map((_, index) => (
        <li
          key={`trailer-skeleton-${index}`}
          className="bg-main/5 border-main/10 relative overflow-hidden rounded-2xl border p-0"
        >
          {/* Thumbnail Skeleton Area */}
          <div className="relative aspect-video w-full animate-pulse bg-white/5">
            {/* Play Button Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-white/10" />
            </div>
            {/* PV Badge Placeholder */}
            <div className="absolute right-2 bottom-2 h-4 w-12 rounded bg-white/10" />
          </div>

          {/* Info Area Skeleton */}
          <div className="space-y-3 p-4">
            {/* Title Placeholder */}
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
            {/* Subtitle Placeholder */}
            <div className="h-2 w-1/2 animate-pulse rounded bg-white/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TrailerSkeleton;
