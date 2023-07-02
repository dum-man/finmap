import { Variants } from "framer-motion";

export const setInputVariants = (fromRight: boolean): Variants => {
  return {
    hidden: {
      x: fromRight ? 400 : -400,
    },
    visible: {
      x: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };
};
