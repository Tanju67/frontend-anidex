import type { ReviewType } from "../../shared/schemas/animeSchema";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { formatDate } from "../../shared/utils/helper";
import { useState } from "react";
import Button from "../../shared/UIElements/button/Button";

type Props = {
  reviewItem: ReviewType;
  setSelectedReview: React.Dispatch<React.SetStateAction<ReviewType | null>>;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewContentItem({
  reviewItem,
  setSelectedReview,
  setIsModelOpen,
}: Props) {
  const { name, date, image, spoiler, review, score, like, dislike } =
    reviewItem;
  const [isSpoilerHidden, setIsSpoilerHidden] = useState(spoiler);

  return (
    <li className="group relative flex flex-col gap-4 rounded-xl border border-white/15 bg-white/10 p-5 transition-all hover:bg-white/6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="h-10 w-10 rounded-full border border-white/10 object-cover shadow-sm sm:h-12 sm:w-12"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold md:text-base">{name}</span>
            <span className="text-xs font-medium text-yellow-500/90 md:text-sm">
              ⭐ {score}/10
            </span>
          </div>
        </div>
        <div className="text-xs font-medium tracking-wider text-white/30 uppercase md:text-sm">
          {formatDate(date)}
        </div>
      </div>

      {/* Orta Kısım: İnceleme Metni */}
      <div className="relative overflow-hidden rounded-lg">
        <p
          className={`leading-relaxed ${isSpoilerHidden ? "blur-md select-none" : "line-clamp-4"}`}
        >
          {review}
        </p>

        {isSpoilerHidden && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
            <span className="mb-2 text-[10px] font-black tracking-[0.2em] text-red-500 uppercase">
              Spoiler Alert
            </span>
            <button
              onClick={() => setIsSpoilerHidden(false)}
              className="rounded-full bg-white px-4 py-1.5 text-[10px] font-bold text-black uppercase transition-transform hover:scale-105 active:scale-95"
            >
              Show Review
            </button>
          </div>
        )}
      </div>

      {/* Alt Kısım: Aksiyonlar */}
      <div className="mt-auto flex items-center justify-between pt-2">
        <Button
          onClick={() => {
            setSelectedReview(reviewItem);
            setIsModelOpen(true);
          }}
          className="bg-main-btn/10 text-main-btn hover:bg-main-btn border-main-btn/20 border px-4 py-1.5 text-xs font-bold uppercase transition-all hover:text-white md:text-sm lg:text-base"
        >
          Read Full Review
        </Button>

        <div className="flex gap-4 text-white/40">
          <button className="flex items-center gap-1.5 text-xs transition-colors hover:text-green-500">
            <SlLike className="text-sm" />
            <span className="font-medium">{like}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs transition-colors hover:text-red-500">
            <SlDislike className="text-sm" />
            <span className="font-medium">{dislike}</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default ReviewContentItem;
