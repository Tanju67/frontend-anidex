import type { PersonType } from "../../shared/schemas/animeSchema";
import VoiceActorItem from "./VoiceActorItem";

type Props = {
  data: PersonType;
};
function VoiceActors({ data }: Props) {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-2 gap-y-6 sm:justify-items-start sm:gap-y-8 md:grid-cols-4 lg:grid-cols-6">
      {data.voiceActors.map((item) => (
        <VoiceActorItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default VoiceActors;
