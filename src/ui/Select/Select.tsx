import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { BsCheckLg } from "react-icons/bs";
import { IoCaretDown } from "react-icons/io5";
// import { CgClose } from "react-icons/cg";
import { SELECT_VARIANTS } from "app/constants";
import styles from "./Select.module.scss";

interface SelectOption {
  id: string;
  label: string;
}

interface SelectProps {
  value: SelectOption | null;
  onChange: (value: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  active?: boolean;
  cancelable?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select option",
  active,
  // cancelable = true,
}) => {
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOptionRef = useRef<HTMLLIElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleSelectOption = (
    evt: React.MouseEvent<HTMLLIElement | HTMLButtonElement>,
    option: SelectOption
  ) => {
    evt.stopPropagation();
    if (option.id === value?.id) {
      return;
    }
    onChange(option);
    setIsOpen(false);
  };

  const isOptionSelected = (option: SelectOption) => {
    return option.id === value?.id;
  };

  useEffect(() => {
    if (isOpen) {
      selectedOptionRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [isOpen]);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) {
      return;
    }
    const handler = (evt: KeyboardEvent) => {
      if (evt.target !== currentRef) {
        return;
      }
      switch (evt.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (evt.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    currentRef.addEventListener("keydown", handler);
    return () => currentRef.removeEventListener("keydown", handler);
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      tabIndex={0}
      className={styles.container}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div
        className={classNames(styles.value, {
          [styles.placeholder]: !value,
          [styles.active]: active,
        })}
      >
        <p className={classNames({ [styles.active]: active })}>
          {value ? t(value.label) : placeholder}
        </p>
      </div>
      <div className={styles.icons}>
        {/* {cancelable && value && (
          <button
            className={styles.closeButton}
            type="button"
            onClick={(evt) => {
              evt.stopPropagation();
            }}
          >
            <CgClose />
          </button>
        )} */}
        <IoCaretDown />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.optionsWrapper}
            variants={SELECT_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {options.length ? (
              <ul className={styles.options}>
                {options.map((option, index) => (
                  <li
                    key={option.id}
                    className={classNames(styles.option, {
                      [styles.selected]: isOptionSelected(option),
                      [styles.highlighted]: index === highlightedIndex,
                    })}
                    ref={isOptionSelected(option) ? selectedOptionRef : null}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={(evt) => handleSelectOption(evt, option)}
                  >
                    <p>{t(option.label)}</p>
                    {isOptionSelected(option) && (
                      <BsCheckLg className={styles.selectedIcon} />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noOptions}>{t("noOptions")}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
