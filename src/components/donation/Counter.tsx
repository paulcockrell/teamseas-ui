import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from "motion/react";
import { useRef } from "react";

type AnimatedCounterProps = {
  from: number;
  to: number;
  duration: number;
  animationOptions?: KeyframeOptions;
};

const AnimatedCounter = ({
  from,
  to,
  duration,
  animationOptions,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!inView) return;

    // Set initial value
    element.textContent = String(from);

    // If reduced motion is enabled in system's preferences
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = String(to);
      return;
    }

    const controls = animate(from, to, {
      ease: "easeOut",
      duration: duration,
      ...animationOptions,
      onUpdate(value) {
        element.textContent = parseInt(value.toFixed(0)).toLocaleString();
      },
    });

    // Cancel on unmount
    return () => {
      controls.stop();
    };
  }, [ref, inView, from, to]);

  return <span ref={ref} />;
};

export default AnimatedCounter;