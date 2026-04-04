import type { CharactersType } from "../../schemas/animeSchema";
import CharecterContentItem from "./CharecterContentItem";

type CharactersContentProps = {
  data: CharactersType;
  isCharacter: boolean;
  isRounded?: boolean;
};

function CharacterContent({
  data,
  isCharacter,
  isRounded,
}: CharactersContentProps) {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-4 gap-y-6 sm:justify-items-start sm:gap-y-8 md:grid-cols-4 md:gap-10 lg:grid-cols-6">
      {data.map((item) => (
        <CharecterContentItem
          key={item.characterId}
          {...item}
          isCharacter={isCharacter}
          isRounded={isRounded}
        />
      ))}
    </ul>
  );
}

export default CharacterContent;
