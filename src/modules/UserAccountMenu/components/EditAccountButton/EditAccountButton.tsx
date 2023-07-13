import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import { toggleSetUsernameOpen } from "app/slices/appSlice";
import styles from "./EditAccountButton.module.scss";

const EditAccountButton: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.editButton}
        onClick={() => dispatch(toggleSetUsernameOpen(true))}
      >
        {t("edit")}
      </button>
    </div>
  );
};

export default EditAccountButton;
