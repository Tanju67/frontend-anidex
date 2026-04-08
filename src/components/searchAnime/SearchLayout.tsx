import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MainSearch from "./MainSearch";
import TypeSearch from "./shared/TypeSearch";
import SearchInput from "./shared/SearchInput";

function SearchLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "";

  // Input için local state
  const initialSearch = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(initialSearch);

  // Debounced URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (inputValue.trim().length >= 3) {
        params.set("q", inputValue.trim());
      } else {
        params.delete("q");
      }

      setSearchParams(params);
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [inputValue, searchParams, setSearchParams]);

  return (
    <section className="min-h-screen">
      {/* Fixed input */}
      <div className="fixed z-50 h-20 w-full bg-[#333] md:h-30">
        <div className="mx-auto h-full max-w-300">
          <SearchInput search={inputValue} handleChange={setInputValue} />
        </div>
      </div>

      {/* Conditional rendering */}
      {!type && <MainSearch search={inputValue} />}
      {type === "tv" && <TypeSearch title="Only Series" />}
      {type === "movie" && <TypeSearch title="Only Movies" />}
    </section>
  );
}

export default SearchLayout;
