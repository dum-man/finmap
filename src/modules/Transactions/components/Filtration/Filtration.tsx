import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoClose, IoSearch } from "react-icons/io5";
import useAppSelector from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import { CalendarDatePicker } from "components";
import { Select } from "ui";
import { setFormattedDatePickerDate } from "../../helpers";
import { DATE_FILTER_OPTIONS } from "../../constants";
import { DatePickerDate, SelectOption } from "types";
import {
  setSearchQuery,
  setSelectedDates,
  setSelectedOption,
} from "app/slices/filterSlice";
import { DATEPICKER_DATE_OPTION, DEFAULT_DATE_OPTION } from "app/constants";
import styles from "./Filtration.module.css";

const Filtration: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { selectedOption, searchQuery, selectedDates } = useAppSelector(
    (state) => state.filter
  );

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleSearchQueryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(evt.target.value));
  };

  const handleSelectDateOption = (option: SelectOption) => {
    dispatch(setSelectedOption(option));
  };

  const handleSetSelectedDates = (dates: DatePickerDate) =>
    dispatch(setSelectedDates(dates));

  const handleDatePickerClose = () => {
    setDatePickerOpen(false);
    if (Array.isArray(selectedDates)) {
      dispatch(setSelectedOption(DATEPICKER_DATE_OPTION));
    }
  };

  const handleDatePickerClear = () => {
    dispatch(setSelectedOption(DEFAULT_DATE_OPTION));
    dispatch(setSelectedDates(null));
  };

  return (
    <div className={styles["container"]}>
      {selectedDates ? (
        <div className={styles["date-picker"]}>
          <p>{setFormattedDatePickerDate(selectedDates)}</p>
          <button
            className={classNames(
              "icon-button",
              styles["icon-button"],
              styles["close-button"]
            )}
            onClick={handleDatePickerClear}
          >
            <IoClose />
          </button>
          <button
            className={classNames("icon-button", styles["icon-button"])}
            onClick={() => setDatePickerOpen(true)}
          >
            <AiOutlineCalendar />
          </button>
        </div>
      ) : (
        <div className={styles["select-wrapper"]}>
          <Select
            options={DATE_FILTER_OPTIONS}
            value={selectedOption}
            onChange={handleSelectDateOption}
          />
          <button
            className={classNames(
              "icon-button",
              styles["icon-button"],
              styles["calendar-button"]
            )}
            onClick={() => setDatePickerOpen(true)}
          >
            <AiOutlineCalendar />
          </button>
        </div>
      )}
      <div className={styles["input-wrapper"]}>
        <IoSearch className={styles["search-icon"]} />
        <input
          className={classNames("input", styles["input"])}
          placeholder={t("search").toString()}
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
      <CalendarDatePicker
        selectRange
        isOpen={datePickerOpen}
        onClose={handleDatePickerClose}
        value={selectedDates}
        onChange={handleSetSelectedDates}
      />
    </div>
  );
});

export default Filtration;
