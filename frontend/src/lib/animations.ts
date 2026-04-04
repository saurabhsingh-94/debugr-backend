import { Variants, Easing } from "framer-motion";

/**
 * Standard cubic-bezier easing for smooth, professional-feeling transitions.
 */
export const easeStandard: Easing = [0.25, 0.1, 0.25, 1];

/**
 * Standard fade-in and slide-up animation.
 * Ideal for hero elements and initial page loads.
 * 
 * @param delay - Optional delay in seconds.
 */
export const fadeInUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: easeStandard,
    },
  },
});

/**
 * Scroll-triggered fade-in and slide-up animation.
 * Used with `whileInView` prop to animate elements as they enter the viewport.
 * 
 * @param delay - Optional delay in seconds.
 */
export const inView = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.55,
      ease: easeStandard,
    },
  },
});

/**
 * Viewport configuration for scroll-triggered animations.
 */
export const viewportConfig = {
  once: true,
  margin: "-60px",
};
