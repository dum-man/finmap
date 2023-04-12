import classNames from "classnames";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  variant?: "light" | "dark";
}

const Spinner: React.FC<SpinnerProps> = ({ variant = "light" }) => {
  return (
    <span
      className={classNames(styles.spinner, {
        [styles.light]: variant === "light",
        [styles.dark]: variant === "dark",
      })}
    />
  );
};

export default Spinner;
