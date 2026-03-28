import { useParams } from "react-router-dom";
import { useGetAnimeNewsByIdQuery } from "../../shared/api/animeApi";
import { AllNewsSchema } from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import NewsContent from "./NewsContent";
import SectionTitle from "./SectionTitle";

function News() {
  const { animeId } = useParams();
  const { data, isLoading } = useGetAnimeNewsByIdQuery(animeId!);
  console.log(data);

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );
  if (!data) return null;
  let parsedData;

  try {
    parsedData = AllNewsSchema.parse(data);
  } catch (err) {
    console.error("Zod error:", err);
    return null;
  }

  const filteredData = parsedData.slice(0, 6);
  return (
    <SectionTitle
      title="Anime News"
      subTitle="Read the latest news related to this anime"
    >
      <NewsContent data={filteredData} />
    </SectionTitle>
  );
}

export default News;
