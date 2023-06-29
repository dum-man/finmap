import { useTranslation } from "react-i18next";
import { Button } from "ui";
import styles from "./AddButton.module.scss";

interface AddButtonProps {
  onFormOpen: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onFormOpen }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Button type="button" onClick={onFormOpen}>
        {t("addAccount")}
      </Button>
    </div>
  );
};

export default AddButton;
