import React from 'react';

import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './Home.module.css';

export default function Home() {
  return (
    <Wrapper className={classes.container}>
      <img
        src='image/illustrations/home_bg.svg'
        className={classes.container__img}
        alt='home'
      />
      <h1 className={classes.container__title}>
        Let’s record workout, <br /> together
      </h1>
    </Wrapper>
  );
}
