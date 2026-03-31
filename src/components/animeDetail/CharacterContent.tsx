import type { CharactersType } from "../../shared/schemas/animeSchema";
import CharecterContentItem from "./CharecterContentItem";

type CharactersContentProps = {
  data: CharactersType;
  isCharacter: boolean;
};

function CharacterContent({ data, isCharacter }: CharactersContentProps) {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-2 gap-y-6 sm:justify-items-start sm:gap-y-8 md:grid-cols-4 lg:grid-cols-6">
      {data.map((item) => (
        <CharecterContentItem
          key={item.characterId}
          {...item}
          isCharacter={isCharacter}
        />
      ))}
    </ul>
  );
}

export default CharacterContent;
