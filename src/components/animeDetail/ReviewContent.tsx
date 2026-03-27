import type { ReviewsType } from "../../shared/schemas/animeSchema";
import ReviewContentItem from "./ReviewContentItem";

type ReviewContentProps = { data: ReviewsType };

function ReviewContent({ data }: ReviewContentProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <ReviewContentItem key={index} {...item} />
      ))}
    </ul>
  );
}

export default ReviewContent;
