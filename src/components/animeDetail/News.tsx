import { useParams } from "react-router-dom";
import { useGetAnimeNewsByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { AllNewsSchema } from "../../shared/schemas/animeSchema";
import NewsContentSkeleton from "../../shared/UIElements/skeleton/NewsContentSkeleton";
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

  if (isLoading)
    return (
      <SectionTitle title="Anime News">
        <NewsContentSkeleton count={4} />
      </SectionTitle>
    );
  if (isError || !data?.length)
    return (
      <SectionTitle title="Anime News">
        <div className="opacity-60">No data found</div>
      </SectionTitle>
    );

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
