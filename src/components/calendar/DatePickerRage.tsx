import { addDays, format, subDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { useCallback, useState } from "react";
import type { FC } from "react";
import type { RangeKeyDict } from "react-date-range";
import type { Range } from "react-date-range";
import { TCalendarValue } from '../../types/calendar';
import { Calendar } from './Calendar';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRagePicker';

export const DatePickerRage = () => {

  const [valueCalendar, setValueCalendar] = useState<TCalendarValue>(new Date());
  const [valueDatePicker, setValueDatePicker] = useState<Date | undefined>(new Date());
  const [valueDateRangePicker, setValueDateRangePicker] = useState<Range[] | undefined>([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);


  const formattedValueCalendar =
    valueCalendar && !Array.isArray(valueCalendar)
      ? format(valueCalendar, "dd.MM.yyyy", { locale: enUS })
      : "";

  const formattedValueDatePicker = valueDatePicker
    ? format(valueDatePicker, "dd.MM.yyyy", { locale: enUS })
    : "";


  const formattedValueDateRangePickerStartDate = valueDateRangePicker?.[0].startDate
    ? format(valueDateRangePicker[0].startDate, "dd.MM.yyyy", { locale: enUS })
    : "";
  const formattedValueDateRangePickerEndDate = valueDateRangePicker?.[0].endDate
    ? format(valueDateRangePicker[0].endDate, "dd.MM.yyyy", { locale: enUS })
    : "";

  const handleChangeValueDateRangePicker = useCallback((ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setValueDateRangePicker([selection]);
  }, []);



  return (
    <div>
      <h4>Calendar</h4>
      <Calendar locale={enUS.code} onChange={setValueCalendar} value={valueCalendar} />
      <pre>{JSON.stringify(formattedValueCalendar, null, 2)}</pre>
      <br />
      <h5>DatePicker</h5>
      <DatePicker locale={enUS} onChange={setValueDatePicker} value={valueDatePicker} />
      <pre>{JSON.stringify(formattedValueDatePicker, null, 2)}</pre>
      <br />
      <h6>DatePicker range</h6>
      <DateRangePicker
        editableDateInputs={true}
        locale={enUS}
        minDate={addDays(new Date(), -7)}
        maxDate={addDays(new Date(), 0)}
        onChange={handleChangeValueDateRangePicker}
        ranges={valueDateRangePicker}
        showDateDisplay={true}
        showPreview={true}
      />
      <pre>{JSON.stringify(formattedValueDateRangePickerStartDate, null, 2)}</pre>-{" "}
      <pre>{JSON.stringify(formattedValueDateRangePickerEndDate, null, 2)}</pre>
    </div>
  )
}
