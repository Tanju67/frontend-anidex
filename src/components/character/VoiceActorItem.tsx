import { Link, useParams } from "react-router-dom";
import ImagePlaceholder from "../../shared/UIElements/imagePlaceholder/ImagePlaceholder";

function VoiceActorItem({
  id,
  name,
  image,
  language,
  url,
  isCharacter,
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
    <li
      className={`flex flex-col items-center gap-2 ${"w-30 max-[400px]:w-20 lg:w-40 xl:w-50"}`}
    >
      <span className="line-clamp-1 w-full bg-white/10 text-center">
        {language}
      </span>
      <div
        className={`group relative flex flex-col items-center justify-center overflow-hidden ${"h-40 w-30 rounded-lg max-[400px]:h-30 max-[400px]:w-20 md:h-50 lg:h-70 lg:w-40 xl:w-50"}`}
      >
        <ImagePlaceholder
          src={image || ""}
          alt={name}
          className="h-full w-full rounded-lg object-cover object-center"
        />
        <Link
          to={`/anime/${animeId}/actors/${id}`}
          className={`hover:border-main-btn absolute inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:border-2 ${"rounded-lg"}`}
        >
          <span className="bg-main-btn/50 hover:bg-main-btn h-10 w-10 rounded-full transition-colors duration-300"></span>
        </Link>
      </div>
      <span className="line-clamp-1 flex flex-col items-center">
        <span className="line-clamp-1">{name}</span>
      </span>
    </li>
  );
}

export default VoiceActorItem;
