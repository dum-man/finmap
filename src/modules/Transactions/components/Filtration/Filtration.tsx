import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import classNames from "classnames";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoClose, IoSearch } from "react-icons/io5";
import { Datepicker, Select } from "ui";
import { setFormattedDatepickerDate } from "../../helpers";
import { DATE_FILTER_OPTIONS } from "../../constants";
import { DatepickerDate, SelectOption } from "types";
import {
  setSearchQuery,
  setSelectedDates,
  setSelectedOption,
} from "app/slices/filterSlice";
import { RootState } from "app/store";
import styles from "./Filtration.module.scss";

const Filtration: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const { selectedOption, searchQuery, selectedDates } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const dateRangeOptionValue: SelectOption = {
    id: "7",
    group: "base",
    label: setFormattedDatepickerDate(selectedDates),
  };

  const onSearchQueryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(evt.target.value));
  };

  const onSelectDateOption = (option: SelectOption) => {
    dispatch(setSelectedOption(option));
    if (selectedDates) {
      dispatch(setSelectedDates(null));
    }
  };

  const onDatepickerClose = () => {
    setDatepickerOpen(false);
    if (Array.isArray(selectedDates)) {
      dispatch(setSelectedOption({ id: "0", group: "base", label: "selectDates" }));
    }
  };

  return (
    <>
      <div
        className={classNames(styles.container, {
          [styles.visible]: filterMenuOpen,
          [styles.hidden]: !filterMenuOpen,
        })}
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
              onChange={(dates: DatepickerDate) => dispatch(setSelectedDates(dates))}
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
});

export default Filtration;
