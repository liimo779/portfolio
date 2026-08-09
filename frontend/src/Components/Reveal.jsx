import { forwardRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../motion";

export function RevealGroup({ as: Tag = "div", stagger, delay, className, children, ...rest }) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export const RevealItem = forwardRef(function RevealItem(
  { as: Tag = "div", className, children, variants = fadeUp, ...rest },
  ref
) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag ref={ref} className={className} variants={variants} {...rest}>
      {children}
    </MotionTag>
  );
});
