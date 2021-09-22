import React, { useContext } from 'react';
import { ModeContext } from '../../context/mode-context';
import classes from './Wrapper.module.css';

export default function Wrapper(props) {
  const mode = useContext(ModeContext);

  return (
    <section className={classes.wrapper} id={props.id}>
      <div
        className={
          mode.isDietMode
            ? `${classes.wrapper__dietmode} ${props.className}`
            : `${classes.wrapper__normalmode} ${props.className}`
        }
      >
        {props.children}
        <button className={classes.dietMode} onClick={mode.onDietMode}>
          DietMode
        </button>
        <button className={classes.NormalMode} onClick={mode.onNormalMode}>
          NormalMode
        </button>
      </div>
    </section>
  );
}
