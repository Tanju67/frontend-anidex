import { useGetSimilarAnimesByIdQuery } from "../../shared/api/animeApi";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { RecommendationsSchema } from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import RowSliderSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";

function SmilarAnimeItem({
  animeId,
  title,
}: {
  animeId: string;
  title: string;
}) {
  const query = useGetSimilarAnimesByIdQuery(animeId);

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: RecommendationsSchema,
  });

  if (isLoading) return <RowSliderSkeleton title="Smilar Animes" />;
  if (isError || !data?.length)
    return <div className="opacity-60">No data found</div>;

  const slicedData = data?.slice(0, 10);
  return (
    <div>
      <p className="mb-2">Inspired by your watchlist: Similar to {title}</p>
      <SectionSlider data={slicedData ?? []} />
    </div>
  );
}

export default SmilarAnimeItem;
