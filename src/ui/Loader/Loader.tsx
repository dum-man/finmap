import classNames from "classnames";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles["wrapper"]}>
      <span className="visually-hidden">Loading</span>
      <div className={classNames(styles["content"], styles["spinner"])}></div>
    </div>
  );
};

export default Loader;
