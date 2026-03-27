import ActionAnime from "./ActionAnime";
import Banner from "./Banner";
import RandomAnime from "./RandomAnime";
import TopAnime from "./TopAnime";
import TopMovieAnime from "./TopMovieAnime";
import TrendAnime from "./TrendAnime";
import Upcoming from "./Upcoming";

function Home() {
  return (
    <div>
      <Banner />
      <TrendAnime />
      <TopAnime />
      <TopMovieAnime />
      <RandomAnime />
      <Upcoming />
      <ActionAnime />
    </div>
  );
}

export default Home;
