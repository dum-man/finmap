import styles from "./Skeleton.module.scss";

const Skeleton: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      {[...Array(6)].map((_, i) => (
        <li key={i} className={styles.categoryItem}>
          <span className={`${styles.skeleton} ${styles.button}`} />
          <span className={`${styles.skeleton} ${styles.name}`} />
          <span className={`${styles.skeleton} ${styles.button}`} />
        </li>
      ))}
    </ul>
  );
};

export default Skeleton;
