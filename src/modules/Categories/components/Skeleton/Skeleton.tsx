import classNames from "classnames";
import styles from "./Skeleton.module.scss";

const Skeleton: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      {[...Array(6)].map((_, i) => (
        <li key={i} className={styles.categoryItem}>
          <span className={classNames(styles.skeleton, styles.button)} />
          <span className={classNames(styles.skeleton, styles.name)} />
          <span className={classNames(styles.skeleton, styles.button)} />
        </li>
      ))}
    </ul>
  );
};

export default Skeleton;
