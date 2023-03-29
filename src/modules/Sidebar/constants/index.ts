import { Variants } from "framer-motion";

export const VARIANTS: Variants = {
  hidden: {
    y: -40,
    scale: 0.3,
  },
  visible: {
    y: 0,
    scale: 1,
  },
  exit: {
    y: -40,
    scale: 0.3,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};
