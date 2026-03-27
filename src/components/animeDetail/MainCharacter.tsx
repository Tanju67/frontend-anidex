import { type CharactersType } from "../../shared/schemas/animeSchema";
import CharacterContent from "./CharacterContent";
import SectionTitle from "./SectionTitle";

type MainCharacterProps = {
  data: CharactersType;
};

function MainCharacter({ data }: MainCharacterProps) {
  return (
    <SectionTitle link="characters" title="Main Characters">
      <CharacterContent data={data} isCharacter={true} />
    </SectionTitle>
  );
}

export default MainCharacter;
