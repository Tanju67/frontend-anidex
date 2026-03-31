import React from "react";

type EpisodesContentSkeletonProps = {
  count?: number;
};

const EpisodesContentSkeleton: React.FC<EpisodesContentSkeletonProps> = ({
  count = 6,
}) => {
  return (
    <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="flex animate-pulse flex-col gap-2 bg-white/10 px-2 py-2"
        >
          {/* Header: Episode info */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex w-full items-center gap-2">
              <span className="h-4 w-4 rounded bg-gray-300" />{" "}
              {/* expand icon */}
              <span className="h-4 w-10 rounded bg-gray-300" />{" "}
              {/* Ep number */}
              <span className="h-4 w-14 rounded bg-gray-300" />{" "}
              {/* filler/canon badge */}
              <span className="h-4 w-16 rounded bg-gray-300" /> {/* score */}
              <span className="h-4 flex-1 rounded bg-gray-300" /> {/* title */}
            </div>
            <span className="hidden h-4 w-20 rounded bg-gray-300 sm:block lg:hidden xl:block" />{" "}
            {/* aired */}
          </div>

          {/* Expandable synopsis */}
          <div className="h-12 w-full rounded bg-gray-300" />
        </li>
      ))}
    </ul>
  );
};

export default EpisodesContentSkeleton;
