import classNames from "classnames";
import styles from "./Skeleton.module.css";

const Skeleton: React.FC = () => {
  return (
    <ul className={styles["wrapper"]}>
      {[...Array(3)].map((_, i) => (
        <li key={i} className={styles["account-item"]}>
          <span className={classNames(styles["skeleton"], styles["name"])} />
          <span className={classNames(styles["skeleton"], styles["amount"])} />
        </li>
      ))}
    </ul>
  );
};

export default Skeleton;
