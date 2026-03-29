import { Link } from "react-router-dom";
import type { CharacterType } from "../../shared/schemas/animeSchema";
import ImagePlaceholder from "../../shared/UIElements/imagePlaceholder/ImagePlaceholder";

function CharecterContentItem(data: CharacterType & { isCharacter: boolean }) {
  const { image, name, isCharacter, voiceActor, characterId } = data;

  const itemImage = isCharacter ? image : voiceActor?.image;
  const itemName = isCharacter ? name : voiceActor?.name;
  const itemId = isCharacter ? characterId : voiceActor?.id;

  return (
    <li
      className={`flex flex-col items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg ${isCharacter ? "w-30 max-[400px]:w-20 lg:w-40 xl:w-50" : "w-30 max-[400px]:w-20 lg:w-40 xl:w-50"}`}
    >
      <div
        className={`group relative flex flex-col items-center justify-center overflow-hidden ${isCharacter ? "h-30 w-30 rounded-full max-[400px]:h-20 max-[400px]:w-20 lg:h-40 lg:w-40 xl:h-50 xl:w-50" : "h-40 w-30 rounded-lg max-[400px]:h-30 max-[400px]:w-20 md:h-50 lg:h-70 lg:w-40 xl:w-50"}`}
      >
        <ImagePlaceholder
          src={itemImage || ""}
          alt={name}
          className="h-full w-full rounded-lg object-cover object-center"
        />
        <Link
          to={isCharacter ? `characters/${itemId}` : `actors/${itemId}`}
          className={`hover:border-main-btn absolute inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:border-2 ${isCharacter ? "rounded-full" : "rounded-lg"}`}
        >
          <span className="bg-main-btn/50 hover:bg-main-btn h-10 w-10 rounded-full transition-colors duration-300"></span>
        </Link>
      </div>
      <span className="line-clamp-1 flex flex-col items-center text-xs sm:text-sm md:text-base lg:text-lg">
        <span className="line-clamp-1">{itemName}</span>
        {!isCharacter && <span>({name})</span>}
      </span>
    </li>
  );
}

export default CharecterContentItem;
