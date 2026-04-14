import type { NewsType } from "../../shared/schemas/animeSchema";
import ImagePlaceholder from "../../shared/UIElements/imagePlaceholder/ImagePlaceholder";
import { formatDate } from "../../shared/utils/helper";

function NewsContentItem(props: NewsType) {
  const { title, date, image, excerpt, url } = props;

  return (
    <li className="group flex flex-col gap-4 rounded-xl border border-white/15 bg-white/10 p-3 transition-all duration-300 hover:bg-white/6 sm:flex-row">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-40 lg:h-48 lg:w-64">
        <ImagePlaceholder
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col py-1">
        <div className="mb-2 flex flex-col gap-1">
          <span className="text-main-btn text-[10px] font-bold tracking-widest uppercase">
            {formatDate(date)}
          </span>
          {/* Başlık */}
          <h3 className="group-hover:text-main-btn line-clamp-2 text-lg leading-tight font-bold transition-colors">
            {title}
          </h3>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400 italic">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 text-xs font-black tracking-tighter text-gray-300 uppercase transition-colors hover:text-white"
          >
            Read Full Article
            <span className="inline-block transition-transform group-hover/link:translate-x-1">
              →
            </span>
          </a>

          {/* Süsleme Çizgisi */}
          <div className="mx-4 hidden h-px flex-1 bg-white/5 sm:block" />
        </div>
      </div>
    </li>
  );
}

export default NewsContentItem;
