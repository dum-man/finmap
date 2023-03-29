import { HTMLInputTypeAttribute, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INPUT_LABEL_VARIANTS, INPUT_LENGTH_VARIANTS } from "../../app/constants";
import styles from "./TextInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute;
  id: string;
  placeholder: string;
  value: string;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { type, id, placeholder, maxLength, value, ...restProps } = props;

  const [textLengthVisible, setTextLengthVisible] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={`${styles.input} ${value ? styles.active : ""}`}
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onFocus={() => setTextLengthVisible(true)}
        onBlur={() => setTextLengthVisible(false)}
        {...restProps}
      />
      {value && (
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
        {textLengthVisible && (
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
