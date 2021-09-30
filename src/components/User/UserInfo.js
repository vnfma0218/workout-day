import React from 'react';
import MainHeader from '../../shared/Navigation/MainHeader';
import Button from '../../shared/UIElement/Button';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './UserInfo.module.css';
export default function UserInfo() {
  return (
    <>
      <MainHeader />


    <Wrapper className={classes.userInfo__container} id={classes.userInfo}>
      <h1>현재 JW 님은 '운동모드' 입니다</h1>
      <article className={classes.userInfo}>
        <div className={classes.userImg}>
          <h2 className={classes.title}>회원정보</h2>
          <div className={classes.avatar}>
            <img src='' alt='' />
          </div>
        </div>
        <div className={classes.user__detail}>
          <div className={classes.user__info}>
            <div className={`${classes.user__personal}`}>
              <p className={classes.nickname}>닉네임</p>
              <p>Mr. Lee</p>
            </div>
            <div className={`${classes.user__personal}`}>
              <p className={classes.email}>이메일</p>
              <p>vnfma0218@naver.com</p>
            </div>
            <div className={`${classes.user__personal}`}>
              <p className={classes.password}>비밀번호</p>
              <p>**********</p>
            </div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.user__bmi}>
            <div className={`${classes.user__personal}`}>
              <p className={classes.height}>키</p>
              <p>176cm</p>
            </div>
            <div className={`${classes.user__personal}`}>
              <p className={classes.height}>몸무게</p>
              <p>76kg</p>
            </div>
            <div className={`${classes.user__personal}`}>
              <p className={classes.height}>BMI</p>
              <p>23.5</p>
            </div>
          </div>
        </div>
        <Button to={`/users/edit`} name='EDIT' className={classes.edit__btn} />
      </article>
    </Wrapper>
  );
}
