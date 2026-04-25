import { useGetAnimeByGenreQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { RowSliderResponseSchema } from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import RowSliderSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";
import NoData from "./NoData";

function ActionAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });
  const query = useGetAnimeByGenreQuery(
    {
      page: 1,
      limit: 10,
      genre: 1,
      type: "all",
      rating: "pg13",
    },
    { skip: !isVisible, refetchOnMountOrArgChange: false },
  );

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: RowSliderResponseSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-100" />;
  }

  if (isLoading) return <RowSliderSkeleton title="Action Series" />;
  if (isError || !data?.data.length) return <NoData title="Action Series" />;
  return (
    <div ref={ref}>
      <SectionSlider title="Explore Action Series" data={data.data} />
    </div>
  );
}

export default ActionAnime;
