import { useGetAnimeByGenreQuery } from "../../shared/api/animeApi";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { RowSliderSchema } from "../../shared/schemas/animeSchema";
import GridContent from "../../shared/UIElements/gridContent/GridContent";
import GridContentSkeleton from "../../shared/UIElements/skeleton/GridContentSkeleton";
import SectionTitle from "../animeDetail/SectionTitle";

type TopResultsProps = {
  search: string;
};

function TopResults({ search }: TopResultsProps) {
  const trimmed = search.trim();
  const query = useGetAnimeByGenreQuery(
    {
      page: 1,
      limit: 6,
      type: "all",
      search: trimmed,
    },
    {
      skip: search.trim().length < 3,
    },
  );

  const { data, isLoading } = useSafeQuery({
    data: query.data?.data,
    isLoading: query.isLoading,
    schema: RowSliderSchema,
  });

  let content;

  if (isLoading && data?.length === 0) {
    content = <GridContentSkeleton count={6} />;
  } else if (!data?.length && search.trim().length > 2) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    content = <GridContent data={data || []} />;
  }

  return (
    <SectionTitle
      title={`Top results `}
      subTitle={`Top results for "${search}"`}
    >
      {content}
    </SectionTitle>
  );
}

export default TopResults;
