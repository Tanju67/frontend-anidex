import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazyGetAnimeByGenreQuery } from "../../../shared/api/animeApi";
import { useInView } from "../../../shared/hooks/useInView";
import {
  RowSliderResponseSchema,
  type RowSliderType,
} from "../../../shared/schemas/animeSchema";
import Spinner from "../../../shared/UIElements/spinner/Spinner";
import SectionTitle from "../../animeDetail/SectionTitle";
import SearchItem from "./SearchItem";
import MainSearchTypeSkeleton from "../../../shared/UIElements/skeleton/MainSearchTypeSkeleton";

function TypeSearch({ title }: { title: string }) {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<RowSliderType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("q") || "";
  const type = searchParams.get("type") === "movie" ? "movie" : "tv";

  const [getAnimes, { isLoading, isFetching }] = useLazyGetAnimeByGenreQuery();

  useEffect(() => {
    if (search.length < 3) return;

    setPage(1);
    setAllAnime([]);
    setHasNextPage(true);

    const fetchInitial = async () => {
      try {
        const res = await getAnimes({
          page: 1,
          limit: 12,
          type,
          search,
        }).unwrap();
        const parsed = RowSliderResponseSchema.parse(res);
        setAllAnime(parsed.data);
        setHasNextPage(res.pagination.has_next_page);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInitial();
  }, [getAnimes, type, search]);

  const loadMore = async () => {
    if (search.trim().length < 3) return;
    if (isLoadingMore || !hasNextPage) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const res = await getAnimes({
        page: nextPage,
        limit: 12,
        type: type,
        search: search,
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

  if (search.trim().length < 3) return null;

  if (isLoading && page === 1) {
    return (
      <div className="mx-auto h-full max-w-300 pt-30">
        <SectionTitle title={title}>
          <MainSearchTypeSkeleton count={6} />
        </SectionTitle>
      </div>
    );
  }

  if (!allAnime.length && !isLoading) {
    return (
      <div className="mx-auto h-full max-w-300 pt-30">
        <SectionTitle title={title}>
          <button
            onClick={() => navigate(`/search?q=${search}`)}
            className="mb-4 text-sm opacity-70 hover:opacity-100"
          >
            ← ALL RESULTS
          </button>
          <div className="opacity-60">No data found</div>
        </SectionTitle>
      </div>
    );
  }
  return (
    <div className="mx-auto h-full max-w-300 pt-30">
      <SectionTitle title={title}>
        <button
          onClick={() => navigate(`/search?q=${search}`)}
          className="mb-4 text-sm opacity-70 hover:opacity-100"
        >
          ← ALL RESULTS
        </button>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allAnime.map((item) => (
            <SearchItem key={item.id} {...item} />
          ))}
        </ul>
        {hasNextPage && (
          <div ref={ref} className="flex h-20 items-center justify-center">
            {isFetching && <Spinner />}
          </div>
        )}
      </SectionTitle>
    </div>
  );
}

export default TypeSearch;
