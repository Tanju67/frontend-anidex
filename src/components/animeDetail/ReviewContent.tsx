import { useState } from "react";
import type { ReviewsType, ReviewType } from "../../shared/schemas/animeSchema";
import ReviewContentItem from "./ReviewContentItem";
import Modal from "../../shared/UIElements/modal/Modal";
import ReviewModalItem from "./ReviewModalItem";

type ReviewContentProps = { data: ReviewsType };

function ReviewContent({ data }: ReviewContentProps) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewType | null>(null);
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <ReviewContentItem
          setSelectedReview={setSelectedReview}
          setIsModelOpen={setIsModelOpen}
          key={index}
          reviewItem={item}
        />
      ))}
      <Modal
        open={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        className="w-[95vw] bg-black sm:w-[80vw] md:w-[70vw] lg:w-[50vw]"
      >
        <ReviewModalItem reviewItem={selectedReview} />
      </Modal>
    </ul>
  );
}

export default ReviewContent;
