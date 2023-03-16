import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <span className="visually-hidden">Loading</span>
      <div className={`${styles.content} ${styles.spinner}`}></div>
    </div>
  );
};

export default Loader;
