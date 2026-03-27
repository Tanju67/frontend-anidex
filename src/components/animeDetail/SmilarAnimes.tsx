import { useParams } from "react-router-dom";
import { useGetSimilarAnimesByIdQuery } from "../../shared/api/animeApi";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import {
  RecommendationsSchema,
  type RecommendationsType,
} from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import SectionTitle from "./SectionTitle";

function SmilarAnimes() {
  const { animeId } = useParams();
  const { data, isLoading } = useGetSimilarAnimesByIdQuery(animeId!);

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  let parsedData: RecommendationsType = [];
  try {
    if (data) {
      parsedData = RecommendationsSchema.parse(data);
    }
  } catch (zodError) {
    console.error("Zod validation failed:", zodError);
    return null; // Hata middleware ile error page’e gider
  }
  return (
    <SectionTitle
      title="Smilar Animes"
      subTitle="You can also like these animes"
    >
      <SectionSlider data={parsedData} />
    </SectionTitle>
  );
}

export default SmilarAnimes;
