import { Trans, useTranslation } from "react-i18next";
import heroImage from "assets/images/hero-image.webp";
import finmapLogo from "assets/images/finmap-logo.svg";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <main className={styles["main"]}>
      <h1 className="visually-hidden">Welcome to Finmap</h1>
      <section className={styles["hero-section"]}>
        <h2 className="visually-hidden">Finmap benefits</h2>
        <img src={finmapLogo} height={55} alt="finmap logo" />
        <p className={styles["lead"]}>
          <Trans>{t("hero")}</Trans>
        </p>
        <div className={styles["blur"]} />
        <img
          className={styles["hero-image"]}
          src={heroImage}
          height={355}
          alt="laptop with financial analytics"
        />
      </section>
      <section className={styles["auth-section"]}>
        <img className={styles["logo"]} src={finmapLogo} height={55} alt="finmap logo" />
        <div className={styles["wrapper"]}>{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
