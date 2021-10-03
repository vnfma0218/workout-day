import React from 'react';

import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './Home.module.css';

export default function Home() {
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
    </Wrapper>
  );
}
