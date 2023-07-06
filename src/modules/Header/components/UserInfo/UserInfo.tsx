import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { TiArrowSortedDown } from "react-icons/ti";
import { auth } from "app/config";
import { toggleUserAccountMenuOpen } from "app/slices/appSlice";
import { RootState } from "app/store";
import finmapLogoShort from "assets/images/finmap-logo-short.svg";
import styles from "./UserInfo.module.scss";

const UserInfo: React.FC = () => {
  const [currentUser] = useAuthState(auth);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userAccountMenuOpen = useSelector(
    (state: RootState) => state.app.userAccountMenuOpen
  );

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
