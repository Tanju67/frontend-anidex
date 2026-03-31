const GeneralDetailContentSkeleton = () => {
  return (
    <section className="section-padding main-text-size relative min-h-screen">
      {/* Title placeholder */}
      <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-gray-400 md:h-8 md:w-1/2 lg:h-10 lg:w-1/3" />

      <div className="relative mx-auto h-full justify-center text-center">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
          {/* Image placeholder */}
          <div className="h-60 w-40 animate-pulse rounded-2xl bg-gray-300 md:h-80 md:w-50 lg:h-100 lg:w-80" />

          <div className="flex w-full flex-1 flex-col items-start justify-start gap-2">
            {/* Info placeholders */}
            <div className="flex flex-col gap-2 text-start lg:flex-row lg:gap-4">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-400 md:h-5 md:w-20" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-400 md:h-5 md:w-20" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-400 md:h-5 md:w-20" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-400 md:h-5 md:w-20" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-400 md:h-5 md:w-20" />
            </div>

            {/* Genres placeholder */}
            <div className="mt-2 flex gap-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-400 md:h-5 md:w-32" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-400 md:h-5 md:w-32" />
            </div>

            {/* Buttons placeholder */}
            <div className="mt-4 flex gap-2">
              <div className="h-10 w-36 animate-pulse rounded bg-gray-400 md:h-12 md:w-48 lg:h-14 lg:w-56" />
              <div className="h-10 w-10 animate-pulse rounded bg-gray-400 md:h-12 md:w-12 lg:h-14 lg:w-14" />
            </div>

            {/* Synopsis placeholder */}
            <div className="mt-2 h-16 w-full animate-pulse rounded bg-gray-300 md:h-24 lg:h-32" />

            {/* Background placeholder */}
            <div className="mt-2 h-16 w-full animate-pulse rounded bg-gray-300 md:h-24 lg:h-32" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralDetailContentSkeleton;
