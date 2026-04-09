import CharacterContent from "./CharacterContent";
import SectionTitle from "../../../components/animeDetail/SectionTitle";
import type { CharactersType } from "../../schemas/animeSchema";

type CharacterProps = {
  data: CharactersType;
  isCharacter: boolean;
  isRounded?: boolean;
  link?: string;
  title: string;
  isBack?: boolean;
  isAllCharacters?: boolean;
};

function Character({
  data,
  isCharacter,
  isRounded,
  link,
  title,
  isBack = false,
  isAllCharacters,
}: CharacterProps) {
  console.log(data);
  return (
    <SectionTitle link={link} title={title} isBack={isBack}>
      <CharacterContent
        data={data}
        isCharacter={isCharacter}
        isRounded={isRounded}
        isAllCharacters={isAllCharacters}
      />
    </SectionTitle>
  );
}

export default Character;
