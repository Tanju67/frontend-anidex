import { useGetRecentPromosQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { AllPromosSchema } from "../../shared/schemas/animeSchema";
import RowSliderSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";
import TrailerContent from "./TrailerContent";

function Trailer() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });
  const query = useGetRecentPromosQuery(
    { page: 1 },
    { skip: !isVisible, refetchOnMountOrArgChange: false },
  );

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data?.data,
    isLoading: query.isLoading,
    schema: AllPromosSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-100" />;
  }

  if (isLoading) return <RowSliderSkeleton title="Top Movies" />;
  if (isError || !data?.length)
    return <div className="text-center opacity-60">No data found</div>;

  const slicedData = data.slice(0, 6);
  return (
    <div ref={ref} className="section-padding main-text-size">
      <h2 className="section-title-size mb-2 font-bold md:mb-4">
        Watch Recent Trailers
      </h2>
      <TrailerContent data={slicedData} />
      <button className="mt-2 font-bold text-gray-400 transition-colors duration-300 hover:text-white">
        SEE MORE &rarr;
      </button>
    </div>
  );
}

export default Trailer;
