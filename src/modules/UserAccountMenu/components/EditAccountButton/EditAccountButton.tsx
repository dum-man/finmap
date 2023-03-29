import { useTranslation } from "react-i18next";
import styles from "./EditAccountButton.module.scss";

interface EditAccountButtonProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const EditAccountButton: React.FC<EditAccountButtonProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <button className={styles.editButton} onClick={() => setOpen(true)}>
        {t("edit")}
      </button>
    </div>
  );
};

export default EditAccountButton;
