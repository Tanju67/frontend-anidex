import { useGetRandomAnimeQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import {
  SliderItemSchema,
  type SliderItemType,
} from "../../shared/schemas/animeSchema";
import CardSkeleton from "../../shared/UIElements/skeleton/CardSkeleton";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import RandomAnimeItem from "./RandomAnimeItem";

function RandomAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });

  const query = useGetRandomAnimeQuery(undefined, {
    skip: !isVisible,
    refetchOnMountOrArgChange: false,
  });

  // let parsedData: SliderItemType | null = null;

  // if (data) {
  //   try {
  //     parsedData = SliderItemSchema.parse(data);
  //   } catch (err) {
  //     console.error("Zod validation failed:", err);
  //     return null;
  //   }
  // }

  // let content;

  // if (isLoading || isFetching) {
  //   content = <PageSpinner className="min-h-60" />;
  // } else if (!parsedData) {
  //   content = <p className="text-sm opacity-70">No reviews found</p>;
  // } else {
  //   content = <RandomAnimeItem {...parsedData} />;
  // }

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: SliderItemSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-100" />;
  }

  if (isLoading) return <CardSkeleton />;
  if (isError || !data)
    return <div className="text-center opacity-60">No data found</div>;

  return (
    <div ref={ref} className="section-padding main-text-size">
      <h2 className="section-title-size mb-2 md:mb-4 md:text-center">
        Discover Something New
      </h2>

      <RandomAnimeItem {...data} />
    </div>
  );
}

export default RandomAnime;
