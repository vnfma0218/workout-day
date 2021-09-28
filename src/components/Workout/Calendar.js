import React from 'react';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './Calendar.module.css';

export default function Calendar() {
  return (
    <Wrapper>
      <div className={classes.calendar}></div>;
    </Wrapper>
  );
}
