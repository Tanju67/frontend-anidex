import { useParams } from "react-router-dom";
import { useGetAnimeReviewsByIdQuery } from "../../shared/api/animeApi";
import { ReviewsSchema } from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import ReviewContent from "./ReviewContent";
import SectionTitle from "./SectionTitle";

function Review() {
  const { animeId } = useParams();

  const { data, isLoading } = useGetAnimeReviewsByIdQuery({
    id: animeId || "",
    page: 1,
  });
  if (!data) return null;

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  let parsedData;

  try {
    parsedData = ReviewsSchema.parse(data.data);
  } catch (err) {
    console.error("Zod error:", err);
    return null;
  }

  const filteredData = parsedData.slice(0, 3);
  console.log(filteredData);
  return (
    <SectionTitle link="reviews" title="Reviews">
      <ReviewContent data={filteredData} />
    </SectionTitle>
  );
}

export default Review;
