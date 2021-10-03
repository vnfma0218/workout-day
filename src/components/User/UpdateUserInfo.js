import React, { useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Input from '../../shared/FormElement/Input';
import Button from '../../shared/UIElement/Button';
import Wrapper from '../../shared/UIElement/Wrapper';
import useForm from '../../shared/hooks/form-hooks';

import classes from './UpdateUserInfo.module.css';

export default function UpdateUserInfo() {
  const [loadedUserInfo, setLoadedUserInfo] = useState();
  const { formState, onInputChange, setFormData } = useForm(
    {
      nickname: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      height: {
        value: '',
        isValid: false,
      },
      weight: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const avatarRef = useRef();
  useEffect(() => {
    const loadedUserInfo = {
      nickname: {
        value: '이푸름',
        isValid: true,
      },
      password: {
        value: '1234567',
        isValid: true,
      },
      height: {
        value: '194cm',
        isValid: true,
      },
      weight: {
        value: '65km',
        isValid: true,
      },
    };
    setLoadedUserInfo(loadedUserInfo);
    setFormData(loadedUserInfo, true);
  }, [setFormData]);

  const userInfoSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  const onAvatarClick = (e) => {
    console.log('click');
    avatarRef.current.click();
  };

  const avatarChangeHandler = (e) => {
    console.log(e.target.files);
  };

  return (
    <Wrapper className={classes.userInfo__container} id={classes.userInfo}>
      <h1>현재 JW 님은 '운동모드' 입니다</h1>
      {loadedUserInfo && (
        <article className={classes.userInfo}>
          <div className={classes.userImg}>
            <h2 className={classes.title}>회원정보</h2>
            <div className={classes.avatar} onClick={onAvatarClick}>
              <img src='' alt='' />
            </div>
          </div>
          <input
            type='file'
            ref={avatarRef}
            className={classes.avatarInput}
            onChange={avatarChangeHandler}
          />
          <form onSubmit={userInfoSubmitHandler} className={classes.userForm}>
            <div className={classes.user__detail}>
              <div className={classes.user__info}>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.label}>닉네임</p>
                  <Input
                    type='text'
                    id='nickname'
                    // placeholder='email'
                    initialValue={loadedUserInfo.nickname.value}
                    initialValid={true}
                    validator={(val) => val.trim().length > 0}
                    onInputChange={onInputChange}
                    errorText={'최소 한글자 이상 입력해주세요'}
                  />
                </div>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.label}>이메일</p>
                  <p>vnfma0218@naver.com</p>
                </div>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.label}>비밀번호</p>
                  <Input
                    type='text'
                    id='password'
                    // placeholder='email'
                    initialValue={'123456'}
                    initialValid={true}
                    validator={(val) => val.trim().length > 0}
                    onInputChange={onInputChange}
                    errorText={'at least 6 characters'}
                  />
                </div>
              </div>
              <div className={classes.user__bmi}>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.label}>키</p>
                  <Input
                    type='text'
                    id='height'
                    // placeholder='email'
                    initialValue={'Mr.Lee'}
                    initialValid={true}
                    validator={(val) => val.trim().length > 0}
                    onInputChange={onInputChange}
                    errorText={'적절한 숫자를 입력해주세요'}
                  />
                </div>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.label}>몸무게</p>
                  <Input
                    type='text'
                    id='weight'
                    // placeholder='email'
                    initialValue={'Mr.Lee'}
                    initialValid={true}
                    validator={(val) => val.trim().length > 0}
                    onInputChange={onInputChange}
                    errorText={'적절한 숫자를 입력해주세요'}
                  />
                </div>
              </div>
            </div>
          </form>
          <Button
            to='/userinfo'
            name='CANCEL'
            className={classes.cancel__btn}
          />
          <Button
            disabled={!formState.formIsValid}
            name='SUBMIT'
            className={classes.submit__btn}
            type='submit'
            onClick={userInfoSubmitHandler}
          />
        </article>
      )}
    </Wrapper>
  );
}
