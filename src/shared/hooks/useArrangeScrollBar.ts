import { useEffect } from "react";

export const useArrangeScrollBar = (isModalOpen: boolean) => {
  useEffect(() => {
    if (!isModalOpen) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isModalOpen]);
};
