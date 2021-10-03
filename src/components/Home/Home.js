import React, { useContext } from 'react';
import { ModeContext } from '../../context/mode-context';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './Home.module.css';

export default function Home() {
  const mode = useContext(ModeContext);

  const toggle = () => {
    console.log('click');
    mode.isDietMode ? mode.onNormalMode() : mode.onDietMode();
  };
  return (
    <Wrapper className={classes.home} id={classes.home}>
      <img
        src='img/illustrations/indoorbike.svg'
        className={classes.home__img}
        alt='home'
      />

      <h1 className={classes.home__title}>
        Let’s record workout, <br /> together
      </h1>
      <button onClick={toggle} style={{ position: 'fixed', zIndex: 333 }}>
        mode
      </button>
    </Wrapper>
  );
}
