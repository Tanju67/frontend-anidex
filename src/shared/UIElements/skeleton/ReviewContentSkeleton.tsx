import React from "react";

type ReviewContentSkeletonProps = {
  count?: number;
};

const ReviewContentSkeleton: React.FC<ReviewContentSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="flex animate-pulse flex-col gap-2 bg-white/10 p-4"
        >
          {/* Header: image + name + score */}
          <div className="mb-2 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-300 sm:h-12 sm:w-12 md:h-14 md:w-14 xl:h-16 xl:w-16" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="h-4 w-24 rounded bg-gray-300" />
              <div className="h-3 w-12 rounded bg-gray-300" />
            </div>
            <div className="h-3 w-16 rounded bg-gray-300 text-end" />
          </div>

          {/* Review content */}
          <div className="h-16 w-full rounded bg-gray-300" />

          {/* Buttons + likes/dislikes */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="h-8 w-20 rounded bg-gray-300" />
            <div className="flex gap-2">
              <div className="h-6 w-12 rounded bg-gray-300" />
              <div className="h-6 w-12 rounded bg-gray-300" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReviewContentSkeleton;
