import React, { useContext } from 'react';
import { ModeContext } from '../../context/mode-context';
import classes from './Button.module.css';
export default function Button(props) {
  const mode = useContext(ModeContext);

  const assignedClasses = [classes.btn];

  if (props.className) {
    assignedClasses.push(props.className);
  }
  if (mode.isDietMode) {
    assignedClasses.push(classes.diet__mode);
  } else {
    assignedClasses.push(classes.workout__mode);
  }

  return (
    <button onClick={props.onClick} className={assignedClasses.join(' ')}>
      {props.name}
    </button>
  );
}
