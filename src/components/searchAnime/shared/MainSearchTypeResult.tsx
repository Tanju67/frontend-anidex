import { useSearchParams } from "react-router-dom";
import MainSearchTypeSkeleton from "../../../shared/UIElements/skeleton/MainSearchTypeSkeleton";
import useAnimeSearch from "../../../shared/hooks/useAnimeSearch";
import { useSafeQuery } from "../../../shared/hooks/useSafeQuery";
import { RowSliderSchema } from "../../../shared/schemas/animeSchema";
import SectionTitle from "../../animeDetail/SectionTitle";
import SearchItem from "./SearchItem";

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
  const query = useAnimeSearch({ search, limit: 6, type: type });

  const { data, isLoading } = useSafeQuery({
    data: query.data,
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
