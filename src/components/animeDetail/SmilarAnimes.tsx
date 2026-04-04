import { useParams } from "react-router-dom";
import { useGetSimilarAnimesByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { RecommendationsSchema } from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import RowSliderSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";
import SectionTitle from "./SectionTitle";

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

  if (isLoading)
    return (
      <SectionTitle title="Smilar Animes" skeleton={true}>
        <RowSliderSkeleton title="Smilar Animes" />
      </SectionTitle>
    );
  if (isError || !data?.length)
    return (
      <SectionTitle title="Smilar Animes">
        <div className="opacity-60">No data found</div>
      </SectionTitle>
    );

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
