function MainSearchTypeSkeleton({ count = 12 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="flex animate-pulse items-center gap-2 rounded-lg bg-gray-800 p-2"
        >
          {/* Görsel placeholder */}
          <div className="h-24 w-16 flex-shrink-0 rounded-lg bg-gray-700" />
          {/* Metin placeholder */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-3/4 rounded bg-gray-600" />
            <div className="h-3 w-1/2 rounded bg-gray-600" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MainSearchTypeSkeleton;
