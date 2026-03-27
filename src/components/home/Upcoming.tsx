import { useGetUpcomingAnimeQuery } from "../../shared/api/animeApi";
import {
  RowSliderSchema,
  type RowSliderType,
} from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";

function Upcoming() {
  const { data, isLoading, isError, error } = useGetUpcomingAnimeQuery({
    page: 1,
    limit: 10,
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
  return <SectionSlider title="Upcoming Series" data={parsedData} />;
}

export default Upcoming;
