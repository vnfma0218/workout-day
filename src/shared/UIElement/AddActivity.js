import React, { useState } from 'react';
import classes from './AddActivity.module.css';
import Select from 'react-select';

export default function AddActivity() {
  const [choice, setChoice] = useState('');
  const options = [
    { value: 'Golf', label: '🏌️‍♂️' },
    { value: 'Ball', label: '🏀' },
    { value: 'Free', label: '🤸‍♀️' },
    { value: 'Free', label: '🤸‍♀️' },
    { value: 'Free', label: '🤸‍♀️' },
    { value: 'Free', label: '🤸‍♀️' },
  ];

  return (
    <form
      className={classes.form}
      // onSubmit={
      //  props.submit ? props.onSubmit : (event) => event.preventDefault
      // }
    >
      <Select
        options={options}
        name='choice'
        className={classes.form__select}
        value={options.find((op) => {
          return op.value === choice;
        })}
        placeholder='Choice!'
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}

        // onChange={}
      />
      <input
        className={classes.activity__name}
        type='text'
        placeholder='Enter your workout'
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='30px'
        viewBox='0 0 24 24'
        width='30px'
        fill='#000000'
      >
        <path d='M0 0h24v24H0z' fill='none' />
        <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
      </svg>
    </form>
  );
}
