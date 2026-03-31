import type { NewsType } from "../../shared/schemas/animeSchema";
import ImagePlaceholder from "../../shared/UIElements/imagePlaceholder/ImagePlaceholder";
import { formatDate } from "../../shared/utils/helper";

function NewsContentItem(props: NewsType) {
  const { title, date, image, excerpt, url } = props;
  return (
    <li className="flex flex-col gap-2 bg-white/10 p-2 md:p-4">
      <div className="flex gap-2">
        <div className="h-40 flex-1 sm:h-60">
          <ImagePlaceholder
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex-2">
          <div className="mb-2 flex flex-col">
            <span className="font-bold xl:text-xl">{title}</span>
            <span>{formatDate(date)}</span>
          </div>
          <p>{excerpt}</p>
          <div className="mt-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:underline sm:text-base"
            >
              Read Full Article
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default NewsContentItem;
