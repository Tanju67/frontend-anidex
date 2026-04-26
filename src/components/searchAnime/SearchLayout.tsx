import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainSearch from "./MainSearch";
import SearchInput from "./shared/SearchInput";
import TypeSearch from "./shared/TypeSearch";

function SearchLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "";
  const initialSearch = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialSearch);
  const [debouncedValue, setDebouncedValue] = useState(initialSearch);

  // Debounced URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (inputValue.trim().length >= 3) {
        params.set("q", inputValue.trim());
        setDebouncedValue(inputValue.trim());
      } else {
        params.delete("q");
        setDebouncedValue("");
      }

      setSearchParams(params);
    }, 600);

    return () => clearTimeout(timer);
  }, [inputValue, searchParams, setSearchParams]);

  return (
    <section className="min-h-screen">
      {/* Fixed input */}
      <div className="bg-nav-secondary/80 fixed z-40 h-20 w-full backdrop-blur-md md:h-30">
        <div className="mx-auto h-full max-w-300">
          <SearchInput search={inputValue} handleChange={setInputValue} />
        </div>
      </div>

      {/* Conditional rendering */}
      {!type && <MainSearch search={debouncedValue} />}
      {type === "tv" && <TypeSearch title="Only Series" />}
      {type === "movie" && <TypeSearch title="Only Movies" />}
    </section>
  );
}

export default SearchLayout;
