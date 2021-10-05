import React, { useState } from 'react';
import classes from './AddActivity.module.css';
import Select, { components } from 'react-select';
import { dbService } from '../../firebase';

export default function AddActivity() {
  const [choice, setChoice] = useState('');
  const options = [
    {
      value: 'Free',
      label: 'barbell',
      iconUrl: 'img/exercise/barbell.png',
    },
    {
      value: 'Free',
      label: 'golf',
      iconUrl: 'img/exercise/golf.png',
    },
    {
      value: 'Free',
      label: 'homeTraining',
      iconUrl: 'img/exercise/home.png',
    },
    {
      value: 'Free',
      label: 'ball',
      iconUrl: 'img/exercise/ball.png',
    },
  ];

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <img
        src={require('./' + props.data.iconUrl)}
        style={{ width: 36 }}
        alt={props.data.label}
      />
      {props.data.label}
    </Option>
  );

  const choiceHandler = (e) => {
    setChoice(e.iconUrl);
    console.log(e);
    // const docRef = await AudioScheduledSourceNode(collection(db, 'activity'), {
    //   name:
    // })
  };

  const addActivityHandler = (e) => {
    dbService.doc('/activity/iDowLboCGD6mfAnoIvOJ').add({
      name: e.target.value,
      from: 'user',
      imageUrl: choice,
    });
  };
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
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        onChange={choiceHandler}
        getOptionLabel={(e) => (
          <img
            src={e.iconUrl}
            alt=''
            style={{ width: '20px', height: '20px' }}
          />
          // <div style={{ display: 'flex', alignItems: 'center'}}>
          //   {e.icon}
          //   <span style={{ marginLeft: 5 }}>{e.label}</span>
          // </div>
        )}
      />
      <input
        className={classes.activity__name}
        type='text'
        placeholder='Enter your workout'
        onChange={addActivityHandler}
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
