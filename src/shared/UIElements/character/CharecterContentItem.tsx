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
    <li className="w-full list-none">
      <div
        className={`group relative overflow-hidden bg-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-black/40 ${isRounded ? "aspect-square rounded-full shadow-inner" : "aspect-2/3 rounded-xl shadow-md"}`}
      >
        {/* Resim */}
        <ImagePlaceholder
          src={itemImage || ""}
          alt={itemName || ""}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <Link
          to={link}
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${isRounded ? "rounded-full" : "rounded-xl"}`}
        >
          <span className="bg-main-btn rounded-full p-2 text-white shadow-lg transition-transform duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </span>
          {!isRounded && (
            <span className="mt-2 text-[10px] font-bold tracking-widest text-white/80 uppercase">
              View Profile
            </span>
          )}
        </Link>
      </div>

      {/* İsim Alanı */}
      <div className="mt-3 flex flex-col items-center text-center">
        <span className="main-text-size group-hover:text-main-btn w-full truncate font-semibold text-gray-200 transition-colors">
          {itemName}
        </span>

        {!isCharacter && (
          <span className="mt-0.5 w-full truncate text-[10px] font-medium tracking-tight text-white/40 uppercase italic">
            as {name}
          </span>
        )}
      </div>
    </li>
  );
}

export default CharecterContentItem;
