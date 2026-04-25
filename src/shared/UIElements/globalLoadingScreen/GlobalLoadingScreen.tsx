import { motion } from "framer-motion";

function GlobalLoadingScreen() {
  return (
    <div className="fixed top-0 left-0 z-9999 w-full">
      <div className="h-1 bg-red-600 shadow-[0_0_10px_#dc2626]">
        <motion.div
          className="h-full bg-red-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export default GlobalLoadingScreen;
