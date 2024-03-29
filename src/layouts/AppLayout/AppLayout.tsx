import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <main className={styles["main"]}>{children}</main>;
};

export default AppLayout;
