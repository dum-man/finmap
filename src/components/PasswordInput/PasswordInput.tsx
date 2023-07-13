import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { BiHide, BiShow } from "react-icons/bi";
import { INPUT_LABEL_VARIANTS } from "app/constants";
import styles from "./PasswordInput.module.scss";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  value: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  value,
  ...restProps
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={classNames(styles.input, {
          [styles.active]: !!value,
        })}
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        maxLength={30}
        value={value}
        {...restProps}
      />
      {!!value && (
        <motion.label
          className={styles.label}
          htmlFor={id}
          variants={INPUT_LABEL_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {placeholder}
        </motion.label>
      )}
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          type="button"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? <BiHide /> : <BiShow />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
