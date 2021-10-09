import React from 'react';
import classes from './UserPhotoInfo.module.css';
export default function UserPhotoInfo() {
  return (
    <div>
      <header className={classes.userPhotoInfo}>
        <div className={classes.user__img}>
          <span className={classes.user__avatar}>
            <img src='image/userPhoto/photo4.jpg' alt='avatar' />
          </span>
        </div>
        <section className={classes.userInfo}>
          <div className={classes.user__nickname}>
            <h2>parineetichopra</h2>
          </div>
          <ul className={classes.user__body}>
            <li className={classes.user__workout__detail}>
              <span>운동시간</span>
              <span>2시간(일)</span>
            </li>
            <li className={classes.user__workout__detail}>
              <span>운동횟수</span>
              <span>2시간(일)</span>
            </li>
            <li className={classes.user__workout__detail}>
              <span>팔로워</span>
              <span>200명</span>
            </li>
          </ul>
          <div className={classes.user__greeting}>
            <h4>vnfma0218@naver.com</h4>
            <span>Be kind, always</span>
          </div>
        </section>
      </header>
    </div>
  );
}
