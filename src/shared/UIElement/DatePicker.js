import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import classes from './DatePicker.module.css';
export default function DateRange(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
    props.setDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <span className={classes.dateInput}>
        {startDate.toISOString().split('T')[0]}
      </span>
      <img
        className={classes.arrowIcon}
        src='img/icons/down-arrow.png'
        alt='dropdown'
        onClick={handleClick}
      />
      {isOpen && (
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          inline
          minDate={props.minDate}
        />
      )}
    </>
  );
}
