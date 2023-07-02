import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "layouts";
import { CloseButton } from "ui";
import { toggleCreateAccountOpen } from "app/slices/appSlice";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import styles from "./CreateAccount.module.scss";

const CreateAccount: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(toggleCreateAccountOpen(false));
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("addAccount")}</h2>
        <CloseButton onClick={onClose} />
        <CreateAccountForm onClose={onClose} />
      </div>
    </Modal>
  );
};

export default CreateAccount;
