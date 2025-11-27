import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoSlider(length, delay) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, delay);
  }, [length, delay]);

  useEffect(() => {
    if (length > 0) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [length, delay, startInterval]);

  const handleClick = (i) => {
    setIndex(i);
    startInterval();
  };

  return { index, setIndex: handleClick };
}
