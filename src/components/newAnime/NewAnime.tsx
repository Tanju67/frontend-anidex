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
import { typesDataForNewAnimeFilter } from "../../shared/utils/data";
import IsLoadingMore from "../../shared/UIElements/isLoadingMore/IsLoadingMore";

function NewAnime({
  thisSeason = false,
  title = "New This Year",
}: {
  thisSeason?: boolean;
  title?: string;
}) {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<RowSliderType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [type, setType] = useState<AnimeType>("all");

  const [getAnimes, { isLoading, isFetching, isError }] =
    useLazyGetCurrentSeasonQuery();

  useEffect(() => {
    setPage(1);
    setAllAnime([]);
    setHasNextPage(true);
    getAnimes({ page: 1, limit: 12, type: type, includeContinuing: thisSeason })
      .unwrap()
      .then((res) => {
        const parsed = RowSliderResponseSchema.parse(res);

        setAllAnime(parsed.data);
        setHasNextPage(res.pagination.has_next_page);
      });
  }, [getAnimes, type, thisSeason]);

  const loadMore = async () => {
    if (isLoadingMore || isFetching || !hasNextPage) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await getAnimes({
        page: nextPage,
        limit: 12,
        type: type,
        includeContinuing: thisSeason,
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
    content = <GridContentSkeleton title={title} />;
  } else if (!allAnime.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    content = <GridContent data={allAnime} />;
  }

  return (
    <SectionGrid
      title={title}
      setType={setType}
      type={type}
      typeData={typesDataForNewAnimeFilter}
    >
      {content}
      <div
        ref={ref}
        className="flex h-32 flex-col items-center justify-center gap-2"
      >
        {isLoadingMore && !isError && <Spinner />}
        {isError && <IsLoadingMore loadMore={loadMore} />}
      </div>
    </SectionGrid>
  );
}

export default NewAnime;
