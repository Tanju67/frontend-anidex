import { SlCalender } from "react-icons/sl";
import type { SliderItemType } from "../../shared/schemas/animeSchema";
import { PiTelevision } from "react-icons/pi";

function GeneralDetailContent(props: SliderItemType) {
  const {
    image,
    title,
    year,
    id,
    trailer,
    genres,
    score,
    synopsis,
    episodes,
    duration,
    status,
    background,
  } = props;
  return (
    <section className="p-4">
      <h2 className="mb-2 line-clamp-1 cursor-pointer bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-base font-extrabold tracking-wide text-transparent drop-shadow-lg sm:text-xl md:hidden md:text-3xl lg:mb-4 lg:text-5xl">
        {title}
      </h2>
      {/* 🎯 Content */}
      <div className="relative mx-auto h-full justify-center text-center md:p-12 lg:gap-16 lg:p-4 lg:px-10 xl:py-20">
        <div className="flex items-stretch gap-4 lg:gap-8">
          <div className="">
            <img
              src={image}
              alt=""
              className="h-full w-40 rounded-2xl object-cover md:h-auto md:w-50 lg:w-100"
            />
          </div>
          <div className="flex w-full flex-1 flex-col items-start justify-start gap-1">
            {/* Title */}

            <h2 className="mb-2 hidden cursor-pointer bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-start text-base font-extrabold tracking-wide text-transparent drop-shadow-lg sm:text-xl md:line-clamp-1 md:text-3xl lg:mb-4 lg:text-5xl">
              {title}
            </h2>

            {/* Info */}
            {year && (
              <div className="flex items-center justify-start gap-2 text-start text-xs sm:text-sm md:text-base lg:text-lg">
                <span>
                  <SlCalender />
                </span>
                <span>{year}</span>
              </div>
            )}
            <div className="flex flex-col flex-wrap items-start gap-1 text-start text-xs sm:text-sm md:text-base lg:flex-row lg:text-lg">
              {score && <span>⭐ {score}</span>}
              {episodes && <span>🎞️ {episodes} episodes</span>}
              {duration && <span>⌛ {duration}</span>}
              {status && <span>📺 {status}</span>}
            </div>

            {/* Synopsis */}
            {synopsis && (
              <p className="my-2 line-clamp-3 hidden text-start text-sm italic md:text-base lg:block lg:text-lg">
                {synopsis}
              </p>
            )}

            {genres.length > 0 && (
              <div className="flex items-center gap-2 text-start text-xs sm:text-sm md:text-base lg:text-lg">
                <span className="flex items-center gap-2 md:mr-4">
                  <PiTelevision />{" "}
                  <span className="hidden md:block">Genres:</span>
                </span>
                <span>{genres.join(" | ")}</span>
              </div>
            )}

            {background && (
              <div className="my-2 line-clamp-3 text-start text-xs italic sm:text-sm md:block md:text-base lg:text-lg">
                {background}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-4 flex w-full gap-4 text-sm md:text-base lg:text-lg">
              <button className="bg-main-btn hover:bg-main-btn-hover w-full rounded px-6 py-2 transition md:w-auto">
                ▶ More Info
              </button>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          {synopsis && (
            <p className="my-4 text-start text-xs italic sm:text-sm md:block md:text-base lg:text-lg">
              {synopsis}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default GeneralDetailContent;
