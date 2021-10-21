import React from 'react';
import classes from './LoadingSpinner.module.css';
export default function LoadingSpinner(props) {
  return (
    <div className={`${props.asOverlay && classes.loading_spinner__overlay}`}>
      <div className={classes.lds_dual_ring}></div>
    </div>
  );
}
