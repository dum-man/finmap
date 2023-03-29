import styles from "./Spinner.module.scss";

interface SpinnerProps {
  variant?: "light" | "dark";
}

const Spinner: React.FC<SpinnerProps> = ({ variant = "light" }) => {
  return (
    <span
      className={`${styles.spinner} ${variant === "light" ? styles.light : styles.dark}`}
    />
  );
};

export default Spinner;
