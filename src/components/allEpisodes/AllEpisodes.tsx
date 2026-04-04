import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetAnimeEpisodesByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  EpisodesSchema,
  type EpisodesType,
} from "../../shared/schemas/animeSchema";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import EpisodesContent from "../animeDetail/EpisodesContent";
import SectionTitle from "../animeDetail/SectionTitle";
import EpisodesContentSkeleton from "../../shared/UIElements/skeleton/EpisodesContentSkeleton";

function AllEpisodes() {
  const { animeId } = useParams();
  const [page, setPage] = useState(1);
  const [allEpisodes, setAllEpisodes] = useState<EpisodesType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [getEpisodes, { isLoading, isFetching }] =
    useLazyGetAnimeEpisodesByIdQuery();

  useEffect(() => {
    if (!animeId) return;

    getEpisodes({ id: animeId, page: 1 })
      .unwrap()
      .then((res) => {
        const parsed = EpisodesSchema.parse(res.data);

        setAllEpisodes(parsed);
        setHasNextPage(res.pagination.has_next_page);
      });
  }, [animeId, getEpisodes]);

  const loadMore = async () => {
    if (!animeId || isLoadingMore) return;
    setIsLoadingMore(true);

    const nextPage = page + 1;

    try {
      const res = await getEpisodes({ id: animeId, page: nextPage }).unwrap();
      const parsed = EpisodesSchema.parse(res.data);

      setAllEpisodes((prev) => [...prev, ...parsed]);
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
      if (hasNextPage && !isFetching && !isLoading) {
        loadMore();
      }
    },
    triggerOnce: false,
  });

  if (isLoading && page === 1) {
    return (
      <SectionTitle title="All Episodes" isBack={true}>
        <EpisodesContentSkeleton />
      </SectionTitle>
    );
  }

  if (!allEpisodes.length) {
    return (
      <SectionTitle title="All Episodes" isBack={true}>
        <div className="opacity-60">No reviews found</div>
      </SectionTitle>
    );
  }
  return (
    <div>
      <SectionTitle title="All Episodes" isBack={true}>
        <EpisodesContent data={allEpisodes} />
      </SectionTitle>

      {hasNextPage && (
        <div ref={ref} className="flex h-20 items-center justify-center">
          {isFetching && <Spinner />}
        </div>
      )}
    </div>
  );
}

export default AllEpisodes;
