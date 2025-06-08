import { useEffect, useRef, useState } from "react";

export const useScrollTrigger = ({
  threshold = 1.0,
  rootMargin = "0px 0px -500px 0px",
  once = true,
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAppeared = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasAppeared.current) return;
          hasAppeared.current = true;
          setIsVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
};
