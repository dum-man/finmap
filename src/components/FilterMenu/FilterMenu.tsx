import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoClose, IoSearch } from "react-icons/io5";
import Datepicker from "../../components/UI/Datepicker/Datepicker";
import Select from "../../components/UI/Select/Select";
import useAppContext from "../../hooks/useAppContext";
import { setFormattedDatepickerDate } from "../../utils/dateUtils";
import { DATE_FILTER_OPTIONS } from "../../app/constants";
import { SelectOption } from "../../types";
import styles from "./FilterMenu.module.scss";

const FilterMenu: React.FC = () => {
  const { t } = useTranslation();

  const {
    selectedOption,
    selectedDates,
    setSearchQuery,
    setSelectedOption,
    setSelectedDates,
  } = useAppContext();

  const [datepickerOpen, setDatepickerOpen] = useState(false);

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

  const dateRangeOptionValue: SelectOption = {
    id: "7",
    group: "base",
    label: setFormattedDatepickerDate(selectedDates),
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.selectWrapper}>
          <Select
            value={Array.isArray(selectedDates) ? dateRangeOptionValue : selectedOption}
            onChange={onSelectDateOption}
            options={DATE_FILTER_OPTIONS}
          />
        </div>
        <div
          className={`${styles.input} ${styles.datepicker} ${
            datepickerOpen ? styles.focused : ""
          }`}
          onClick={() => setDatepickerOpen(true)}
        >
          {Array.isArray(selectedDates) ? (
            <span>{setFormattedDatepickerDate(selectedDates)}</span>
          ) : (
            <span className={styles.placeholder}>{t("selectDates")}</span>
          )}
        </div>
        <div className={styles.iconButtons}>
          <button className={styles.iconButton} onClick={() => setDatepickerOpen(true)}>
            <AiOutlineCalendar />
          </button>
          <button
            className={`${styles.iconButton} ${styles.clearButton}`}
            onClick={() => setSelectedDates(null)}
          >
            <IoClose />
          </button>
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
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          placeholder={t("search").toString()}
          onChange={onSearchQueryChange}
        />
        <IoSearch className={styles.searchIcon} />
      </div>
    </div>
  );
};

export default FilterMenu;
