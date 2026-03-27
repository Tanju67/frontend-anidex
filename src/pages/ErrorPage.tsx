import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

interface ErrorPageProps {
  status?: string | number;
  message?: string;
}

function ErrorPage({ status, message }: ErrorPageProps) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const errorMessage =
    message || params.get("message") || "Something went wrong";
  const errorStatus = status || params.get("status") || "Error";
  return (
    <div className="h-screen bg-black text-white flex items-center justify-center px-6 relative">
      {/* Background glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-red-500/20 rounded-full blur-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="text-center max-w-xl relative z-10">
        {/* STATUS */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-7xl font-bold mb-6 text-red-500"
        >
          {errorStatus}
        </motion.h1>

        {/* MESSAGE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-300 mb-8"
        >
          {errorMessage}
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          {/* Retry */}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Retry
          </button>

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ErrorPage;
