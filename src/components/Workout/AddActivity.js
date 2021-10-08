import React, { useState } from 'react';
import classes from './AddActivity.module.css';
import Select from 'react-select';

export default function AddActivity(props) {
  const [choice, setChoice] = useState('');
  // const [inputs, setInputs] = useState({
  //   name: '',
  //   icon: '',
  //   from: 'user',
  // });
  const options = [
    {
      value: 'Free',
      label: 'barbell',
      iconUrl:
        'https://img-premium.flaticon.com/png/512/1297/premium/1297690.png?token=exp=1633497627~hmac=2a8cf4f6633cce9c49193d3500662f65',
    },
    {
      value: 'Free',
      label: 'golf',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/753/753858.png',
    },
    {
      value: 'Free',
      label: 'homeTraining',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/553/553416.png',
    },
    {
      value: 'Free',
      label: 'ball',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/587/587393.png',
    },
    {
      value: 'Free',
      label: 'dance',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3048/3048356.png',
    },
    {
      value: 'Free',
      label: 'stretch',
      iconUrl:
        'https://img-premium.flaticon.com/png/512/1653/premium/1653925.png?token=exp=1633497932~hmac=7d63cbd8c42ab7c31628f5f97fb28279',
    },
    {
      value: 'Free',
      label: 'etc',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3388/3388801.png',
    },
  ];

  // const { Option } = components;
  // const IconOption = (props) => (
  //   <Option {...props}>
  //     <img
  //       src={require('./' + props.data.iconUrl)}
  //       style={{ width: 36 }}
  //       alt={props.data.label}
  //     />
  //     {props.data.label}
  //   </Option>
  // );

  // const choiceHandler = (e) => {
  //   setChoice(e.iconUrl);
  // };

  const activityInputHandler = (e) => {
    
    if (e.iconUrl) {
      props.setInputs({ imageUrl: e.iconUrl });
    }
    if (e.target) {
      const { name, value } = e.target;
      props.setInputs({
        ...props.inputs,
        [name]: value,
        from: 'user',
        date: new Date(),
      });
    }
  };

  return (
    <div className={classes.form__wrapper}>
      {props.error && (
        <div className={classes.err__box}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            fill='#000000'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' />
          </svg>
          <p>이미지와 운동명을 입력해주세요.</p>
        </div>
      )}
      <form className={classes.form}>
        <Select
          options={options}
          name='choice'
          className={classes.form__select}
          value={options.find((op) => {
            return op.value === choice;
          })}
          placeholder='icon'
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          onChange={activityInputHandler}
          getOptionLabel={(e) => (
            <img
              src={e.iconUrl}
              alt=''
              style={{ width: '20px', height: '20px' }}
            />
          )}
        />
        <input
          name='name'
          className={classes.activity__name}
          type='text'
          required
          placeholder='Enter your workout'
          onChange={activityInputHandler}
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
    </div>
  );
}
