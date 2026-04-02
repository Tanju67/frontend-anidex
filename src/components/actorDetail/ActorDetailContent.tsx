import type { VoiceActorDetailType } from "../../shared/schemas/animeSchema";
import ImagePlaceholder from "../../shared/UIElements/imagePlaceholder/ImagePlaceholder";
import { formatDate } from "../../shared/utils/helper";
import { FaLink } from "react-icons/fa";

type ActorDetailContentProps = {
  data: VoiceActorDetailType;
};

function ActorDetailContent({ data }: ActorDetailContentProps) {
  const { about, birthday, image, name, website } = data;
  return (
    <div className="min-h-50 md:min-h-80 lg:min-h-120">
      <div className="float-left h-full pr-4 pb-2 sm:pr-6 md:pr-8 lg:pr-10">
        <ImagePlaceholder
          src={image}
          alt={name}
          className="h-50 rounded-lg object-cover object-center md:h-80 lg:h-120"
        />
      </div>
      <div className="flex flex-col">
        <p className="section-title-size mb-2">{name}</p>
        {birthday && (
          <p className="">
            <span className="mr-2">Birthday:</span>
            <span>{formatDate(birthday)}</span>
          </p>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            className="bg-main-btn main-btn-md hover:bg-main-btn-hover content-center-x my-2 gap-2 self-start rounded-md transition-colors duration-300"
          >
            <span>
              <FaLink />
            </span>
            <span>Personal Website</span>
          </a>
        )}
        {about ? <p>{about}</p> : <p className="italic">No description</p>}
      </div>
    </div>
  );
}

export default ActorDetailContent;
