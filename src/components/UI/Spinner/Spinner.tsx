import styles from "./Spinner.module.scss";

interface SpinnerProps {
  dark?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ dark }) => {
  return <span className={`${styles.spinner} ${dark ? styles.dark : styles.light}`} />;
};

export default Spinner;
