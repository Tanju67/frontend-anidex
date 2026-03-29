import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAnimeEpisodesByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  EpisodesSchema,
  type EpisodesType,
} from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import EpisodesContent from "./EpisodesContent";
import SectionTitle from "./SectionTitle";

function Episodes() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  // skip ile görünür değilken fetch yapılmaz
  const { data, isLoading, isFetching } = useGetAnimeEpisodesByIdQuery(
    { id: animeId!, page: 1 },
    { skip: !isVisible || !animeId, refetchOnMountOrArgChange: false },
  );

  let parsedData: EpisodesType = [];
  if (data?.data) {
    try {
      parsedData = EpisodesSchema.parse(data.data);
    } catch (err) {
      console.error("Zod error:", err);
    }
  }

  const filteredData = parsedData.slice(0, 6);

  let content;

  if (isLoading || isFetching) {
    content = <PageSpinner className="min-h-60" />;
  } else if (!filteredData || filteredData.length === 0) {
    content = <p className="text-sm opacity-70">No episodes found</p>;
  } else {
    content = <EpisodesContent data={filteredData} />;
  }

  return (
    <div ref={ref}>
      <SectionTitle link="episodes" title="Episodes">
        {content}
      </SectionTitle>
    </div>
  );
}

export default Episodes;
