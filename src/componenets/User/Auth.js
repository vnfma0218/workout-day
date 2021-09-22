import React from 'react';
import Button from '../../shared/UIElement/Button';
import classes from './Auth.module.css';
export default function Auth() {
  return (
    <section className={classes.auth__container}>
      <div className={classes.auth__img}>
        <img src='./image/auth/Ride a bicycle-rafiki.png' alt='auth-img' />
      </div>
      <div className={classes.form__container}>
        <div className={classes.form__container_content}>
          <h1 className={classes.form__title}>Thank you for visiting</h1>
          <h1 className={classes.authMode__title}>회원가입</h1>
          <div className={classes.workout__mode_container}>
            <div className={classes.workout__mode}>
              <label htmlFor='workout-mode'>
                운동모드<strong>?</strong>
                <span className={classes.workout__mode_text}>
                  기본적인 운동을 기록하고 확인할 수 있습니다.
                </span>
              </label>
              <input type='checkbox' />
            </div>
            <div className={classes.diet__mode}>
              <label htmlFor='workout-mode'>
                다이어트모드<strong>?</strong>
              </label>
              <span className={classes.diet__mode_text}>
                목표 몸무게를 설정하고 식단과 몸무게를 기록할 수 있습니다
              </span>
              <input type='checkbox' />
            </div>
          </div>
          <form className={classes.auth__form}>
            <div className={classes.form__control}>
              <input type='text' placeholder='email' />
            </div>
            <div className={classes.form__control}>
              <input type='password' placeholder='password' />
            </div>
            <div className={classes.auth__helper}>
              <div className={classes.rememberMe}>
                <input type='checkbox' />
                <span>Remember me</span>
              </div>
              <p className={classes.forgot}>Forgot password?</p>
            </div>
            <Button name='Login' className='submit__btn' />
          </form>
        </div>
      </div>
    </section>
  );
}
