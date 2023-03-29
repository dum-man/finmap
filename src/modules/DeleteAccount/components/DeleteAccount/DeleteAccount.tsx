import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../../../ui";
import DeleteAccountForm from "../DeleteAccountForm/DeleteAccountForm";
import styles from "./DeleteAccount.module.scss";

interface DeleteAccountProps {
  setOpen: (open: React.SetStateAction<boolean>) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => setOpen(false)}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("deleteAccount")}</h2>
        <CloseButton onClick={() => setOpen(false)} />
        <DeleteAccountForm onClose={() => setOpen(false)} />
      </div>
    </Modal>
  );
};

export default DeleteAccount;
