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
import { DATEPICKER_DATE_OPTION, DEFAULT_DATE_OPTION } from "app/constants";
import { RootState } from "app/store";
import styles from "./Filtration.module.scss";

const Filtration: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const { selectedOption, searchQuery, selectedDates } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();

  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const handleSearchQueryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(evt.target.value));
  };

  const handleSelectDateOption = (option: SelectOption) => {
    dispatch(setSelectedOption(option));
  };

  const handleSetSelectedDates = (dates: DatepickerDate) =>
    dispatch(setSelectedDates(dates));

  const handleDatepickerClose = () => {
    setDatepickerOpen(false);
    if (Array.isArray(selectedDates)) {
      dispatch(setSelectedOption(DATEPICKER_DATE_OPTION));
    }
  };

  const handleDatepickerClear = () => {
    dispatch(setSelectedOption(DEFAULT_DATE_OPTION));
    dispatch(setSelectedDates(null));
  };

  return (
    <div className={styles.container}>
      {selectedDates ? (
        <div
          className={classNames(styles.datepicker, {
            [styles.focused]: datepickerOpen,
          })}
        >
          <p>{setFormattedDatepickerDate(selectedDates)}</p>
          <button
            className={classNames(styles.iconButton, styles.closeButton)}
            onClick={handleDatepickerClear}
          >
            <IoClose />
          </button>
          <button
            className={classNames(styles.iconButton)}
            onClick={() => setDatepickerOpen(true)}
          >
            <AiOutlineCalendar />
          </button>
        </div>
      ) : (
        <div className={styles.selectWrapper}>
          <Select
            options={DATE_FILTER_OPTIONS}
            cancelable={false}
            value={selectedOption}
            onChange={handleSelectDateOption}
          />
          <button
            className={classNames(styles.iconButton, styles.calendarButton)}
            onClick={() => setDatepickerOpen(true)}
          >
            <AiOutlineCalendar />
          </button>
        </div>
      )}
      <div className={styles.inputWrapper}>
        <IoSearch className={styles.searchIcon} />
        <input
          className={styles.input}
          placeholder={t("search").toString()}
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {datepickerOpen && (
          <Datepicker
            selectRange
            value={selectedDates}
            onChange={handleSetSelectedDates}
            onClose={handleDatepickerClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

export default Filtration;
