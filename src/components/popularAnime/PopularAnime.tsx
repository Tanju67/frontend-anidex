import { useEffect, useState } from "react";
import { useLazyGetTopAnimeQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  RowSliderResponseSchema,
  type AnimeFilter,
  type AnimeType,
  type RowSliderType,
} from "../../shared/schemas/animeSchema";
import GridContent from "../../shared/UIElements/gridContent/GridContent";
import SectionGrid from "../../shared/UIElements/gridContent/SectionGrid";
import IsLoadingMore from "../../shared/UIElements/isLoadingMore/IsLoadingMore";
import GridContentSkeleton from "../../shared/UIElements/skeleton/GridContentSkeleton";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import {
  filterData,
  typesDataForPopularAnimeFilter,
} from "../../shared/utils/data";

function PopularAnime() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<RowSliderType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [type, setType] = useState<AnimeType>("all");
  const [filter, setFilter] = useState<AnimeFilter>("all");

  const [getAnimes, { isLoading, isFetching, isError }] =
    useLazyGetTopAnimeQuery();

  useEffect(() => {
    setPage(1);
    setAllAnime([]);
    setHasNextPage(true);
    getAnimes({ page: 1, limit: 12, type: type, filter: filter })
      .unwrap()
      .then((res) => {
        const parsed = RowSliderResponseSchema.parse(res);

        setAllAnime(parsed.data);
        setHasNextPage(res.pagination.has_next_page);
      });
  }, [getAnimes, type, filter]);

  const loadMore = async () => {
    if (isLoadingMore || isFetching || !hasNextPage) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await getAnimes({
        page: nextPage,
        limit: 12,
        type: type,
        filter: filter,
      }).unwrap();
      const parsed = RowSliderResponseSchema.parse(res);

      setAllAnime((prev) => [...prev, ...parsed.data]);
      setHasNextPage(res.pagination.has_next_page);
      setPage(nextPage);
    } catch (err) {
      console.error("Error loading more episodes:", err);
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
    content = <GridContentSkeleton title="Most Popular Anime" />;
  } else if (isError || !allAnime.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    content = (
      <>
        <GridContent data={allAnime} />
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
      title="Most Popular Anime"
      setType={setType}
      type={type}
      filter={filter}
      setFilter={setFilter}
      typeData={typesDataForPopularAnimeFilter}
      filterData={filterData}
    >
      {content}
    </SectionGrid>
  );
}

export default PopularAnime;
