import type { SliderItemType } from "../../shared/schemas/animeSchema";
import GeneralDetailContent from "./GeneralDetailContent";

type GeneralDetailProps = {
  data: SliderItemType;
};

function GeneralDetail({ data }: GeneralDetailProps) {
  return <GeneralDetailContent {...data} />;
}

export default GeneralDetail;
