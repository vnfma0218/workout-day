import React, { useContext } from 'react';
import { ModeContext } from '../../context/mode-context';
import classes from './Button.module.css';
export default function Button(props) {
  const mode = useContext(ModeContext);
  const { className } = props;
  return (
    <button
      onClick={props.onClick}
      className={
        mode.isDietMode
          ? `${classes.btn} ${classes.diet__mode} ${classes.className}`
          : `${classes.btn} ${classes.workout__mode} ${classes.className}`
      }
    >
      {props.name}
    </button>
  );
}
