import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModeContext } from '../../context/mode-context';
import classes from './Button.module.css';
export default function Button(props) {
  const mode = useContext(ModeContext);

  const assignedClasses = [classes.btn];

  if (mode.isDietMode) {
    assignedClasses.push(classes.diet__mode);
  } else {
    assignedClasses.push(classes.workout__mode);
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${assignedClasses.join(' ')} ${props.className}`}
      >
        {props.name}
      </Link>
    );
  }

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${assignedClasses.join(' ')} ${props.className}`}
    >
      {props.name}
    </button>
  );
}
