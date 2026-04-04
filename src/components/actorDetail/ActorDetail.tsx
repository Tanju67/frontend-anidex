import { useParams } from "react-router-dom";
import { useGetPeopleFullByIdQuery } from "../../shared/api/animeApi";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { VoiceActorDetailSchema } from "../../shared/schemas/animeSchema";
import GeneralDetailContentSkeleton from "../../shared/UIElements/skeleton/GeneralDetailContentSkeleton";
import SectionTitle from "../animeDetail/SectionTitle";
import ActorDetailContent from "./ActorDetailContent";

function ActorDetail() {
  const { charId } = useParams();
  console.log(charId);

  const query = useGetPeopleFullByIdQuery(charId!);
  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: VoiceActorDetailSchema,
  });

  if (isLoading)
    return (
      <SectionTitle skeleton={true} title="Voice Actor Detail">
        <GeneralDetailContentSkeleton />
      </SectionTitle>
    );
  if (isError || !data)
    return (
      <SectionTitle title="Voice Actor Detail" isBack={true}>
        <div className="opacity-60">No data found</div>
      </SectionTitle>
    );

  console.log(data);
  return (
    <SectionTitle title={`Voice Actor Detail`} isBack={true}>
      <ActorDetailContent data={data} />
    </SectionTitle>
  );
}

export default ActorDetail;
