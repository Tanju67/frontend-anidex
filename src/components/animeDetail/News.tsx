import { useParams } from "react-router-dom";
import { useGetAnimeNewsByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { AllNewsSchema } from "../../shared/schemas/animeSchema";
import CardSkeleton from "../../shared/UIElements/skeleton/CardSkeleton";
import NewsContent from "./NewsContent";
import SectionTitle from "./SectionTitle";

function News() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  const query = useGetAnimeNewsByIdQuery(animeId!, {
    skip: !isVisible || !animeId,
    refetchOnMountOrArgChange: false,
  });

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: AllNewsSchema,
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
      <SectionTitle
        title="Anime News"
        subTitle="Read the latest news related to this anime"
      >
        <NewsContent data={filteredData} />
      </SectionTitle>
    </div>
  );
}

export default News;
