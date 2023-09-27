import { HTMLInputTypeAttribute, useId, useState } from "react";
import classNames from "classnames";
import { InputLabel } from "ui";
import styles from "./TextInput.module.css";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute;
  label: string;
  value: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  label,
  maxLength,
  value,
  ...restProps
}) => {
  const inputId = useId();

  const [isActive, setIsActive] = useState(Boolean(value.length));

  const handleFocus = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const handleBlur = () => {
    if (!value.length) {
      setIsActive(false);
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <InputLabel id={inputId} label={label} isActive={isActive} />
      <input
        id={inputId}
        className={classNames("input", styles["input"])}
        type={type}
        maxLength={maxLength}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
      {maxLength && (
        <span
          className={classNames(styles["length"], {
            [styles["length-visible"]]: isActive,
          })}
        >
          {maxLength - value.length}
        </span>
      )}
    </div>
  );
};

export default TextInput;
