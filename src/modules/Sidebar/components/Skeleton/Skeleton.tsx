import styles from "./Skeleton.module.scss";

const Skeleton: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      {[...Array(3)].map((_, i) => (
        <li key={i} className={styles.accountItem}>
          <span className={`${styles.skeleton} ${styles.name}`} />
          <span className={`${styles.skeleton} ${styles.amount}`} />
        </li>
      ))}
    </ul>
  );
};

export default Skeleton;
