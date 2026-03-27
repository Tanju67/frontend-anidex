import { Outlet, useParams } from "react-router-dom";
import GeneralDetail from "../components/animeDetail/GeneralDetail";
import { useGetAnimeByIdQuery } from "../shared/api/animeApi";
import PageSpinner from "../shared/UIElements/spinner/PageSpinner";
import { SliderItemSchema } from "../shared/schemas/animeSchema";

function AnimeDetailPage() {
  const { animeId } = useParams();

  const { data, isLoading } = useGetAnimeByIdQuery(animeId!);

  if (isLoading)
    return (
      <PageSpinner className="min-h-60 sm:min-h-[80] md:min-h-100 lg:min-h-120" />
    );

  if (!data) return null;

  let parsedData;

  try {
    parsedData = SliderItemSchema.parse(data);
  } catch (err) {
    console.error("Zod error:", err);
    return null;
  }
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${parsedData.image})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/90 to-black/90" />
      <div className="mx-auto max-w-400">
        <GeneralDetail data={parsedData} />
        <Outlet />
      </div>
    </div>
  );
}

export default AnimeDetailPage;
