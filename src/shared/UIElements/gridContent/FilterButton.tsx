type FilterButtonProps = {
  onClick: () => void;
  isDropdownOpen: boolean;
  title: string;
  children?: React.ReactNode;
};

function FilterButton({
  onClick,
  isDropdownOpen,
  title,
  children,
}: FilterButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={
          "flex items-center justify-center gap-1 p-2 text-xs duration-300 hover:bg-white/10 sm:gap-2 sm:text-sm md:px-4 md:text-base" +
          (isDropdownOpen ? " bg-nav" : "")
        }
      >
        {children}
        <span>{title}</span>
      </button>
    </>
  );
}

export default FilterButton;
