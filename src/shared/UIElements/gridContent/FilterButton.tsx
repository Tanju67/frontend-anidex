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
          "flex items-center justify-center gap-2 px-4 py-2 duration-300 hover:bg-white/10" +
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
