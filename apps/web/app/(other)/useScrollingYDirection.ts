import { useEffect, useRef, useState } from "react";

export const useScrollYDirection = () => {
  const prevScrollYRef = useRef(0);
  const [direction, setDirection] = useState<"up" | "down" | undefined>(
    undefined,
  );

  useEffect(() => {
    if (typeof window !== "object") return;
    const ac = new AbortController();
    window.addEventListener(
      "scroll",
      (ev) => {
        const deltaY = window.scrollY - prevScrollYRef.current;
        if (deltaY > 0) {
          setDirection("down");
        } else if (deltaY < 0) {
          setDirection("up");
        } else {
          setDirection(undefined);
        }
        prevScrollYRef.current = window.scrollY;
      },
      { passive: true, signal: ac.signal },
    );
    return () => {
      ac.abort();
    };
  }, []);

  return direction;
};
