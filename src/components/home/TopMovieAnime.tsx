import { useGetTopAnimeQuery } from "../../shared/api/animeApi";
import {
  RowSliderSchema,
  type RowSliderType,
} from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import RowSlider from "../../shared/UIElements/sliders/RowSlider";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";

function TopMovieAnime() {
  const { data, isLoading, isError, error } = useGetTopAnimeQuery({
    page: 1,
    limit: 10,
    type: "movie",
  });
  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  if (isError) {
    console.error("API request failed:", error);
  }

  let parsedData: RowSliderType = [];
  try {
    if (data) {
      parsedData = RowSliderSchema.parse(data);
    }
  } catch (zodError) {
    console.error("Zod validation failed:", zodError);
    return null; // Hata middleware ile error page’e gider
  }
  return <SectionSlider title="Top Movies" data={parsedData} />;
}

export default TopMovieAnime;
