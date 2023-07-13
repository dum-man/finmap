import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { TiArrowSortedDown } from "react-icons/ti";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { auth } from "app/config";
import { toggleUserAccountMenuOpen } from "app/slices/appSlice";
import finmapLogoShort from "assets/images/finmap-logo-short.svg";
import styles from "./UserInfo.module.scss";

const UserInfo: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const userAccountMenuOpen = useAppSelector((state) => state.app.userAccountMenuOpen);

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <img src={finmapLogoShort} alt="finmap logo" />
      </div>
      <div>
        <p className={styles.name}>Finmap</p>
        <button
          className={styles.account}
          onClick={() => dispatch(toggleUserAccountMenuOpen(true))}
        >
          {currentUser?.displayName || t("accountType")}
          <TiArrowSortedDown
            className={classNames({ [styles.rotate]: userAccountMenuOpen })}
            size={18}
          />
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
