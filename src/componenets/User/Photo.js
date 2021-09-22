import React from 'react';
import Button from '../../shared/UIElement/Button';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './Photo.module.css';
export default function Photo() {
  return (
    <Wrapper id='photo'>
      {/* <div className={classes.photo__header}></div> */}

      <Button name='DATE' />
      <div className={classes.photos}>
        <div className={classes.left}>
          <img src='image/userPhoto/photo1.jpg' alt='workout' />
        </div>
        <div className={classes.right}>
          <div className={classes.right__top}>
            <img src='image/userPhoto/photo2.jpg' alt='' />
          </div>
          <div className={classes.right__bottom}>
            <div className={classes.right__bottom_left}>
              <img src='image/userPhoto/photo4.jpg' alt='' />
              <img src='image/userPhoto/photo4.jpg' alt='' />
            </div>
            <div className={classes.right__bottom_right}>
              <img src='image/userPhoto/photo3.jpg' alt='' />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
