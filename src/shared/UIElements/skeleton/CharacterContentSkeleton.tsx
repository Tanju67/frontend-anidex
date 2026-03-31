import React from "react";

type CharacterContentSkeletonProps = {
  count?: number;
  isCharacter?: boolean;
};

const CharacterContentSkeleton: React.FC<CharacterContentSkeletonProps> = ({
  count = 12,
  isCharacter = true,
}) => {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-2 gap-y-6 sm:justify-items-start sm:gap-y-8 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex flex-col items-center gap-2">
          {/* Image placeholder */}
          <div
            className={`animate-pulse bg-gray-300 ${
              isCharacter
                ? "h-30 w-30 rounded-full max-[400px]:h-20 max-[400px]:w-20 lg:h-40 lg:w-40 xl:h-50 xl:w-50"
                : "h-40 w-30 rounded-lg max-[400px]:h-30 max-[400px]:w-20 md:h-50 lg:h-70 lg:w-40 xl:w-50"
            }`}
          />

          {/* Name placeholder */}
          <div className="h-4 w-20 animate-pulse rounded bg-gray-400 md:w-24 lg:w-28" />
        </li>
      ))}
    </ul>
  );
};

export default CharacterContentSkeleton;
