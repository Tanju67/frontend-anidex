import { useParams } from "react-router-dom";
import { useGetSimilarAnimesByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { RecommendationsSchema } from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import CardSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";
import SectionTitle from "./SectionTitle";
import RowSliderSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";

function SmilarAnimes() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  const query = useGetSimilarAnimesByIdQuery(animeId!, {
    skip: !isVisible || !animeId,
    refetchOnMountOrArgChange: false,
  });

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: RecommendationsSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-60" />;
  }

  if (isLoading) return <RowSliderSkeleton title="Smilar Animes" />;
  if (isError || !data?.length)
    return <div className="text-center opacity-60">No data found</div>;

  const filteredData = data.slice(0, 10);

  return (
    <div ref={ref}>
      <SectionTitle
        title="Smilar Animes"
        subTitle="You can also like these animes"
      >
        <SectionSlider data={filteredData} />
      </SectionTitle>
    </div>
  );
}

export default SmilarAnimes;
