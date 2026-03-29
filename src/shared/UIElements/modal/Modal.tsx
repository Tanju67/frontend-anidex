import { AnimatePresence, motion } from "framer-motion";
import { useArrangeScrollBar } from "../../hooks/useArrangeScrollBar";
import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  open: boolean;
};

function Modal({ children, onClose, className = "", open }: ModalProps) {
  useArrangeScrollBar(open);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.1, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.1, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className={`relative z-50 rounded-lg p-4 pt-8 shadow-2xl md:p-8 ${className}`}
          >
            <button
              className="hover:text-main-btn-hover text-main-btn absolute top-0 right-2 text-4xl transition-colors duration-300"
              onClick={onClose}
            >
              &times;
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
