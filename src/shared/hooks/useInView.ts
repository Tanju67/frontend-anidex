import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onEnter?: () => void;
};

export function useInView({
  threshold = 0,
  rootMargin = "0px",
  triggerOnce = true,
  onEnter,
}: Options = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (onEnter) {
            if (triggerOnce && hasTriggered.current) return;

            onEnter();
            hasTriggered.current = true;
          }

          if (triggerOnce) {
            observer.disconnect();
          } else {
            if (!triggerOnce) {
              setIsVisible(false);
            }
          }
        }
      },
      { threshold, rootMargin },
    );
    const currentRef = ref.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, onEnter]);

  return { ref, isVisible };
}
