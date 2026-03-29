import { useParams } from "react-router-dom";
import { useGetAnimeReviewsByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  ReviewsSchema,
  type ReviewsType,
} from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import ReviewContent from "./ReviewContent";
import SectionTitle from "./SectionTitle";

function Review() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  // skip ile görünür değilken fetch yapılmaz
  const { data, isLoading, isFetching } = useGetAnimeReviewsByIdQuery(
    { id: animeId!, page: 1 },
    { skip: !isVisible || !animeId, refetchOnMountOrArgChange: false },
  );

  let parsedData: ReviewsType = [];
  if (data?.data) {
    try {
      parsedData = ReviewsSchema.parse(data.data);
    } catch (err) {
      console.error("Zod error:", err);
    }
  }

  const filteredData = parsedData.slice(0, 3);

  let content;

  if (isLoading || isFetching) {
    content = <PageSpinner className="min-h-60" />;
  } else if (!filteredData || filteredData.length === 0) {
    content = <p className="text-sm opacity-70">No reviews found</p>;
  } else {
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
