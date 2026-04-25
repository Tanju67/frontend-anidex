import ActionAnime from "./ActionAnime";
import Banner from "./Banner";
import RandomAnime from "./RandomAnime";
import TopAnime from "./TopAnime";
import TopMovieAnime from "./TopMovieAnime";
import Trailer from "./Trailer";
import TrendAnime from "./TrendAnime";

function Home() {
  return (
    <div>
      <Banner />
      <TrendAnime />
      <TopAnime />
      <Trailer />
      <TopMovieAnime />
      <RandomAnime />
      <ActionAnime />
    </div>
  );
}

export default Home;
