import { CalendarProps } from "react-calendar";
import { Datepicker, Popup } from "ui";

interface CalendarDatepickerProps extends CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarDatepicker: React.FC<CalendarDatepickerProps> = (props) => {
  const { isOpen, onClose, ...restProps } = props;

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <Datepicker {...restProps} />
    </Popup>
  );
};

export default CalendarDatepicker;
