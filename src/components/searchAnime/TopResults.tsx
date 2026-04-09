import { useEffect, useState } from "react";
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

  if (isLoading && data?.length === 0) {
    return (
      <SectionTitle
        title={`Top results `}
        subTitle={`Top results for "${search}"`}
      >
        <GridContentSkeleton count={6} />
      </SectionTitle>
    );
  }

  if (!data?.length && search.trim().length > 2) {
    return (
      <SectionTitle
        title={`Top results `}
        subTitle={`Top results for "${search}"`}
      >
        <div className="opacity-60">No data found</div>
      </SectionTitle>
    );
  }

  return (
    <SectionTitle
      title={`Top results `}
      subTitle={`Top results for "${search}"`}
    >
      <GridContent data={data ?? []} />
    </SectionTitle>
  );
}

export default TopResults;
