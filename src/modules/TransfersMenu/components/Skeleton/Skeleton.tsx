import classNames from "classnames";
import styles from "./Skeleton.module.scss";

const Skeleton: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      {[...Array(4)].map((_, i) => (
        <li key={i} className={styles.transferItem}>
          <span className={classNames(styles.skeleton, styles.icon)} />
          <div className={styles.transferWrapper}>
            <span className={classNames(styles.skeleton, styles.amount)} />
            <span className={classNames(styles.skeleton, styles.accounts)} />
            <span className={classNames(styles.skeleton, styles.date)} />
          </div>
          <span className={classNames(styles.skeleton, styles.button)} />
        </li>
      ))}
    </ul>
  );
};

export default Skeleton;
