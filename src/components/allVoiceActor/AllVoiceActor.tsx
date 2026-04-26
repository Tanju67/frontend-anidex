import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCharactersByAnimeIdQuery } from "../../shared/api/animeApi";
import { useInView } from "../../shared/hooks/useInView";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { CharactersSchema } from "../../shared/schemas/animeSchema";
import Character from "../../shared/UIElements/character/Character";
import CharacterContentSkeleton from "../../shared/UIElements/skeleton/CharacterContentSkeleton";

function AllVoiceActor() {
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

  let visibleCharacters;
  let content;

  if (isLoading) {
    content = <CharacterContentSkeleton isCharacter={false} />;
  } else if (isError || !data?.length) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    visibleCharacters = data?.slice(0, visibleCount);
    content = (
      <Character
        isCharacter={false}
        title="All Voice Actors"
        data={visibleCharacters}
        isBack={true}
      />
    );
  }

  return (
    <div className="max-w-400rem mx-auto">
      {content}

      {data && visibleCount < data.length && <div ref={ref} className="h-20" />}
    </div>
  );
}

export default AllVoiceActor;
