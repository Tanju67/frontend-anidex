import { useGetUpcomingAnimeQuery } from "../../shared/api/animeApi";
import {
  bannerSliderSchema,
  type BannerSliderType,
} from "../../shared/schemas/animeSchema";
import BannerSlider from "../../shared/UIElements/sliders/BannerSlider";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";

function Banner() {
  const { data, isLoading, isError, error } = useGetUpcomingAnimeQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading)
    return (
      <PageSpinner className="h-[calc(80vh-var(--nav-height))] md:h-[calc(60vh-var(--nav-height))] lg:h-[calc(100vh-var(--nav-height))]" />
    );

  if (isError) {
    console.error("API request failed:", error);
  }
  if (!data) return null;

  let parsedData: BannerSliderType = [];
  try {
    parsedData = bannerSliderSchema.parse(data);
  } catch (zodError) {
    console.error("Zod validation failed:", zodError);
    return null; // Hata middleware ile error page’e gider
  }

  return (
    <div>
      <BannerSlider items={parsedData} />
    </div>
  );
}

export default Banner;
