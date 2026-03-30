import { useGetUpcomingAnimeQuery } from "../../shared/api/animeApi";
import { useSafeQuery } from "../../shared/hooks/useSafeQuery";
import { bannerSliderSchema } from "../../shared/schemas/animeSchema";
import BannerSkeleton from "../../shared/UIElements/skeleton/bannerSkeleton";
import BannerSlider from "../../shared/UIElements/sliders/BannerSlider";

function Banner() {
  const query = useGetUpcomingAnimeQuery(
    {
      page: 1,
      limit: 10,
    },
    { refetchOnMountOrArgChange: false },
  );
  const { data, isLoading, isError } = useSafeQuery({
    data: query.data,
    isLoading: query.isLoading,
    schema: bannerSliderSchema,
  });

  if (isLoading) return <BannerSkeleton />;
  if (isError || !data?.length)
    return <div className="text-center opacity-60">No data found</div>;

  return <BannerSlider items={data} />;
}

export default Banner;
