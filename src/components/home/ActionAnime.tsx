import { useGetAnimeByGenreQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import {
  RowSliderSchema,
  type RowSliderType,
} from "../../shared/schemas/animeSchema";
import SectionSlider from "../../shared/UIElements/sectionSlider/SectionSlider";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";

function ActionAnime() {
  const { ref, isVisible } = useInView({ rootMargin: "50px" });
  const { data, isLoading, isFetching } = useGetAnimeByGenreQuery(
    {
      page: 1,
      limit: 10,
      genre: 1,
    },
    { skip: !isVisible, refetchOnMountOrArgChange: false },
  );

  let parsedData: RowSliderType = [];

  try {
    if (data) {
      parsedData = RowSliderSchema.parse(data);
    }
  } catch (zodError) {
    console.error("Zod validation failed:", zodError);
    return null; // Hata middleware ile error page’e gider
  }

  let content;

  if (isLoading || isFetching) {
    content = <PageSpinner className="min-h-60" />;
  } else if (!parsedData || parsedData.length === 0) {
    content = <p className="text-sm opacity-70">No reviews found</p>;
  } else {
    content = <SectionSlider title="Explore Action Series" data={parsedData} />;
  }

  return (
    <div className="min-h-100" ref={ref}>
      {content}
    </div>
  );
}

export default ActionAnime;
