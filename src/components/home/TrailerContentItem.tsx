import { FaPlay } from "react-icons/fa";
import type { PromoType } from "../../shared/schemas/animeSchema";
import Modal from "../../shared/UIElements/modal/Modal";
import { useState } from "react";

function TrailerContentItem({
  id,
  animeTitle,
  promoTitle,
  thumbnail,
  videoUrl,
}: PromoType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="group bg-main/5 border-main/10 hover:border-main/40 main-text-size relative overflow-hidden rounded-2xl border transition-all duration-300">
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/20">
        <img
          src={thumbnail}
          alt={promoTitle}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0">
          <div
            onClick={() => setIsOpen(true)}
            className="bg-main-btn scale-75 transform rounded-full p-4 text-white shadow-2xl transition-transform duration-300 group-hover:scale-100"
          >
            <FaPlay size={20} />
          </div>
        </div>

        {/* PV Badge */}
        <span className="absolute right-2 bottom-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white uppercase backdrop-blur-sm">
          {promoTitle}
        </span>
      </div>

      {/* Info Area */}
      <div className="to-main/5 bg-linear-to-b from-transparent p-4">
        <h4 className="text-text-dark group-hover:text-main line-clamp-1 text-sm font-black tracking-tighter uppercase italic transition-colors">
          {animeTitle}
        </h4>
        <p className="text-main-dark/50 mt-1 text-[10px] font-bold tracking-[0.2em] uppercase">
          Latest Promotion
        </p>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-[95vw] bg-black sm:w-[80vw] md:w-[70vw] lg:w-[50vw]"
      >
        <div className="aspect-video w-full">
          <iframe
            src={videoUrl ?? ""}
            title="Trailer"
            className="h-full w-full rounded"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </Modal>
    </div>
  );
}

export default TrailerContentItem;
