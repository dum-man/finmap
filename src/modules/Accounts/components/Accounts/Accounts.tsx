import { useState } from "react";
import { useTranslation } from "react-i18next";
import useAppDispatch from "hooks/useAppDispatch";
import useAppSelector from "hooks/useAppSelector";
import { toggleAccountsOpen } from "app/slices/appSlice";
import { MainPopup } from "components";
import AccountsList from "../AccountsList/AccountsList";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import AddButton from "../AddButton/AddButton";
import styles from "./Accounts.module.css";

const Accounts: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const accountsOpen = useAppSelector((state) => state.app.accountsOpen);

  const [formVisible, setFormVisible] = useState(false);

  const handleClose = () => {
    dispatch(toggleAccountsOpen(false));
  };

  return (
    <MainPopup title={t("accounts")} isOpen={accountsOpen} onClose={handleClose}>
      <div className={styles["container"]}>
        {formVisible ? (
          <CreateAccountForm onClose={() => setFormVisible(false)} />
        ) : (
          <AddButton onFormOpen={() => setFormVisible(true)} />
        )}
        <AccountsList />
      </div>
    </MainPopup>
  );
};

export default Accounts;
