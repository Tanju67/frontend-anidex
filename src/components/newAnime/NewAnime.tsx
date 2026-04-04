import { useEffect, useState } from "react";
import { useLazyGetCurrentSeasonQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  type AnimeType,
  RowSliderResponseSchema,
  type RowSliderType,
} from "../../shared/schemas/animeSchema";
import GridContent from "../../shared/UIElements/gridContent/GridContent";
import GridContentSkeleton from "../../shared/UIElements/skeleton/GridContentSkeleton";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import SectionGrid from "../../shared/UIElements/gridContent/SectionGrid";

function NewAnime() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<RowSliderType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [type, setType] = useState<AnimeType>("all");

  const [getAnimes, { isLoading, isFetching }] = useLazyGetCurrentSeasonQuery();

  useEffect(() => {
    setPage(1);
    setAllAnime([]);
    setHasNextPage(true);
    getAnimes({ page: 1, limit: 12, type: type !== "all" ? type : undefined })
      .unwrap()
      .then((res) => {
        const parsed = RowSliderResponseSchema.parse(res);

        setAllAnime(parsed.data);
        setHasNextPage(res.pagination.has_next_page);
      });
  }, [getAnimes, type]);

  const loadMore = async () => {
    if (isLoadingMore || isFetching || !hasNextPage) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await getAnimes({
        page: nextPage,
        limit: 12,
        type: type !== "all" ? type : undefined,
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
      <SectionGrid title="Currently Airing Anime">
        <GridContentSkeleton title="Currently Airing Anime" />
      </SectionGrid>
    );
  }

  if (!allAnime.length) {
    return (
      <SectionGrid title="Currently Airing Anime" setType={setType} type={type}>
        <div className="opacity-60">No data found</div>
      </SectionGrid>
    );
  }

  return (
    <SectionGrid title="Currently Airing Anime" setType={setType} type={type}>
      <GridContent data={allAnime} />
      {hasNextPage && (
        <div ref={ref} className="flex h-20 items-center justify-center">
          {isFetching && <Spinner />}
        </div>
      )}
    </SectionGrid>
  );
}

export default NewAnime;
