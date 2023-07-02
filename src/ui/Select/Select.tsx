import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { BsCheckLg } from "react-icons/bs";
import { SELECT_VARIANTS } from "app/constants";
import styles from "./Select.module.scss";

interface SelectOption {
  id: string;
  group: "base" | "user";
  label: string;
}

interface SelectProps {
  value: SelectOption | null;
  onChange: (value: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  active?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  active,
}) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectOption = (
    option: SelectOption,
    evt?: React.MouseEvent<HTMLLIElement | HTMLButtonElement>
  ) => {
    evt?.stopPropagation();
    if (option.id === value?.id) return;
    onChange(option);
    setIsOpen(false);
  };

  const isOptionSelected = (option: SelectOption) => {
    return option.id === value?.id;
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (evt: KeyboardEvent) => {
      if (evt.target !== containerRef.current) return;
      switch (evt.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
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
    containerRef.current?.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={styles.container}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <p
        className={`${styles.value} ${value?.label ? "" : styles.placeholder} ${
          active ? styles.active : ""
        }`}
      >
        <span>
          {value?.label && value.group === "base"
            ? t(value.label)
            : value?.label
            ? value.label
            : placeholder}
        </span>
      </p>
      <div className={styles.divider} />
      <div className={styles.caret} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isOpen && (
          <motion.ul
            variants={SELECT_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.options}
          >
            {options.length ? (
              <>
                {options.map((option, index) => (
                  <li
                    key={option.id}
                    className={classNames(styles.option, {
                      [styles.selected]: isOptionSelected(option),
                      [styles.highlighted]: index === highlightedIndex,
                    })}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={(evt) => selectOption(option, evt)}
                  >
                    {option.group === "base" ? t(option.label) : option.label}
                    {isOptionSelected(option) ? (
                      <BsCheckLg className={styles.icon} />
                    ) : null}
                  </li>
                ))}
              </>
            ) : (
              <div className={styles.blank}>{t("noOptions")}</div>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
