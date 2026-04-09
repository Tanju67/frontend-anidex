import MainSearchTypeResult from "./shared/MainSearchTypeResult";
import TopResults from "./TopResults";

function MainSearch({ search }: { search: string }) {
  if (search.length < 3) return null;
  return (
    <section className="min-h-screen">
      <div className="mx-auto h-full max-w-300 pt-20 md:pt-30">
        <TopResults search={search} />
        <MainSearchTypeResult search={search} type="tv" title="TV Series" />
        <MainSearchTypeResult search={search} type="movie" title="Movies" />
      </div>
    </section>
  );
}

export default MainSearch;
