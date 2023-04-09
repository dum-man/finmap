import { Variants } from "framer-motion";

export const INPUT_VARIANTS: Variants = {
  hidden: {
    x: 500,
  },
  visible: {
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
};

export const BUTTON_VARIANTS: Variants = {
  hidden: {
    scale: 0.5,
  },
  visible: {
    scale: 1,
  },
};
