import { useId, useState } from "react";
import classNames from "classnames";
import { BiHide, BiShow } from "react-icons/bi";
import { InputLabel } from "ui";
import styles from "./PasswordInput.module.css";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, ...restProps }) => {
  const inputId = useId();

  const [isActive, setIsActive] = useState(Boolean(value.length));
  const [isVisible, setIsVisible] = useState(false);

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
        type={isVisible ? "text" : "password"}
        maxLength={30}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
      <div className={styles["button-wrapper"]}>
        <button
          className={styles["button"]}
          type="button"
          onClick={() => setIsVisible((prevVisible) => !prevVisible)}
        >
          {isVisible ? <BiHide /> : <BiShow />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
