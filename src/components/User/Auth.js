import React, { useCallback } from 'react';
import { useReducer } from 'react';
import Input from '../../shared/FormElement/Input';
import MainHeader from '../../shared/Navigation/MainHeader';
import Button from '../../shared/UIElement/Button';
import classes from './Auth.module.css';

const emailRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const formReducer = (state, action) => {
  switch (action.type) {
    case 'change':
      let formIsValid = true;
      for (const property in state.inputs) {
        if (!state.inputs[property]) {
          continue;
        }
        if (action.id === property) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[property].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.isValid },
        },
        formIsValid,
      };
    default:
      return state;
  }
};

export default function Auth() {
  const [formState, formDispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    formIsValid: false,
  });

  const onInputChnage = useCallback((id, value, isValid) => {
    console.log(id);
    formDispatch({
      type: 'change',
      value: value,
      isValid: isValid,
      id: id,
    });
  }, []);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <>
      <MainHeader />
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
            <form className={classes.auth__form} onSubmit={loginSubmitHandler}>
              <div className={classes.form__control}>
                <Input
                  type='text'
                  id='email'
                  placeholder='email'
                  validator={(val) => emailRegex.test(val)}
                  onInputChnage={onInputChnage}
                />
              </div>
              <div className={classes.form__control}>
                <Input
                  type='password'
                  id='password'
                  placeholder='password'
                  validator={(val) => val.trim().length > 0}
                  onInputChnage={onInputChnage}
                />
              </div>
              <div className={classes.auth__helper}>
                <div className={classes.rememberMe}>
                  <input type='checkbox' />
                  <span>Remember me</span>
                </div>
                <p className={classes.forgot}>Forgot password?</p>
              </div>
              <Button
                name='Login'
                className={classes.submit__btn}
                invalid='true'
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
