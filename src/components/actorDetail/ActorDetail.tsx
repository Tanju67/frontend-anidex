import { useParams } from "react-router-dom";
import { useGetPeopleFullByIdQuery } from "../../shared/api/animeApi";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { VoiceActorDetailSchema } from "../../shared/schemas/animeSchema";
import GeneralDetailContentSkeleton from "../../shared/UIElements/skeleton/GeneralDetailContentSkeleton";
import SectionTitle from "../animeDetail/SectionTitle";
import ActorDetailContent from "./ActorDetailContent";

function ActorDetail() {
  const { charId } = useParams();
  const query = useGetPeopleFullByIdQuery(charId!);
  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: VoiceActorDetailSchema,
  });

  let content;

  if (isLoading) {
    content = <GeneralDetailContentSkeleton />;
  } else if (isError || !data) {
    content = <div className="opacity-60">No data found</div>;
  } else {
    content = <ActorDetailContent data={data} />;
  }

  return (
    <SectionTitle title={`Voice Actor Detail`} isBack={true}>
      {content}
    </SectionTitle>
  );
}

export default ActorDetail;
