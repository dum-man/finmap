import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Trans, useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import useAppSelector from "hooks/useAppSelector";
import { useGetAccountsQuery } from "app/services/accountApi";
import { auth } from "app/config";
import { getAmountsByCurrencyCode, setFormattedAndGroupedAmounts } from "../../helpers";
import styles from "./SelectedAccounts.module.css";

const animation = {
  enter: styles["animation-enter"],
  enterActive: styles["animation-enter-active"],
  exit: styles["animation-exit"],
  exitActive: styles["animation-exit-active"],
};

const SelectedAccounts: React.FC = () => {
  const { t } = useTranslation();

  const [currentUser] = useAuthState(auth);

  const { data: accounts = [] } = useGetAccountsQuery({ userId: currentUser?.uid! });

  const selectedAccountIds = useAppSelector((state) => state.filter.selectedAccountIds);

  const selectedAccounts = accounts.filter((account) =>
    selectedAccountIds.includes(account.id)
  );

  const contentRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(Boolean(selectedAccounts.length));
  }, [selectedAccounts.length]);

  const count = selectedAccounts.length;
  const name = t(selectedAccounts.length === 1 ? "account" : "selectedAccounts");

  const formattedAndGroupedAmounts = setFormattedAndGroupedAmounts(
    getAmountsByCurrencyCode(selectedAccounts)
  );

  return (
    <CSSTransition
      classNames={animation}
      nodeRef={contentRef}
      in={animationIn}
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <div ref={contentRef}>
        <span className={styles["divider"]} />
        <div className={styles["wrapper"]}>
          <p>
            <Trans i18nKey="selectedAccountsTotalSum" count={count} name={name}>
              {{ count }} {{ name }}
            </Trans>
          </p>
          <div className={styles["amount-wrapper"]}>
            {formattedAndGroupedAmounts.map((amount) => {
              return amount;
            })}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SelectedAccounts;
