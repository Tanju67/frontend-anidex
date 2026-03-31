import { useParams } from "react-router-dom";
import { useGetAnimeEpisodesByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { EpisodesSchema } from "../../shared/schemas/animeSchema";
import CardSkeleton from "../../shared/UIElements/skeleton/CardSkeleton";
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

  if (isLoading) return <CardSkeleton />;
  if (isError || !data?.length)
    return <div className="text-center opacity-60">No data found</div>;

  const filteredData = data.slice(0, 6);

  return (
    <div ref={ref}>
      <SectionTitle link="episodes" title="Episodes">
        <EpisodesContent data={filteredData} />
      </SectionTitle>
    </div>
  );
}

export default Episodes;
