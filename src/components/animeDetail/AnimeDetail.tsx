import { useParams } from "react-router-dom";
import { useGetCharactersByAnimeIdQuery } from "../../shared/api/animeApi";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { CharactersSchema } from "../../shared/schemas/animeSchema";
import CardSkeleton from "../../shared/UIElements/skeleton/RowSliderSkeleton";
import Episodes from "./Episodes";
import MainCharacter from "./MainCharacter";
import News from "./News";
import Review from "./Review";
import SmilarAnimes from "./SmilarAnimes";
import VoiceActor from "./VoiceActor";
import CharacterContentSkeleton from "../../shared/UIElements/skeleton/CharacterContentSkeleton";

function AnimeDetail() {
  const { animeId } = useParams();
  const query = useGetCharactersByAnimeIdQuery(animeId!);

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: CharactersSchema,
  });

  if (isLoading) return <CharacterContentSkeleton />;
  if (isError || !data?.length)
    return <div className="text-center opacity-60">No data found</div>;

  const filteredData = data.slice(0, 6);
  return (
    <div>
      <div className="mx-auto max-w-400">
        <MainCharacter data={filteredData} />
        <VoiceActor data={filteredData} />
        <Review />
        <Episodes />
        <SmilarAnimes />
        <News />
      </div>
    </div>
  );
}

export default AnimeDetail;
