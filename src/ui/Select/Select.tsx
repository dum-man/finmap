import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { BsCheckLg } from "react-icons/bs";
import { IoCaretDown } from "react-icons/io5";
import { InputLabel } from "ui";
import { SelectOption } from "types";
import styles from "./Select.module.css";

const animation = {
  enter: styles["animation-enter"],
  enterActive: styles["animation-enter-active"],
  exit: styles["animation-exit"],
  exitActive: styles["animation-exit-active"],
};

interface SelectProps {
  value: SelectOption | null;
  onChange: (value: SelectOption) => void;
  options: SelectOption[];
  label?: string;
  position?: "left" | "right";
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  label,
  position = "right",
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
          handleToggleOpen();
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

  const optionsRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpen);
  }, [isOpen]);

  const handleToggleOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div
      tabIndex={0}
      className={styles["container"]}
      onBlur={() => setIsOpen(false)}
      onClick={handleToggleOpen}
    >
      <div className={styles["value"]}>
        {label && <InputLabel id="select" label={label} isActive={Boolean(value)} />}
        {value && <p>{t(value.label)}</p>}
      </div>
      <span className={styles["icon"]}>
        <IoCaretDown />
      </span>
      <CSSTransition
        classNames={animation}
        nodeRef={optionsRef}
        in={animationIn}
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={classNames(styles["options-wrapper"], {
            [styles["left"]]: position === "left",
          })}
          ref={optionsRef}
        >
          {options.length ? (
            <ul className={styles["options"]}>
              {options.map((option, index) => (
                <li
                  key={option.id}
                  className={classNames(styles["option"], {
                    [styles["selected"]]: isOptionSelected(option),
                    [styles["highlighted"]]: index === highlightedIndex,
                  })}
                  ref={isOptionSelected(option) ? selectedOptionRef : null}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={(evt) => handleSelectOption(evt, option)}
                >
                  <p>{t(option.label)}</p>
                  {isOptionSelected(option) && (
                    <BsCheckLg className={styles["selected-icon"]} />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles["no-options"]}>{t("noOptions")}</p>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Select;
