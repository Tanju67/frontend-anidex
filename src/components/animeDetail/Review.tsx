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

  let content;
  let filteredData;

  if (isLoading) {
    content = <ReviewContentSkeleton count={3} />;
  } else if (isError || !data?.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    filteredData = data.slice(0, 3);
    content = <ReviewContent data={filteredData} />;
  }

  return (
    <div ref={ref}>
      <SectionTitle link="reviews" title="Reviews">
        {content}
      </SectionTitle>
    </div>
  );
}

export default Review;
