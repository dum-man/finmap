import { useTranslation } from "react-i18next";
import { Button } from "ui";
import styles from "./AddButton.module.css";

interface AddButtonProps {
  setFormVisible: (visible: React.SetStateAction<boolean>) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ setFormVisible }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["button"]}>
      <Button type="button" onClick={() => setFormVisible(true)}>
        {t("addCategory")}
      </Button>
    </div>
  );
};

export default AddButton;
