import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";
import en from "dayjs/locale/en-gb";
import { DatepickerDate } from "../types";

dayjs.locale(en);

dayjs.extend(isBetween);

dayjs.extend(weekOfYear);

export const setFormattedTime = (date: Date | string | null) => {
  return dayjs(date).format("HH:mm");
};

export const setFormattedDate = (date: Date | string | null) => {
  return dayjs(date).format("D MMM YYYY");
};

export const setFormattedDateTime = (date?: Date | undefined) => {
  if (date) {
    return dayjs(date).format("D MMM YYYY HH:mm");
  } else {
    return dayjs().format("YYYY-MM-DDTHH:mm");
  }
};

export const setFormattedDatepickerDate = (date: DatepickerDate) => {
  if (Array.isArray(date)) {
    const [startDate, endDate] = date;
    return `${setFormattedDate(startDate).toString()} - ${setFormattedDate(
      endDate
    ).toString()}`;
  } else {
    return "";
  }
};

export const sortByDate = (dateA: Date, dateB: Date) => {
  return dayjs(dateA).diff(dayjs(dateB));
};

export const filterByDate = (
  transactionDate: Date,
  startDate: Date | null,
  endDate: Date | null
) => {
  return dayjs(transactionDate).isBetween(startDate, endDate, "day", "[]");
};

export const filterByWeek = (date: Date, offset = 0) => {
  return dayjs(dayjs(date).week()).isSame(dayjs().week() - offset);
};

export const filterByMonth = (date: Date, offset = 0) => {
  return dayjs(dayjs(date).month()).isSame(dayjs().month() - offset);
};

export const isDaysSame = (dateA: Date, dateB: Date) => {
  return dayjs(dayjs(dateA).day()).isSame(dayjs(dateB).day());
};
