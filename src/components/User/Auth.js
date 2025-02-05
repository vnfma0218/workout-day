import React, { useState } from 'react';
import Input from '../../shared/FormElement/Input';
import Button from '../../shared/UIElement/Button';
import useForm from '../../shared/hooks/form-hooks';
import Wrapper from '../../shared/UIElement/Wrapper';
import Modal from '../../shared/UIElement/Modal';

import useAuthHook from '../../shared/hooks/useAuthHook';
import classes from './Auth.module.css';
const emailRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isWorkoutMode, setIsWorkoutMode] = useState(true);
  const { modalOpen, error, signupHandler, closeModalHandler, loginHandler } =
    useAuthHook();
  const { formState, onInputChange, setFormData } = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const onToggleLoginMode = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          passwordConfirm: undefined,
          nickname: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          passwordConfirm: {
            value: '',
            isValid: false,
          },
          nickname: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  const submitHandler = async (e) => {
    console.log(formState);
    e.preventDefault();
    if (!isLoginMode) {
      const {
        email: { value: email },
        password: { value: password },
        passwordConfirm: { value: passwordConfirm },
        nickname: { value: nickname },
      } = formState.inputs;
      signupHandler(email, password, passwordConfirm, nickname, isWorkoutMode);
    } else {
      const {
        email: { value: email },
        password: { value: password },
      } = formState.inputs;
      loginHandler(email, password);
    }
  };

  const modeSelectHandler = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'workoutMode') {
      setIsWorkoutMode(true);
    } else {
      setIsWorkoutMode(false);
    }
  };

  return (
    <>
      <Wrapper className={classes.auth__container}>
        <Modal
          open={modalOpen}
          title='Error'
          onClose={closeModalHandler}
          onConfirm={closeModalHandler}
        >
          {error}
        </Modal>
        <section className={classes.auth__container}>
          <div className={classes.auth__img}>
            <img src='./img/illustrations/auth.png' alt='auth-img' />
          </div>
          <div className={classes.form__container}>
            <div className={classes.form__container_content}>
              <h1 className={classes.form__title}>Thank you for visiting</h1>
              <h1 className={classes.authMode__title}>
                {isLoginMode ? '로그인' : '회원가입'}
              </h1>
              {!isLoginMode && (
                <div className={classes.workout__mode_container}>
                  <div className={classes.workout__mode}>
                    <label htmlFor='workout-mode'>
                      운동모드<strong>?</strong>
                      <span className={classes.workout__mode_text}>
                        기본적인 운동을 기록하고 확인할 수 있습니다.
                      </span>
                    </label>
                    <input
                      checked={isWorkoutMode}
                      type='checkbox'
                      name='workoutMode'
                      onChange={modeSelectHandler}
                    />
                  </div>
                  <div className={classes.diet__mode}>
                    <label htmlFor='workout-mode'>
                      다이어트모드<strong>?</strong>
                    </label>
                    <span className={classes.diet__mode_text}>
                      목표 몸무게를 설정하고 식단과 몸무게를 기록할 수 있습니다
                    </span>
                    <input
                      checked={!isWorkoutMode}
                      type='checkbox'
                      name='dietMode'
                      onChange={modeSelectHandler}
                    />
                  </div>
                </div>
              )}

              <form className={classes.auth__form} onSubmit={submitHandler}>
                <div className={classes.form__control}>
                  <Input
                    type='text'
                    id='email'
                    placeholder='email'
                    validator={(val) => emailRegex.test(val)}
                    onInputChange={onInputChange}
                    errorText={'이메일 형식에 맞지않습니다'}
                  />
                </div>
                <div className={classes.form__control}>
                  <Input
                    type='password'
                    id='password'
                    placeholder='password'
                    validator={(val) => val.trim().length > 5}
                    onInputChange={onInputChange}
                    errorText={'6글자 이상이 필요합니다'}
                  />
                </div>
                {!isLoginMode && (
                  <div className={classes.form__control}>
                    <Input
                      type='password'
                      id='passwordConfirm'
                      placeholder='password confirm'
                      validator={(val) => val.trim().length > 5}
                      onInputChange={onInputChange}
                      errorText={'6글자 이상이 필요합니다'}
                    />
                  </div>
                )}
                {!isLoginMode && (
                  <div className={classes.form__control}>
                    <Input
                      id='nickname'
                      placeholder='nickname'
                      validator={(val) => val.trim().length > 0}
                      onInputChange={onInputChange}
                      errorText={'최소 1글자가 필요합니다'}
                    />
                  </div>
                )}
                <div className={classes.auth__helper}>
                  <div className={classes.rememberMe}>
                    <input type='checkbox' />
                    <span>Remember me</span>
                  </div>
                  <p className={classes.forgot}>Forgot password?</p>
                </div>
                <Button
                  name={isLoginMode ? 'Login' : 'Sign up'}
                  className={classes.submit__btn}
                  disabled={!formState.formIsValid}
                />
              </form>
              <div className={classes.loginMode}>
                <p>
                  {isLoginMode
                    ? 'don`t have an account?'
                    : 'Already have an account?'}
                </p>
                <p
                  className={classes.toggleLoginMode}
                  onClick={onToggleLoginMode}
                >
                  {isLoginMode ? 'sign up' : 'login'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}
