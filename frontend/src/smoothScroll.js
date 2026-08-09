import { animate } from "framer-motion";

const NAVBAR_OFFSET = 84;

export function smoothScrollTo(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const targetY = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    window.scrollTo(0, targetY);
    return;
  }

  animate(window.scrollY, targetY, {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (value) => window.scrollTo(0, value),
  });
}
