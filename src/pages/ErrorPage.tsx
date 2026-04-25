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
    message ||
    params.get("message") ||
    (status === 404
      ? "The page you are looking for does not exist."
      : "Something went wrong on our servers.");
  const errorStatus = status || params.get("status") || "Error";
  return (
    <div className="relative flex h-screen items-center justify-center bg-black px-6 text-white">
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute h-125 w-125 rounded-full bg-red-500/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 max-w-xl text-center">
        {/* STATUS */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-7xl font-bold text-red-500"
        >
          {errorStatus}
        </motion.h1>

        {/* MESSAGE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-lg text-gray-300"
        >
          {errorMessage}
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          {/* Retry */}
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-red-600 px-6 py-2 transition hover:bg-red-700"
          >
            Retry
          </button>

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-gray-700 px-6 py-2 transition hover:bg-gray-800"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ErrorPage;
