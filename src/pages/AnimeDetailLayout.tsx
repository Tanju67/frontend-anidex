import { Outlet, useParams } from "react-router-dom";
import GeneralDetail from "../components/animeDetail/GeneralDetail";
import { useGetAnimeByIdQuery } from "../shared/api/animeApi";
import { useSafeQuery } from "../shared/hooks/useSafeQuery";
import { SliderItemSchema } from "../shared/schemas/animeSchema";
import BannerSkeleton from "../shared/UIElements/skeleton/bannerSkeleton";

function AnimeDetailPage() {
  const { animeId } = useParams();

  const query = useGetAnimeByIdQuery(animeId!);

  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: SliderItemSchema,
  });

  if (isLoading) return <BannerSkeleton />;
  if (isError || !data)
    return <div className="text-center opacity-60">No data found</div>;
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/90 to-black/90" />
      <div className="mx-auto max-w-400">
        <GeneralDetail data={data} />
        <Outlet />
      </div>
    </div>
  );
}

export default AnimeDetailPage;
