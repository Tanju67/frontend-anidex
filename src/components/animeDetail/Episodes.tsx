import { useParams } from "react-router-dom";
import { useGetAnimeEpisodesByIdQuery } from "../../shared/api/animeApi";
import { EpisodesSchema } from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import { da } from "zod/v4/locales";

function Episodes() {
  const { animeId } = useParams();

  const { data, isLoading } = useGetAnimeEpisodesByIdQuery({
    id: animeId || "",
    page: 1,
  });
  if (!data || !data.data) return null;

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  let parsedData;

  try {
    parsedData = EpisodesSchema.parse(data.data);
  } catch (err) {
    console.error("Zod error:", err);
    return null;
  }

  const filteredData = parsedData.slice(0, 5);
  console.log(filteredData);
  return <div>Episodes</div>;
}

export default Episodes;
