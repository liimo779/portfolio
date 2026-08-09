import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export function useCountUp(target, { duration = 1.2 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const numericTarget = Number(target) || 0;
    const controls = animate(0, numericTarget, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return { ref, value };
}
