import React from 'react';
import classes from './ActivityList.module.css';

export default function ActivityList(props) {
  return (
    <>
      <li className={classes.select__item} id={props.key} from={props.from}>
        <div className={classes.select__item_content}>
          <div>
            <img
              src={props.imageUrl}
              alt='activity'
              className={classes.select__image}
            />
            <span>{props.name}</span>
          </div>
          {props.from === 'user' && props.edit ? (
            <input type='checkbox' style={{ transform: 'scale(1.5)' }} />
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='30px'
              viewBox='0 0 24 24'
              width='30px'
              fill='#000000'
              className={classes.select__icon}
            >
              <path d='M0 0h24v24H0z' fill='none' />
              <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
            </svg>
          )}
        </div>
      </li>
    </>
  );
}
