import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "ui";
import { BUTTON_VARIANTS } from "../../constants";
import styles from "./AddButton.module.scss";

interface AddButtonProps {
  onFormOpen: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onFormOpen }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={styles.wrapper}
      variants={BUTTON_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <Button type="button" onClick={onFormOpen}>
        {t("addAccount")}
      </Button>
    </motion.div>
  );
};

export default AddButton;
