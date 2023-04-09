import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "../../../../ui";
import { VARIANTS } from "../../constants";
import styles from "./AddCategoryButton.module.scss";

interface AddCategoryButtonProps {
  setFormVisible: (visible: React.SetStateAction<boolean>) => void;
}

const AddCategoryButton: React.FC<AddCategoryButtonProps> = ({ setFormVisible }) => {
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

export default AddCategoryButton;
