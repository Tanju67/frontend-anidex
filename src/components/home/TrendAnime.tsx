import { useGetCurrentSeasonQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import {
  RowSliderResponseSchema,
  RowSliderSchema,
} from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import RowSliderSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";

function TrendAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });
  const query = useGetCurrentSeasonQuery(
    {
      page: 1,
      limit: 10,
    },
    { skip: !isVisible, refetchOnMountOrArgChange: false },
  );

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: RowSliderResponseSchema,
  });
  console.log(data);

  if (!isVisible) {
    return <div ref={ref} className="min-h-100" />;
  }

  if (isLoading) return <RowSliderSkeleton title="Currently Trending Series" />;
  if (isError || (data && data.data.length === 0))
    return <div className="text-center opacity-60">No data found</div>;
  return (
    <div ref={ref}>
      <SectionSlider
        title="Currently Trending Series"
        data={data?.data ?? []}
      />
    </div>
  );
}

export default TrendAnime;
