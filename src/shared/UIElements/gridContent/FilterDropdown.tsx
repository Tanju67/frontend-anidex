import { AnimatePresence, motion } from "framer-motion";

type FilterDropdownProps = {
  isDropdownOpen: boolean;
  children?: React.ReactNode;
};

function FilterDropdown({ isDropdownOpen, children }: FilterDropdownProps) {
  return (
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-10 right-0 z-50 w-80 bg-slate-900 p-4"
        >
          <div className="flex flex-col gap-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FilterDropdown;
