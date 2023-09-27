import dayjs from "dayjs";
import { DatePickerDate } from "types";

const setFormattedDate = (date: Date | string | null) => {
  return dayjs(date).format("D MMM YYYY");
};

export const setFormattedDatePickerDate = (date: DatePickerDate) => {
  if (Array.isArray(date)) {
    const [startDate, endDate] = date;
    return `${setFormattedDate(startDate).toString()} - ${setFormattedDate(
      endDate
    ).toString()}`;
  } else {
    return "";
  }
};
