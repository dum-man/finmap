import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../../layouts";
import { CloseButton } from "../../../../ui";
import { toggleDeleteAccountOpen } from "../../../../app/slices/appSlice";
import DeleteAccountForm from "../DeleteAccountForm/DeleteAccountForm";
import styles from "./DeleteAccount.module.scss";

const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDeleteAccountOpen());
  };

  return (
    <Modal onClose={handleToggle}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("deleteAccount")}</h2>
        <CloseButton onClick={handleToggle} />
        <DeleteAccountForm onClose={handleToggle} />
      </div>
    </Modal>
  );
};

export default DeleteAccount;
