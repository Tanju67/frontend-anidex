import { useParams } from "react-router-dom";
import MainCharacter from "./MainCharacter";
import { useGetCharactersByAnimeIdQuery } from "../../shared/api/animeApi";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import { CharactersSchema } from "../../shared/schemas/animeSchema";
import VoiceActor from "./VoiceActor";
import Review from "./Review";
import Episodes from "./Episodes";
import SmilarAnimes from "./SmilarAnimes";
import News from "./News";

function AnimeDetail() {
  const { animeId } = useParams();
  const { data, isLoading } = useGetCharactersByAnimeIdQuery(animeId!);

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  if (!data) return null;

  let parsedData;

  try {
    parsedData = CharactersSchema.parse(data);
  } catch (err) {
    console.error("Zod error:", err);
    return null;
  }

  const filteredData = parsedData.slice(0, 6);
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
