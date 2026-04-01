import { SlCalender } from "react-icons/sl";
import type { SliderItemType } from "../../shared/schemas/animeSchema";
import { PiTelevision } from "react-icons/pi";
import Modal from "../../shared/UIElements/modal/Modal";
import { useState } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import Button from "../../shared/UIElements/button/Button";

function GeneralDetailContent(props: SliderItemType) {
  const {
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
              className="h-full w-40 rounded-2xl object-cover md:w-50 lg:w-100"
            />
          </div>
          <div className="flex w-full flex-1 flex-col items-start justify-start gap-1">
            {/* Title */}

            <h2 className="animeTitle hidden md:line-clamp-1">{title}</h2>

            {/* Info */}

            <div className="flex flex-col flex-wrap items-start gap-1 text-start lg:flex-row lg:gap-4">
              {year && (
                <div className="flex items-center justify-start gap-2 text-start">
                  <span>
                    <SlCalender />
                  </span>
                  <span>{year}</span>
                </div>
              )}
              {score && <span>⭐ {score}</span>}
              {episodes && <span>🎞️ {episodes} episodes</span>}
              {duration && <span>⌛ {duration}</span>}
              {status && <span>📺 {status}</span>}
            </div>

            {genres.length > 0 && (
              <div className="flex items-center gap-2 text-start">
                <span className="flex items-center gap-2 md:mr-4">
                  <PiTelevision />{" "}
                  <span className="hidden md:block">Genres:</span>
                </span>
                <span>{genres.join(" | ")}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="my-2 flex gap-2">
              {trailer && (
                <Button
                  onClick={() => setIsOpen(true)}
                  className="bg-main-btn hover:bg-main-btn-hover w-full px-4 py-2"
                >
                  ▶ Watch Trailer
                </Button>
              )}

              <Button
                className={
                  trailer
                    ? `border-main-btn text-main-btn hover:bg-main-btn-hover content-center-x gap-2 border-2 px-2 hover:text-white`
                    : "bg-main-btn hover:bg-main-btn-hover w-full px-4 py-2"
                }
              >
                <span
                  className={
                    !trailer
                      ? "flex w-50 items-center justify-center gap-2"
                      : ""
                  }
                >
                  {!trailer && <span>Add to Watchlist</span>}
                  <BsBookmarkPlusFill />
                </span>
              </Button>
            </div>

            {/* Synopsis */}
            {synopsis && (
              <p className="my-2 line-clamp-3 hidden text-start italic lg:block">
                {synopsis}
              </p>
            )}

            {background && (
              <div className="my-2 line-clamp-3 text-start italic md:line-clamp-3 lg:block">
                {background}
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          {synopsis && (
            <p className="my-4 text-start italic md:block">{synopsis}</p>
          )}
        </div>
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
    </section>
  );
}

export default GeneralDetailContent;
