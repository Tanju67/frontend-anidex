import { useLocation } from "react-router-dom";
import AnimeDetailPage from "./AnimeDetailPage";

function AnimeDetailWrapper() {
  const location = useLocation();
  return <AnimeDetailPage key={location.pathname} />;
}

export default AnimeDetailWrapper;
