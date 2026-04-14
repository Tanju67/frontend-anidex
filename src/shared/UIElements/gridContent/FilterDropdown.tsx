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
          className="bg-nav/80 absolute top-8 right-0 z-50 w-53 p-4 backdrop-blur-xl sm:top-10 sm:w-66 md:w-82"
        >
          <div className="flex flex-col gap-2 md:gap-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FilterDropdown;
