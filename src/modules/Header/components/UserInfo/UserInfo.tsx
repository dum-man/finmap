import { MutableRefObject } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { TiArrowSortedDown } from "react-icons/ti";
import { auth } from "../../../../firebase";
import finmapLogoShort from "../../../../assets/images/finmap-logo-short.svg";
import styles from "./UserInfo.module.scss";

interface UserInfoProps {
  parentRef: MutableRefObject<null>;
  open: boolean;
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ parentRef, open, setOpen }) => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img src={finmapLogoShort} alt="finmap logo" />
      </div>
      <div>
        <p className={styles.name}>Finmap</p>
        <button
          className={styles.account}
          ref={parentRef}
          onClick={() => setOpen((prev) => !prev)}
        >
          {currentUser?.displayName || t("accountType")}
          <TiArrowSortedDown className={open ? styles.rotate : ""} size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
