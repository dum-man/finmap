import { Variants } from "framer-motion";
import { SelectOption } from "types";

export const EMAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const DEFAULT_DATE_OPTION: SelectOption = { id: "5", label: "allTime" };
export const DATEPICKER_DATE_OPTION: SelectOption = { id: "0", label: "selectDates" };

export const DEFAULT_ACCOUNTS = ["Bank account", "Savings", "Cash"];

export const DEFAULT_CATEGORIES = [
  { type: "income", group: "base", label: "Salary" },
  { type: "income", group: "base", label: "Part-time job" },
  { type: "income", group: "base", label: "Investments" },
  { type: "income", group: "base", label: "Loan repayment" },
  { type: "income", group: "base", label: "Received credit" },
  { type: "income", group: "base", label: "Financial reward" },
  { type: "expense", group: "base", label: "Taxes" },
  { type: "expense", group: "base", label: "Credit repayment" },
  { type: "expense", group: "base", label: "Rental" },
  { type: "expense", group: "base", label: "Commission" },
  { type: "expense", group: "base", label: "Dividends" },
  { type: "expense", group: "base", label: "Loan granted" },
];

export const LANGUAGES = {
  en: {
    nativeName: "English",
  },
  ru: {
    nativeName: "Русский",
  },
  kz: {
    nativeName: "Қазақ",
  },
};

export const INPUT_LABEL_VARIANTS: Variants = {
  hidden: {
    y: 10,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const INPUT_LENGTH_VARIANTS: Variants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const MENU_VARIANTS: Variants = {
  hidden: {
    x: 200,
  },
  visible: {
    x: 0,
  },
  exit: {
    scale: 0.3,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const MODAL_VARIANTS: Variants = {
  hidden: {
    scale: 0.5,
  },
  visible: {
    scale: 1,
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const SELECT_VARIANTS: Variants = {
  hidden: {
    y: -8,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    y: -8,
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
};

export const LANGUAGE_VARIANTS: Variants = {
  hidden: {
    y: -70,
    scale: 0.3,
  },
  visible: {
    y: 0,
    scale: 1,
  },
  exit: {
    y: -70,
    scale: 0.3,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};
