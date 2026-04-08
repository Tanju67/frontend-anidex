import { useEffect, useState } from "react";
import { useLazyGetAnimeByGenreQuery } from "../api/animeApi";
import { type RowSliderType } from "../schemas/animeSchema";

type useAnimeSearchProps = {
  search: string;
  type?: "tv" | "movie" | "all";
  limit: number;
};

function useAnimeSearch({ search, type, limit }: useAnimeSearchProps) {
  const [data, setData] = useState<RowSliderType>([]);
  const [getAnimes, { isLoading }] = useLazyGetAnimeByGenreQuery();

  useEffect(() => {
    if (search.trim().length < 3) return;
    let active = true;
    const timeout = setTimeout(async () => {
      try {
        const res = await getAnimes({ page: 1, limit, type, search }).unwrap();
        if (!active) return;
        setData(res.data);
      } catch (e) {
        console.error(e);
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [search, type, limit, getAnimes]);

  return { data, isLoading };
}

export default useAnimeSearch;
