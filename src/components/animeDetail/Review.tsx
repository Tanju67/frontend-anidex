import { useParams } from "react-router-dom";
import { useGetAnimeReviewsByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { ReviewsSchema } from "../../shared/schemas/animeSchema";
import ReviewContentSkeleton from "../../shared/UIElements/skeleton/ReviewContentSkeleton";
import ReviewContent from "./ReviewContent";
import SectionTitle from "./SectionTitle";

function Review() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  const query = useGetAnimeReviewsByIdQuery(
    { id: animeId!, page: 1 },
    { skip: !isVisible || !animeId, refetchOnMountOrArgChange: false },
  );

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data?.data,
    isLoading: query.isLoading,
    schema: ReviewsSchema,
  });

  if (!isVisible) {
    return <div ref={ref} className="min-h-60" />;
  }

  if (isLoading)
    return (
      <SectionTitle title="Reviews" skeleton={true}>
        <ReviewContentSkeleton count={3} />
      </SectionTitle>
    );
  if (isError || !data?.length)
    return (
      <SectionTitle title="Reviews">
        <div className="opacity-60">No data found</div>
      </SectionTitle>
    );

  const filteredData = data.slice(0, 3);

  return (
    <div ref={ref}>
      <SectionTitle link="reviews" title="Reviews">
        <ReviewContent data={filteredData} />
      </SectionTitle>
    </div>
  );
}

export default Review;
