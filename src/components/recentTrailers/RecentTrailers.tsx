import { useEffect, useState } from "react";
import { useLazyGetRecentPromosQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  PromoResponseSchema,
  type AllPromosType,
} from "../../shared/schemas/animeSchema";
import SectionGrid from "../../shared/UIElements/gridContent/SectionGrid";
import GridContentSkeleton from "../../shared/UIElements/skeleton/GridContentSkeleton";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import TrailerContent from "../home/TrailerContent";

function RecentTrailers() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<AllPromosType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [getAnimes, { isLoading, isFetching, isError }] =
    useLazyGetRecentPromosQuery();

  useEffect(() => {
    setPage(1);
    setAllAnime([]);
    setHasNextPage(true);
    getAnimes({ page: 1 })
      .unwrap()
      .then((res) => {
        const parsed = PromoResponseSchema.parse(res);

        setAllAnime(parsed.data);
        setHasNextPage(res.pagination.has_next_page);
      });
  }, [getAnimes]);

  const loadMore = async () => {
    if (isLoadingMore || isFetching || !hasNextPage) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await getAnimes({
        page: nextPage,
      }).unwrap();
      const parsed = PromoResponseSchema.parse(res);

      setAllAnime((prev) => [...prev, ...parsed.data]);
      setHasNextPage(res.pagination.has_next_page);
      setPage(nextPage);
    } catch (err) {
      // Middleware'in yönlendirme yapmasını engellemek için
      // endpoint adını Middleware'deki 'nonCriticalEndpoints' listesine eklemeyi unutma!
      console.error("Initial load failed:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const { ref } = useInView({
    onEnter: () => {
      if (
        hasNextPage &&
        !isFetching &&
        !isLoading &&
        !isLoadingMore &&
        !isError
      ) {
        loadMore();
      }
    },
    triggerOnce: false,
  });

  if (isLoading && page === 1) {
    return (
      <SectionGrid title={"Recent Trailers"}>
        <GridContentSkeleton title={"Recent Trailers"} />
      </SectionGrid>
    );
  }

  if (!allAnime.length) {
    return (
      <SectionGrid title={"Recent Trailers"}>
        <div className="opacity-60">No data found</div>
      </SectionGrid>
    );
  }
  return (
    <SectionGrid
      title={"Recent Trailers"}
      subTitle="Step into the narratives of tomorrow with a glimpse into upcoming premieres."
    >
      <TrailerContent data={allAnime} />
      {hasNextPage && (
        <div
          ref={ref}
          className="flex h-32 flex-col items-center justify-center gap-2"
        >
          {isLoadingMore ? (
            <Spinner />
          ) : (
            isError && (
              <button
                onClick={() => loadMore()}
                className="text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:text-white"
              >
                Server Timeout - Click to Retry
              </button>
            )
          )}
        </div>
      )}
    </SectionGrid>
  );
}

export default RecentTrailers;
