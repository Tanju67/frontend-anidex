import { useSearchParams } from "react-router-dom";
import MainSearchTypeSkeleton from "../../../shared/UIElements/skeleton/MainSearchTypeSkeleton";
import { useGetAnimeByGenreQuery } from "../../../shared/api/animeApi";
import { useSafeQuery } from "../../../shared/hooks/useSafeQuery";
import { RowSliderSchema } from "../../../shared/schemas/animeSchema";
import SectionTitle from "../../animeDetail/SectionTitle";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";

type MainSearchTypeResultProps = {
  search: string;
  type: "tv" | "movie";
  title: string;
};

function MainSearchTypeResult({
  search,
  type,
  title,
}: MainSearchTypeResultProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debounced, setDebounced] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 700);
    return () => clearTimeout(t);
  }, [search]);

  const trimmed = debounced.trim();

  const query = useGetAnimeByGenreQuery(
    {
      page: 1,
      limit: 6,
      type: type,
      search: trimmed,
    },
    {
      skip: search.trim().length < 3,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
    },
  );

  const { data, isLoading } = useSafeQuery({
    data: query.data?.data,
    isLoading: query.isLoading,
    schema: RowSliderSchema,
  });

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <SectionTitle title={title}>
        <MainSearchTypeSkeleton count={6} />
      </SectionTitle>
    );
  }

  if (!data?.length && search.trim().length > 2) {
    return (
      <SectionTitle title={title}>
        <div className="opacity-60">No data found</div>
      </SectionTitle>
    );
  }

  return (
    <SectionTitle title={title}>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((item) => (
          <SearchItem key={item.id} {...item} />
        ))}
      </ul>
      <button
        onClick={handleClick}
        className="mt-2 font-bold text-gray-400 transition-colors duration-300 hover:text-white"
      >
        SEE MORE &rarr;
      </button>
    </SectionTitle>
  );
}

export default MainSearchTypeResult;
