import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAnimeNewsByIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  AllNewsSchema,
  type AllNewsType,
} from "../../shared/schemas/animeSchema";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import NewsContent from "./NewsContent";
import SectionTitle from "./SectionTitle";

function News() {
  const { animeId } = useParams();
  const { ref, isVisible } = useInView({ rootMargin: "300px" });

  // skip ile görünür değilken fetch yapılmaz
  const { data, isLoading, isFetching } = useGetAnimeNewsByIdQuery(animeId!, {
    skip: !isVisible || !animeId,
    refetchOnMountOrArgChange: false,
  });

  let parsedData: AllNewsType = [];
  if (data) {
    try {
      parsedData = AllNewsSchema.parse(data);
    } catch (err) {
      console.error("Zod error:", err);
    }
  }

  const filteredData = parsedData.slice(0, 6);

  let content;

  if (isLoading || isFetching) {
    content = <PageSpinner className="min-h-60" />;
  } else if (!filteredData || filteredData.length === 0) {
    content = <p className="text-sm opacity-70">No smilar animes found</p>;
  } else {
    content = <NewsContent data={filteredData} />;
  }
  return (
    <div ref={ref}>
      <SectionTitle
        title="Anime News"
        subTitle="Read the latest news related to this anime"
      >
        {content}
      </SectionTitle>
    </div>
  );
}

export default News;
