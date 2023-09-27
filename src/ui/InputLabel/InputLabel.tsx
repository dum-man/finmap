import classNames from "classnames";
import styles from "./InputLabel.module.css";

interface InputLabelProps extends React.InputHTMLAttributes<HTMLLabelElement> {
  id: string;
  label: string;
  isActive: boolean;
}

const InputLabel: React.FC<InputLabelProps> = ({ id, label, isActive, ...restProps }) => {
  return (
    <label
      className={classNames(styles["label"], {
        [styles["active"]]: isActive,
      })}
      {...restProps}
      htmlFor={id}
    >
      {label}
    </label>
  );
};

export default InputLabel;
