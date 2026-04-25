import { useGetTopAnimeQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { RowSliderResponseSchema } from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import RowSliderSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";
import NoData from "./NoData";

function TopMovieAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });
  const query = useGetTopAnimeQuery(
    {
      page: 1,
      limit: 10,
      type: "movie",
      filter: "all",
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

  if (isLoading) return <RowSliderSkeleton title="Top Movies" />;
  if (isError || !data?.data.length) return <NoData title="Top Movies" />;
  return (
    <div ref={ref}>
      <SectionSlider title="Top Movies" data={data.data} />
    </div>
  );
}

export default TopMovieAnime;
