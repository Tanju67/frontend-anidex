import { useGetRandomAnimeQuery } from "../../shared/api/animeApi";
import { SliderItemSchema } from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import RandomAnimeItem from "./RandomAnimeItem";

function RandomAnime() {
  const { data, isLoading, isError, error } = useGetRandomAnimeQuery();

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  if (isError) {
    console.error("API request failed:", error);
  }
  if (!data) return null;

  const parsedData = SliderItemSchema.parse(data);
  try {
    // parsedData = bannerSliderSchema.parse(data);
  } catch (zodError) {
    console.error("Zod validation failed:", zodError);
    return null; // Hata middleware ile error page’e gider
  }

  return (
    <div className="px-2 py-4 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-20 lg:py-16">
      <h2 className="mb-4 text-base font-bold text-white sm:text-lg md:text-center md:text-2xl lg:mb-10">
        Discover Something New
      </h2>
      <RandomAnimeItem {...parsedData} />
    </div>
  );
}

export default RandomAnime;
