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

function AllEpisodes() {
  const { animeId } = useParams();
  const [page, setPage] = useState(1);
  const [allEpisodes, setAllEpisodes] = useState<EpisodesType>([]);
  const [hasNextPage, setHasNextPage] = useState(true);

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

  const loadMore = () => {
    if (!animeId) return;

    setPage((prevPage) => {
      const nextPage = prevPage + 1;

      getEpisodes({ id: animeId, page: nextPage })
        .unwrap()
        .then((res) => {
          const parsed = EpisodesSchema.parse(res.data);

          setAllEpisodes((prev) => [...prev, ...parsed]);
          setHasNextPage(res.pagination.has_next_page);
        });

      return nextPage;
    });
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
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!allEpisodes.length) {
    return <div className="text-center opacity-60">No reviews found</div>;
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
