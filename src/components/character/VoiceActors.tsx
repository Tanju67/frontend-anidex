import type { PersonType } from "../../shared/schemas/animeSchema";
import VoiceActorItem from "./VoiceActorItem";

type Props = {
  data: PersonType;
};
function VoiceActors({ data }: Props) {
  return (
    <ul className="grid grid-cols-3 justify-items-center gap-4 gap-y-6 sm:justify-items-start sm:gap-y-8 md:grid-cols-4 md:gap-8 lg:grid-cols-6 lg:gap-10">
      {data.voiceActors.map((item) => (
        <VoiceActorItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

export default VoiceActors;
