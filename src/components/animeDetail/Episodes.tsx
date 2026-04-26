import { useParams } from "react-router-dom";
import { useGetAnimeEpisodesByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { EpisodesSchema } from "../../shared/schemas/animeSchema";
import EpisodesContentSkeleton from "../../shared/UIElements/skeleton/EpisodesContentSkeleton";
import EpisodesContent from "./EpisodesContent";
import SectionTitle from "./SectionTitle";

function Episodes() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  const query = useGetAnimeEpisodesByIdQuery(
    { id: animeId!, page: 1 },
    { skip: !isVisible || !animeId, refetchOnMountOrArgChange: false },
  );

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data?.data,
    isLoading: query.isLoading,
    schema: EpisodesSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-60" />;
  }

  let content;
  let filteredData;

  if (isLoading) {
    content = <EpisodesContentSkeleton />;
  } else if (isError || !data?.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    filteredData = data.slice(0, 6);
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
