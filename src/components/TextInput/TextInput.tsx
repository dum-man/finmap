import { HTMLInputTypeAttribute, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { INPUT_LABEL_VARIANTS, INPUT_LENGTH_VARIANTS } from "app/constants";
import styles from "./TextInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  value: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  id,
  placeholder,
  maxLength,
  value,
  ...restProps
}) => {
  const [lengthVisible, setLengthVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        className={classNames(styles.input, {
          [styles.active]: !!value,
        })}
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onFocus={() => setLengthVisible(true)}
        onBlur={() => setLengthVisible(false)}
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
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {lengthVisible && (
          <motion.span
            className={styles.inputLength}
            variants={INPUT_LENGTH_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {maxLength ? maxLength - value.length : null}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextInput;
