import { Link } from "react-router-dom";
import type { CharacterType } from "../../schemas/animeSchema";
import ImagePlaceholder from "../imagePlaceholder/ImagePlaceholder";

function CharecterContentItem(
  data: CharacterType & {
    isCharacter: boolean;
    isRounded?: boolean;
    isAllCharacters?: boolean;
  },
) {
  const {
    image,
    name,
    isCharacter,
    characterId,
    isRounded,
    defaultVoiceActors,
    isAllCharacters,
  } = data;

  const itemImage = isCharacter ? image : defaultVoiceActors?.image;
  const itemName = isCharacter ? name : defaultVoiceActors?.name;
  const itemId = isCharacter ? characterId : defaultVoiceActors?.id;

  let link = isCharacter ? `characters/${characterId}` : `actors/${itemId}`;
  if (isAllCharacters) link = isCharacter ? `${characterId}` : `${itemId}`;

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
          to={link}
          className={`hover:border-main-btn absolute inset-0 z-10 flex items-center justify-center border-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${isRounded ? "rounded-full" : "rounded-lg"}`}
        ></Link>
      </div>
      <span className="line-clamp-1 flex flex-col items-center">
        <span className="line-clamp-1">{itemName}</span>
        {!isCharacter && <span>({name})</span>}
      </span>
    </li>
  );
}

export default CharecterContentItem;
