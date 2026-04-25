import { useGetRandomAnimeQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { SliderItemSchema } from "../../shared/schemas/animeSchema";
import RandomAnimeItemSkeleton from "../../shared/UIElements/skeleton/RandomAnimeItemSkeleton";
import RandomAnimeItem from "./RandomAnimeItem";

function RandomAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });

  const query = useGetRandomAnimeQuery(undefined, {
    skip: !isVisible,
    refetchOnMountOrArgChange: false,
  });

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: SliderItemSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-100" />;
  }

  let content;

  if (isLoading) {
    content = <RandomAnimeItemSkeleton />;
  } else if (isError || !data) {
    content = <div className="opacity-60 lg:text-center">No data found</div>;
  } else {
    content = <RandomAnimeItem {...data} />;
  }

  return (
    <div ref={ref} className="section-padding main-text-size">
      <h2 className="section-title-size mb-2 md:mb-4 md:text-center">
        Discover Something New
      </h2>

      {content}
    </div>
  );
}

export default RandomAnime;
