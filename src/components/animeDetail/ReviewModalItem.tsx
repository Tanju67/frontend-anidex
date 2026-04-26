import { SlDislike, SlLike } from "react-icons/sl";
import type { ReviewType } from "../../shared/schemas/animeSchema";
import { formatDate } from "../../shared/utils/helper";

interface ReviewModalItemProps {
  reviewItem: ReviewType | null;
}

function ReviewModalItem({ reviewItem }: ReviewModalItemProps) {
  if (!reviewItem) return null;

  const { name, date, image, review, score, like, dislike } = reviewItem;

  return (
    <div className="flex h-full max-h-[80vh] flex-col">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="border-main-btn/30 h-12 w-12 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <span className="text-lg leading-none font-bold text-gray-100">
              {name}
            </span>
            <span className="mt-1 text-sm font-medium text-yellow-500">
              ⭐ {score}/10
            </span>
          </div>
        </div>
        <div className="text-xs font-semibold tracking-widest text-white/30 uppercase">
          {formatDate(date)}
        </div>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
        <p className="main-text-size leading-relaxed whitespace-pre-line text-gray-300 italic">
          {review}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-end gap-6 border-t border-white/10 pt-4 text-white/50">
        <div className="flex items-center gap-2 transition-colors hover:text-green-500">
          <SlLike className="text-lg" />
          <span className="font-bold">{like}</span>
        </div>
        <div className="flex items-center gap-2 transition-colors hover:text-red-500">
          <SlDislike className="text-lg" />
          <span className="font-bold">{dislike}</span>
        </div>
      </div>
    </div>
  );
}

export default ReviewModalItem;
