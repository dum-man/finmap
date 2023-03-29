import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import styles from "./CreateAccount.module.scss";

interface CreateAccountProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("addAccount")}</h2>
        <CloseButton onClick={() => setOpen(false)} />
        <CreateAccountForm onClose={() => setOpen(false)} />
      </div>
    </Modal>
  );
};

export default CreateAccount;
