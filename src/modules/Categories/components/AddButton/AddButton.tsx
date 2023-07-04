import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "ui";
import { VARIANTS } from "../../constants";
import styles from "./AddButton.module.scss";

interface AddButtonProps {
  setFormVisible: (visible: React.SetStateAction<boolean>) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ setFormVisible }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className={styles.button}
      variants={VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <Button type="button" onClick={() => setFormVisible(true)}>
        {t("addCategory")}
      </Button>
    </motion.div>
  );
};

export default AddButton;
