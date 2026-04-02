import type { PersonType } from "../../shared/schemas/animeSchema";
import ImagePlaceholder from "../../shared/UIElements/imagePlaceholder/ImagePlaceholder";

type Props = {
  data: PersonType;
};

function About({ data }: Props) {
  const { about, name, nicknames, image } = data;
  console.log(data);
  return (
    <section className="main-text-size relative">
      <div className="min-h-50 md:min-h-80 lg:min-h-120">
        <div className="float-left h-full pr-4 pb-2 sm:pr-6 md:pr-8 lg:pr-10">
          <ImagePlaceholder
            src={image}
            alt={name}
            className="h-50 rounded-lg object-cover object-center md:h-80 lg:h-120"
          />
        </div>
        <div className="flex-1">
          <h2 className="section-title-size mb-2">{name}</h2>
          {nicknames.length > 0 && (
            <p className="mb-2 flex gap-2">
              <span>Nicknames:</span>
              <span>{nicknames.join(", ")}</span>
            </p>
          )}
          <p className="italic">{about}</p>
        </div>
      </div>
    </section>
  );
}

export default About;
