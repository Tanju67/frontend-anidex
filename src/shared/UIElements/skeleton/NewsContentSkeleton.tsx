import React from "react";

type NewsContentSkeletonProps = {
  count?: number;
};

const NewsContentSkeleton: React.FC<NewsContentSkeletonProps> = ({
  count = 4,
}) => {
  return (
    <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="flex animate-pulse flex-col gap-2 bg-white/10 p-2 md:p-4"
        >
          <div className="flex gap-2">
            {/* Image Placeholder */}
            <div className="h-40 flex-1 rounded bg-gray-300 sm:h-60" />

            {/* Text Placeholder */}
            <div className="flex flex-2 flex-col gap-2">
              <div className="mb-2 flex flex-col gap-1">
                <span className="h-4 w-3/4 rounded bg-gray-300"></span>{" "}
                {/* title */}
                <span className="h-3 w-1/4 rounded bg-gray-300"></span>{" "}
                {/* date */}
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-3 w-full rounded bg-gray-300"></span>
                <span className="h-3 w-5/6 rounded bg-gray-300"></span>
                <span className="h-3 w-2/3 rounded bg-gray-300"></span>
              </div>
              <span className="mt-2 h-4 w-1/4 rounded bg-gray-300"></span>{" "}
              {/* link */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NewsContentSkeleton;
