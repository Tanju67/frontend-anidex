import { useGetRandomAnimeQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  SliderItemSchema,
  type SliderItemType,
} from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import RandomAnimeItem from "./RandomAnimeItem";

function RandomAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "0px" });

  const { data, isLoading, isFetching } = useGetRandomAnimeQuery(undefined, {
    skip: !isVisible,
    refetchOnMountOrArgChange: false,
  });

  let parsedData: SliderItemType | null = null;

  if (data) {
    try {
      parsedData = SliderItemSchema.parse(data);
    } catch (err) {
      console.error("Zod validation failed:", err);
      return null;
    }
  }

  let content;

  if (isLoading || isFetching) {
    content = <PageSpinner className="min-h-60" />;
  } else if (!parsedData) {
    content = <p className="text-sm opacity-70">No reviews found</p>;
  } else {
    content = <RandomAnimeItem {...parsedData} />;
  }

  return (
    <div
      ref={ref}
      className="min-h-100 px-2 py-4 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-20 lg:py-16"
    >
      <h2 className="mb-4 text-base font-bold text-white sm:text-lg md:text-center md:text-2xl lg:mb-10">
        Discover Something New
      </h2>

      {content}
    </div>
  );
}

export default RandomAnime;
