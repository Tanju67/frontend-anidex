import { Link, useParams } from "react-router-dom";
import ImagePlaceholder from "../../shared/UIElements/imagePlaceholder/ImagePlaceholder";

function VoiceActorItem({
  id,
  name,
  image,
  language,
}: {
  id: number;
  name: string;
  image: string;
  language: string;
  url: string;
  isCharacter?: boolean;
}) {
  const { animeId } = useParams();

  return (
    <li className="group flex w-full flex-col gap-2">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl bg-white/5 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-black/40">
        <div className="absolute top-2 right-2 z-20">
          <span className="text-main-btn rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-black tracking-widest uppercase backdrop-blur-md">
            {language}
          </span>
        </div>

        <ImagePlaceholder
          src={image || ""}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        <Link
          to={`/anime/${animeId}/actors/${id}`}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="bg-main-btn flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </div>
          <span className="mt-2 text-[10px] font-bold tracking-tighter text-white uppercase">
            View Actor
          </span>
        </Link>
      </div>

      <div className="flex flex-col items-center px-1 text-center">
        <span className="main-text-size group-hover:text-main-btn line-clamp-1 font-semibold text-gray-200 transition-colors">
          {name}
        </span>
      </div>
    </li>
  );
}

export default VoiceActorItem;
