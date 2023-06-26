import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toggleSetUsernameOpen } from "../../../../app/slices/appSlice";
import styles from "./EditAccountButton.module.scss";

const EditAccountButton: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.editButton}
        onClick={() => dispatch(toggleSetUsernameOpen())}
      >
        {t("edit")}
      </button>
    </div>
  );
};

export default EditAccountButton;
