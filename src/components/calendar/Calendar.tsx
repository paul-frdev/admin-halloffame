import isNull from "lodash/isNull";
import { memo, useState } from "react";
import CalendarUI from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TCalendarValue } from '../../types/calendar';
import "./calendar.css"


type TProps = {
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  onChange?: (date: Date) => void;
  value?: TCalendarValue;
  disabled?: boolean;
} & CalendarProps;

const CalendarComponent: React.FC<TProps> = (props) => {

  const { locale, maxDate, minDate, onChange, value, disabled } = props;

  const [activeDate, setActiveDate] = useState<Date | undefined>(new Date());


  const handleClickDay = (value: Date) => {
    onChange?.(value);
    setActiveDate(value);
  };

  const onActiveStartDateChange: CalendarProps["onActiveStartDateChange"] = (props) => {
    if (props.action === "prev2") {
      return;
    }
    isNull(props.activeStartDate) ? setActiveDate(undefined) : setActiveDate(props.activeStartDate);
  };

  return (
    <CalendarUI
      {...props}
      activeStartDate={activeDate} 
      className="calendar"
      locale={locale}
      maxDate={maxDate}
      minDate={minDate}
      onActiveStartDateChange={onActiveStartDateChange}
      onClickDay={handleClickDay}
      tileClassName="Calendar-DayTile"
      value={value}
    />
  )
}


export const Calendar = memo(CalendarComponent)
