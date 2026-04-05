import { useEffect, useState } from "react";
import {
  RowSliderResponseSchema,
  type AnimeFilter,
  type AnimeType,
  type RowSliderType,
} from "../../shared/schemas/animeSchema";
import { useLazyGetTopAnimeQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import SectionGrid from "../../shared/UIElements/gridContent/SectionGrid";
import GridContentSkeleton from "../../shared/UIElements/skeleton/GridContentSkeleton";
import GridContent from "../../shared/UIElements/gridContent/GridContent";
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

  const [getAnimes, { isLoading, isFetching }] = useLazyGetTopAnimeQuery();

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
      if (hasNextPage && !isFetching && !isLoading && !isLoadingMore) {
        loadMore();
      }
    },
    triggerOnce: false,
  });

  if (isLoading && page === 1) {
    return (
      <SectionGrid title="Most Popular Anime">
        <GridContentSkeleton title="Most Popular Anime" />
      </SectionGrid>
    );
  }

  if (!allAnime.length) {
    return (
      <SectionGrid title="Most Popular Anime" setType={setType} type={type}>
        <div className="opacity-60">No data found</div>
      </SectionGrid>
    );
  }

  console.log(allAnime);

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
      <GridContent data={allAnime} />
      {hasNextPage && (
        <div ref={ref} className="flex h-20 items-center justify-center">
          {isFetching && <Spinner />}
        </div>
      )}
    </SectionGrid>
  );
}

export default PopularAnime;
