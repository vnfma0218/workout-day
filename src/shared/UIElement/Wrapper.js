import React, { useContext } from 'react';
import { ModeContext } from '../../context/mode-context';
import classes from './Wrapper.module.css';

export default function Wrapper(props) {
  const mode = useContext(ModeContext);
  return (
    <section
      id={props.id}
      className={
        mode.isDietMode
          ? `${classes.wrapper__dietmode} ${classes.wrapper} ${props.className}`
          : `${classes.wrapper__normalmode} ${classes.wrapper} ${props.className}`
      }
    >
      <button className={classes.dietMode} onClick={mode.onDietMode}>
        DietMode
      </button>
      <button className={classes.NormalMode} onClick={mode.onNormalMode}>
        NormalMode
      </button>
      {props.children}
    </section>
  );
}
