import { Trans, useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import useAppSelector from "hooks/useAppSelector";
import { setFormattedAmount } from "utils/setFormattedAmount";
import { getSelectedAccountsTotalSum } from "../../helpers/getSelectedAccountsTotalSum";
import { VARIANTS } from "../../constants";
import styles from "./SelectedAccounts.module.scss";

const SelectedAccounts: React.FC = () => {
  const { t } = useTranslation();

  const selectedAccounts = useAppSelector((state) => state.filter.selectedAccounts);

  let count = selectedAccounts.length;
  let name = t(selectedAccounts.length === 1 ? "account" : "selectedAccounts");

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {!!selectedAccounts.length && (
        <motion.div variants={VARIANTS} initial="hidden" animate="visible" exit="exit">
          <span className={styles.divider} />
          <div className={styles.wrapper}>
            <p>
              <Trans i18nKey="selectedAccountsTotalSum" count={count} name={name}>
                Total for {{ count }} {{ name }}
              </Trans>
            </p>
            <span className={styles.amount}>
              {setFormattedAmount(getSelectedAccountsTotalSum(selectedAccounts))}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectedAccounts;
