type SearchInputProps = {
  search: string;
  handleChange: (value: string) => void;
};

function SearchInput({ search, handleChange }: SearchInputProps) {
  return (
    <div className="content-center-x h-full p-2">
      <input
        type="text"
        placeholder="Search..."
        className={`w-full border-b-2 pb-2 text-xl outline-0 sm:text-2xl md:w-[80vw] md:text-3xl lg:w-[50vw] lg:text-4xl ${
          search ? "border-b-main-btn" : ""
        }`}
        value={search}
        onChange={(e) => handleChange(e.target.value)}
      />
      {search && (
        <span
          onClick={() => handleChange("")}
          className="relative -ml-6 cursor-pointer text-2xl md:text-3xl lg:text-4xl"
        >
          &times;
        </span>
      )}
    </div>
  );
}

export default SearchInput;
