import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import classes from './DatePicker.module.css';
export default function DateRange() {
  const [dateRange, setDateRange] = useState([new Date(), null]);
  const [startDate, endDate] = dateRange;
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={classes.dateInput} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  console.log(startDate, endDate);
  return (
    <DatePicker
      locale={ko}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      customInput={<ExampleCustomInput />}
      withPortal
    />
  );
}
