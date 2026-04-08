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
          "flex items-center justify-center gap-2 p-2 text-sm duration-300 hover:bg-white/10 md:px-4 md:text-base" +
          (isDropdownOpen ? " bg-slate-900" : "")
        }
      >
        {children}
        <span>{title}</span>
      </button>
    </>
  );
}

export default FilterButton;
