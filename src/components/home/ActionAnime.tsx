import { useGetAnimeByGenreQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { RowSliderSchema } from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import CardSkeleton from "../../shared/UIElements/skeleton/CardSkeleton";

function ActionAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });
  const query = useGetAnimeByGenreQuery(
    {
      page: 1,
      limit: 10,
      genre: 1,
    },
    { skip: !isVisible, refetchOnMountOrArgChange: false },
  );

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: RowSliderSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-100" />;
  }

  if (isLoading) return <CardSkeleton />;
  if (isError || !data?.length)
    return <div className="text-center opacity-60">No data found</div>;
  return (
    <div ref={ref}>
      <SectionSlider title="Explore Action Series" data={data} />
    </div>
  );
}

export default ActionAnime;
