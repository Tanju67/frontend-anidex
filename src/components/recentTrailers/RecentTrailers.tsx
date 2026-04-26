import { useEffect, useState } from "react";
import { useLazyGetRecentPromosQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  PromoResponseSchema,
  type AllPromosType,
} from "../../shared/schemas/animeSchema";
import SectionGrid from "../../shared/UIElements/gridContent/SectionGrid";
import IsLoadingMore from "../../shared/UIElements/isLoadingMore/IsLoadingMore";
import TrailerSkeleton from "../../shared/UIElements/skeleton/TrailerSkeleton";
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

  let content;

  if (isLoading && page === 1) {
    content = <TrailerSkeleton items={18} />;
  } else if (!allAnime.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    content = (
      <>
        <TrailerContent data={allAnime} />{" "}
        {hasNextPage && (
          <div
            ref={ref}
            className="flex h-32 flex-col items-center justify-center gap-2"
          >
            {isLoadingMore && !isError && <Spinner />}
            {isError && <IsLoadingMore loadMore={loadMore} />}
          </div>
        )}
      </>
    );
  }

  return (
    <SectionGrid
      title={"Recent Trailers"}
      subTitle="Step into the narratives of tomorrow with a glimpse into upcoming premieres."
    >
      {content}
    </SectionGrid>
  );
}

export default RecentTrailers;
