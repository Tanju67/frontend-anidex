import { useParams } from "react-router-dom";
import { useGetAnimeEpisodesByIdQuery } from "../../shared/api/animeApi";
import { EpisodesSchema } from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import EpisodesContent from "./EpisodesContent";
import SectionTitle from "./SectionTitle";

function Episodes() {
  const { animeId } = useParams();

  const { data, isLoading } = useGetAnimeEpisodesByIdQuery({
    id: animeId || "",
    page: 1,
  });

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  if (!data || !data.data) return null;

  let parsedData;

  try {
    parsedData = EpisodesSchema.parse(data.data);
  } catch (err) {
    console.error("Zod error:", err);
    return null;
  }

  const filteredData = parsedData.slice(0, 6);

  return (
    <SectionTitle link="episodes" title="Episodes">
      <EpisodesContent data={filteredData} />
    </SectionTitle>
  );
}

export default Episodes;
