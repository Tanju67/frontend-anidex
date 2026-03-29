import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSimilarAnimesByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  RecommendationsSchema,
  type RecommendationsType,
} from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import SectionTitle from "./SectionTitle";

function SmilarAnimes() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  // skip ile görünür değilken fetch yapılmaz
  const { data, isLoading, isFetching } = useGetSimilarAnimesByIdQuery(
    animeId!,
    { skip: !isVisible || !animeId, refetchOnMountOrArgChange: false },
  );

  let parsedData: RecommendationsType = [];
  if (data) {
    try {
      parsedData = RecommendationsSchema.parse(data);
    } catch (err) {
      console.error("Zod error:", err);
    }
  }

  const filteredData = parsedData.slice(0, 10);

  let content;

  if (isLoading || isFetching) {
    content = <PageSpinner className="min-h-60" />;
  } else if (!filteredData || filteredData.length === 0) {
    content = <p className="text-sm opacity-70">No smilar animes found</p>;
  } else {
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
