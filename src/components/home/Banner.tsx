import { useGetUpcomingAnimeQuery } from "../../shared/api/animeApi";
import { bannerSliderSchema } from "../../shared/schemas/animeSchema";
import BannerSkeleton from "../../shared/UIElements/skeleton/bannerSkeleton";
import BannerSlider from "../../shared/UIElements/sliders/BannerSlider";

function Banner() {
  const { data, isLoading } = useGetUpcomingAnimeQuery(
    {
      page: 1,
      limit: 10,
    },
    { refetchOnMountOrArgChange: false },
  );

  if (isLoading) return <BannerSkeleton />;
  if (!data) return <div className="text-center opacity-60">No data found</div>;

  const result = bannerSliderSchema.safeParse(data);

  if (!result.success) {
    console.error(result.error);
    return null;
  }

  if (result.data.length === 0) {
    return <div className="text-center opacity-60">No data found</div>;
  }

  return <BannerSlider items={result.data} />;
}

export default Banner;
