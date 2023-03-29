import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoClose, IoSearch } from "react-icons/io5";
import { Datepicker, Select } from "../../../../ui";
import useAppContext from "../../../../hooks/useAppContext";
import { setFormattedDatepickerDate } from "../../helpers";
import { DATE_FILTER_OPTIONS } from "../../constants";
import { SelectOption } from "../../../../types";
import styles from "./Filtration.module.scss";

const Filtration: React.FC = () => {
  const { t } = useTranslation();

  const {
    selectedOption,
    setSelectedOption,
    selectedDates,
    setSelectedDates,
    searchQuery,
    setSearchQuery,
  } = useAppContext();

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const dateRangeOptionValue: SelectOption = {
    id: "7",
    group: "base",
    label: setFormattedDatepickerDate(selectedDates),
  };

  const onSearchQueryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  };

  const onSelectDateOption = (option: SelectOption) => {
    setSelectedOption(option);
    if (selectedDates) {
      setSelectedDates(null);
    }
  };

  const onDatepickerClose = () => {
    setDatepickerOpen(false);
    if (Array.isArray(selectedDates)) {
      setSelectedOption({ id: "0", group: "base", label: "selectDates" });
    }
  };

  return (
    <>
      <div
        className={`${styles.container} ${
          filterMenuOpen ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.datepickerWrapper}>
          <div className={styles.selectWrapper}>
            <Select
              value={Array.isArray(selectedDates) ? dateRangeOptionValue : selectedOption}
              onChange={onSelectDateOption}
              options={DATE_FILTER_OPTIONS}
            />
          </div>
          <>
            <div
              className={`${styles.datepicker} ${datepickerOpen ? styles.focused : ""}`}
              onClick={() => setDatepickerOpen(true)}
            >
              {Array.isArray(selectedDates) ? (
                <span>{setFormattedDatepickerDate(selectedDates)}</span>
              ) : (
                <span className={styles.placeholder}>{t("selectDates")}</span>
              )}
            </div>
            <div className={styles.iconButtons}>
              <button
                className={styles.iconButton}
                onClick={() => setDatepickerOpen(true)}
              >
                <AiOutlineCalendar />
              </button>
              <button
                className={`${styles.iconButton} ${styles.clearButton}`}
                onClick={() => setSelectedDates(null)}
              >
                <IoClose />
              </button>
            </div>
          </>
        </div>
        <div className={styles.inputWrapper}>
          <IoSearch className={styles.searchIcon} />
          <input
            className={styles.input}
            placeholder={t("search").toString()}
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
        </div>
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
          {datepickerOpen && (
            <Datepicker
              selectRange
              value={selectedDates}
              onChange={setSelectedDates}
              onClose={onDatepickerClose}
            />
          )}
        </AnimatePresence>
      </div>
      <div className={styles.bar}>
        <button onClick={() => setFilterMenuOpen((prev) => !prev)} />
      </div>
    </>
  );
};

export default Filtration;
