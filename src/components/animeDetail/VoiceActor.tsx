import type { CharactersType } from "../../shared/schemas/animeSchema";
import CharacterContent from "./CharacterContent";
import SectionTitle from "./SectionTitle";

type VoiceActorProps = {
  data: CharactersType;
};

function VoiceActor({ data }: VoiceActorProps) {
  return (
    <SectionTitle link="actors" title="Voice Actors">
      <CharacterContent data={data} isCharacter={false} />
    </SectionTitle>
  );
}

export default VoiceActor;
