import React from 'react';
import classes from './Auth.module.css';
export default function Auth() {
  return (
    <section className={classes.auth__container}>
      <div className={classes.auth__img}>
        <img src='./img/Ride a bicycle-rafiki.png' alt='auth-img' />
      </div>
      <div className={classes.form__container}>
        <div className={classes.form__container_content}>
          <h1 className={classes.form__title}>Thank you for visiting</h1>
          <h1 className={classes.authMode__title}>Login</h1>
          <div className={classes.form}>
            <label htmlFor='workout-mode'>운동모드</label>
            <input type='checkbox' />
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
            <button className={classes.submit__btn}>Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}
