import { useEffect, useState } from "react";
import {
  useDeleteAnimeMutation,
  useLazyGetUserAllAnimeQuery,
} from "../../shared/api/backendApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  userAllAnimeResponseSchema,
  type CreateWatchlistItem,
} from "../../shared/schemas/backendSchema";
import SectionGrid from "../../shared/UIElements/gridContent/SectionGrid";
import GridContentSkeleton from "../../shared/UIElements/skeleton/GridContentSkeleton";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import WatchlistContent from "./WatchlistContent";
import WatchListSimilarAnime from "./WatchListSimilarAnime";
import { toaster } from "../../shared/utils/toaster";
import { ToastContainer } from "react-toastify";

function Watchlist() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<CreateWatchlistItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [getAnimes, { isLoading, isFetching }] = useLazyGetUserAllAnimeQuery();
  const [deleteAnime, { isLoading: isDeleting }] = useDeleteAnimeMutation();

  const handleRemove = async (id: string) => {
    try {
      await deleteAnime(String(id)).unwrap();

      setAllAnime((prev) => prev.filter((item) => item.animeId !== id));
      toaster("success", "Removed from watchlist");
    } catch (error) {
      console.error("Error loading more episodes:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setAllAnime([]);
    setHasNextPage(true);
    getAnimes({ page: 1, limit: 12 })
      .unwrap()
      .then((res) => {
        const parsed = userAllAnimeResponseSchema.parse(res);

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
        limit: 12,
      }).unwrap();
      const parsed = userAllAnimeResponseSchema.parse(res);

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
      <SectionGrid title="My Watchlist">
        <GridContentSkeleton title="My Watchlist" />
      </SectionGrid>
    );
  }

  if (!allAnime.length) {
    return (
      <SectionGrid title="My Watchlist ">
        <div className="opacity-60">No data found</div>
      </SectionGrid>
    );
  }

  console.log(allAnime);

  return (
    <>
      <SectionGrid title="My Watchlist">
        <WatchlistContent data={allAnime} handleRemove={handleRemove} />
        {hasNextPage && (
          <div ref={ref} className="flex h-20 items-center justify-center">
            {isFetching && <Spinner />}
          </div>
        )}
      </SectionGrid>
      <SectionGrid title="Recommendation for you">
        <WatchListSimilarAnime data={allAnime.slice(0, 3)} />
      </SectionGrid>
      <ToastContainer />
    </>
  );
}

export default Watchlist;
