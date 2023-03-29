import dayjs from "dayjs";
import { DatepickerDate } from "../../../types";

export const setFormattedTime = (date: Date | string | null) => {
  return dayjs(date).format("HH:mm");
};

const setFormattedDate = (date: Date | string | null) => {
  return dayjs(date).format("D MMM YYYY");
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
