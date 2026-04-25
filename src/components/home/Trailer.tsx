import { useGetRecentPromosQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { AllPromosSchema } from "../../shared/schemas/animeSchema";
import Button from "../../shared/UIElements/button/Button";
import TrailerSkeleton from "../../shared/UIElements/skeleton/TrailerSkeleton";
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

  let slicedData;

  let content;

  if (isLoading) {
    content = <TrailerSkeleton />;
  } else if (isError || !data?.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    slicedData = data.slice(0, 6);
    content = (
      <>
        <TrailerContent data={slicedData} />
        <Button
          isLink={true}
          link="/trailer"
          className="mt-2 font-bold text-gray-400 transition-colors duration-300 hover:text-white"
        >
          SEE MORE &rarr;
        </Button>
      </>
    );
  }

  return (
    <div ref={ref} className="section-padding main-text-size">
      <h2 className="section-title-size mb-2 font-bold md:mb-4">
        Watch Recent Trailers
      </h2>
      {content}
    </div>
  );
}

export default Trailer;
