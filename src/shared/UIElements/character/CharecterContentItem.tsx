import { Link } from "react-router-dom";
import type { CharacterType } from "../../schemas/animeSchema";
import ImagePlaceholder from "../imagePlaceholder/ImagePlaceholder";

function CharecterContentItem(
  data: CharacterType & { isCharacter: boolean; isRounded?: boolean },
) {
  const {
    image,
    name,
    isCharacter,
    characterId,
    isRounded,
    defaultVoiceActors,
  } = data;

  const itemImage = isCharacter ? image : defaultVoiceActors?.image;
  const itemName = isCharacter ? name : defaultVoiceActors?.name;
  const itemId = isCharacter ? characterId : defaultVoiceActors?.id;

  return (
    <li className={`w-full`}>
      <div
        className={`group relative overflow-hidden ${isRounded ? "aspect-square rounded-full" : "aspect-2/3 rounded-lg"}`}
      >
        <ImagePlaceholder
          src={itemImage || ""}
          alt={name}
          className="h-full w-full rounded-lg object-cover object-center"
        />
        <Link
          to={isCharacter ? `characters/${itemId}` : `actors/${itemId}`}
          className={`hover:border-main-btn absolute inset-0 z-10 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:border-2 ${isRounded ? "rounded-full" : "rounded-lg"}`}
        >
          <span className="bg-main-btn/50 hover:bg-main-btn h-10 w-10 rounded-full transition-colors duration-300"></span>
        </Link>
      </div>
      <span className="line-clamp-1 flex flex-col items-center">
        <span className="line-clamp-1">{itemName}</span>
        {!isCharacter && <span>({name})</span>}
      </span>
    </li>
  );
}

export default CharecterContentItem;
