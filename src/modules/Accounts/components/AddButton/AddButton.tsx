import { useTranslation } from "react-i18next";
import { Button } from "../../../../ui";
import styles from "./AddButton.module.scss";
import { motion } from "framer-motion";
import { BUTTON_VARIANTS } from "../../constants";

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
