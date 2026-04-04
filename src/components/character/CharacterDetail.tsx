import { useParams } from "react-router-dom";
import { useGetSingleCharacterByIdQuery } from "../../shared/api/animeApi";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { PersonSchema } from "../../shared/schemas/animeSchema";
import GeneralDetailContentSkeleton from "../../shared/UIElements/skeleton/GeneralDetailContentSkeleton";
import SectionTitle from "../animeDetail/SectionTitle";
import About from "./About";
import VoiceActors from "./VoiceActors";

function CharacterDetail() {
  const { charId } = useParams();

  const query = useGetSingleCharacterByIdQuery(charId!);

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: PersonSchema,
  });

  if (isLoading)
    return (
      <SectionTitle title={`Character Detail`} skeleton={true}>
        <GeneralDetailContentSkeleton />
      </SectionTitle>
    );
  if (isError || !data)
    return (
      <SectionTitle title={`Character Detail`} isBack={true}>
        <div className="opacity-60">No data found</div>
      </SectionTitle>
    );

  console.log(data);

  return (
    <div className="">
      <SectionTitle title={`Character Detail`} isBack={true}>
        <About data={data} />
      </SectionTitle>
      <SectionTitle
        title={`Voice Actors`}
        subTitle={`All Voice Actors for ${data.name}`}
      >
        <VoiceActors data={data} />
      </SectionTitle>
    </div>
  );
}

export default CharacterDetail;
