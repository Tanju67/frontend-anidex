import { Calendar, Clock, Layers, Star, Tv } from "lucide-react";
import { useState } from "react";
import { PiTelevision } from "react-icons/pi";
import { ToastContainer } from "react-toastify";
import type { SliderItemType } from "../../shared/schemas/animeSchema";
import Button from "../../shared/UIElements/button/Button";
import WatchlistButton from "../../shared/UIElements/button/WatchlistButton";
import Modal from "../../shared/UIElements/modal/Modal";

function GeneralDetailContent(props: SliderItemType) {
  const {
    id,
    image,
    title,
    year,
    trailer,
    genres,
    score,
    synopsis,
    episodes,
    duration,
    status,
    background,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className="section-padding main-text-size relative">
      <h2 className="animeTitle md:hidden!">{title}</h2>
      {/* 🎯 Content */}
      <div className="relative mx-auto h-full justify-center text-center">
        <div className="flex items-stretch gap-4 lg:gap-8">
          <div className="">
            <img
              src={image}
              alt=""
              className="h-full w-40 rounded-2xl object-cover sm:w-70 lg:h-auto lg:w-100"
            />
          </div>
          <div className="flex w-full flex-1 flex-col items-start justify-start gap-1">
            {/* Title */}

            <h2 className="animeTitle hidden! md:line-clamp-1!">{title}</h2>

            {/* Info */}

            <div className="mt-2 flex flex-col flex-wrap gap-2 text-start text-xs md:text-sm lg:flex-row lg:text-base">
              {year && (
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm">
                  <Calendar
                    size={16}
                    strokeWidth={2}
                    className="text-main-btn"
                  />
                  <span className="font-medium">{year}</span>
                </div>
              )}

              {score && (
                <div className="flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 shadow-sm">
                  <Star
                    size={16}
                    strokeWidth={2}
                    className="fill-yellow-500/20 text-yellow-500"
                  />
                  <span className="font-bold text-yellow-500">{score}</span>
                </div>
              )}

              {episodes && (
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm">
                  <Layers size={16} strokeWidth={2} className="text-blue-400" />
                  <span className="font-medium">{episodes} Episodes</span>
                </div>
              )}

              {duration && (
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm">
                  <Clock size={16} strokeWidth={2} className="text-green-400" />
                  <span className="font-medium">{duration}</span>
                </div>
              )}

              {status && (
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 shadow-sm">
                  <Tv size={16} strokeWidth={2} className="text-purple-400" />
                  <span className="font-medium capitalize">{status}</span>
                </div>
              )}
            </div>

            {genres.length > 0 && (
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="text-main-btn flex items-center gap-2 opacity-90">
                  <PiTelevision className="text-lg" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">
                    Genres
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <span
                      key={index}
                      className="hover:border-main-btn/50 hover:bg-main-btn/10 cursor-default rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 transition-all duration-300 hover:text-white sm:text-sm md:text-base"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="my-2 hidden gap-2 sm:flex">
              {trailer && (
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-main-btn hover:bg-main-btn-hover w-full px-4 py-2"
                >
                  ▶ Watch Trailer
                </Button>
              )}

              <WatchlistButton
                id={String(id)}
                title={String(title)}
                image={image}
                trailer={Boolean(trailer)}
              />
            </div>

            {/* Synopsis */}
            {synopsis && (
              <>
                <p
                  className={`hidden text-start italic ${!isExpanded ? "lg:line-clamp-3" : "lg:line-clamp-none"}`}
                >
                  <span className="text-main-btn mr-2 font-bold tracking-widest uppercase">
                    Synopsis:
                  </span>
                  {synopsis}
                </p>
              </>
            )}
            {synopsis && synopsis.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-main-btn mb-4 hidden text-xs font-bold tracking-tighter uppercase transition-colors hover:text-white lg:block"
              >
                {isExpanded ? "Show Less ▲" : "Read More ▼"}
              </button>
            )}
            {background && (
              <div className="border-main-btn hidden rounded-lg border-l-4 bg-white/5 p-4 text-sm text-gray-400 italic lg:block">
                {background}
              </div>
            )}
          </div>
        </div>
        <div className="my-4 flex gap-2 sm:hidden">
          {trailer && (
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-main-btn hover:bg-main-btn-hover w-full px-4 py-2"
            >
              ▶ Watch Trailer
            </Button>
          )}

          <WatchlistButton
            id={String(id)}
            title={String(title)}
            image={image}
            trailer={Boolean(trailer)}
          />
        </div>
        <div className="lg:hidden">
          {synopsis && (
            <p
              className={`mt-4 text-start italic ${!isExpanded ? "line-clamp-3" : "line-clamp-none"}`}
            >
              <span className="text-main-btn mr-2 font-bold tracking-widest uppercase">
                Synopsis:
              </span>
              {synopsis}
            </p>
          )}
          {synopsis && synopsis.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-main-btn mb-4 text-xs font-bold tracking-tighter uppercase transition-colors hover:text-white lg:hidden"
            >
              {isExpanded ? "Show Less ▲" : "Read More ▼"}
            </button>
          )}
          {background && (
            <div className="border-main-btn rounded-lg border-l-4 bg-white/5 p-4 text-sm text-gray-400 italic">
              {background}
            </div>
          )}
        </div>

        <div></div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-[95vw] bg-black sm:w-[80vw] md:w-[70vw] lg:w-[50vw]"
      >
        <div className="aspect-video w-full">
          <iframe
            src={trailer ?? ""}
            title="Trailer"
            className="h-full w-full rounded"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </Modal>
      <ToastContainer />
    </section>
  );
}

export default GeneralDetailContent;
