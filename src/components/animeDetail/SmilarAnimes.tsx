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

  let content;
  let filteredData;

  if (isLoading) {
    content = <RowSliderSkeleton title="Smilar Animes" />;
  } else if (isError || !data?.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    filteredData = data.slice(0, 10);
    content = <SectionSlider data={filteredData} />;
  }

  return (
    <div ref={ref}>
      <SectionTitle
        title="Smilar Animes"
        subTitle="You can also like these animes"
      >
        {content}
      </SectionTitle>
    </div>
  );
}

export default SmilarAnimes;
