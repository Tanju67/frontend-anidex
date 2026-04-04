import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCharactersByAnimeIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { CharactersSchema } from "../../shared/schemas/animeSchema";
import Character from "../../shared/UIElements/character/Character";

import CharacterContentSkeleton from "../../shared/UIElements/skeleton/CharacterContentSkeleton";
import SectionTitle from "../animeDetail/SectionTitle";

function AllCharacters() {
  const { animeId } = useParams();
  const [visibleCount, setVisibleCount] = useState(12);

  const query = useGetCharactersByAnimeIdQuery(animeId!);

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: CharactersSchema,
  });

  const loadMore = useCallback(() => {
    if (!data) return;

    setVisibleCount((prev) => Math.min(prev + 12, data.length));
  }, [data]);

  const { ref } = useInView({
    onEnter: loadMore,
    triggerOnce: false,
  });

  const visibleCharacters = data?.slice(0, visibleCount) ?? [];

  if (isLoading)
    return (
      <SectionTitle title="All Characters" skeleton={true}>
        <CharacterContentSkeleton isCharacter={false} />
      </SectionTitle>
    );
  if (isError || !data?.length)
    return (
      <SectionTitle title="All Characters" isBack={true}>
        <div className="text-center opacity-60">No data found</div>
      </SectionTitle>
    );

  return (
    <div className="max-w-400rem mx-auto">
      <Character
        isCharacter={true}
        title="All Characters"
        data={visibleCharacters}
        isBack={true}
      />

      {visibleCount < data.length && <div ref={ref} className="h-20" />}
    </div>
  );
}

export default AllCharacters;
