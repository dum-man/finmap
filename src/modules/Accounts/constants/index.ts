import { Variants } from "framer-motion";

export const ACCOUNT_ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

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
