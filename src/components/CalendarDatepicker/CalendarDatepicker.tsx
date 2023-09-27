import { CalendarProps } from "react-calendar";
import { DatePicker, Popup } from "ui";

interface CalendarDatePickerProps extends CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = (props) => {
  const { isOpen, onClose, ...restProps } = props;

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <DatePicker {...restProps} />
    </Popup>
  );
};

export default CalendarDatePicker;
