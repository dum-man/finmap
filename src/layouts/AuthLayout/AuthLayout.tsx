import { Trans } from "react-i18next";
import heroImage from "../../assets/images/hero-image.webp";
import finmapLogo from "../../assets/images/finmap-logo.svg";
import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <h1 className="visually-hidden">Welcome to Finmap</h1>
      <section className={styles.heroSection}>
        <h2 className="visually-hidden">Finmap benefits</h2>
        <img src={finmapLogo} width={195} height={55} alt="finmap logo" />
        <p className={styles.lead}>
          <Trans i18nKey="hero"></Trans>
        </p>
        <div className={styles.blur} />
        <img
          className={styles.heroImage}
          src={heroImage}
          width={485}
          alt="laptop with financial analytics"
        />
      </section>
      <section className={styles.authSection}>
        <img
          className={styles.logo}
          src={finmapLogo}
          width={195}
          height={55}
          alt="finmap logo"
        />
        <div className={styles.wrapper}>{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
