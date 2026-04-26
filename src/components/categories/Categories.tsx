import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetAnimeByGenreQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  RowSliderResponseSchema,
  type AnimeType,
  type RowSliderType,
} from "../../shared/schemas/animeSchema";
import GridContent from "../../shared/UIElements/gridContent/GridContent";
import SectionGrid from "../../shared/UIElements/gridContent/SectionGrid";
import GridContentSkeleton from "../../shared/UIElements/skeleton/GridContentSkeleton";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import {
  type AnimeRating,
  type AnimeStatus,
  genres,
  ratingData,
  statusData,
  typesDataForPopularAnimeFilter,
} from "../../shared/utils/data";
import IsLoadingMore from "../../shared/UIElements/isLoadingMore/IsLoadingMore";

function Categories() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<RowSliderType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { genreId } = useParams();
  const [type, setType] = useState<AnimeType>("all");
  const [raiting, setRating] = useState<AnimeRating>("g");
  const [status, setStatus] = useState<AnimeStatus>("all");

  const [getAnimes, { isLoading, isFetching, isError }] =
    useLazyGetAnimeByGenreQuery();

  const genreObj = genres.find((g) => g.id === +genreId!);

  const GenreIcon = genreObj?.icon;

  useEffect(() => {
    setPage(1);
    setAllAnime([]);
    setHasNextPage(true);
    getAnimes({
      page: 1,
      limit: 12,
      genre: +genreId!,
      type: type,
      rating: raiting,
      status: status,
    })
      .unwrap()
      .then((res) => {
        const parsed = RowSliderResponseSchema.parse(res);

        setAllAnime(parsed.data);
        setHasNextPage(res.pagination.has_next_page);
      });
  }, [getAnimes, genreId, type, raiting, status]);

  const loadMore = async () => {
    if (isLoadingMore || isFetching || !hasNextPage) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await getAnimes({
        page: nextPage,
        limit: 12,
        genre: +genreId!,
        type: type,
        rating: raiting,
        status: status,
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
  } else if (!allAnime.length) {
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
    <div className="py-4 md:py-10">
      <h2 className="section-title-size content-center-x gap-2 uppercase">
        {GenreIcon && (
          <GenreIcon size={32} strokeWidth={1.5} className="text-main-btn" />
        )}
        <span>{genreObj?.name}</span>
      </h2>
      <p className="main-text-size mx-auto mt-2 w-80 text-center">
        {genreObj?.description}
      </p>
      <SectionGrid
        title={genreObj?.name as string}
        type={type}
        setType={setType}
        typeData={typesDataForPopularAnimeFilter}
        rating={raiting}
        setRating={setRating}
        ratingData={ratingData}
        status={status}
        setStatus={setStatus}
        statusData={statusData}
      >
        {content}
      </SectionGrid>
    </div>
  );
}

export default Categories;
