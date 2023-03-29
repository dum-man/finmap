import Spinner from "../Spinner/Spinner";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "green" | "orange" | "black";
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { variant = "green", loading = false, children, ...restProps } = props;

  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={loading}
      {...restProps}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
