import React, { useRef, useState, useEffect } from 'react';
import Input from '../../shared/FormElement/Input';
import Button from '../../shared/UIElement/Button';
import Wrapper from '../../shared/UIElement/Wrapper';
import useForm from '../../shared/hooks/form-hooks';

import classes from './UpdateUserInfo.module.css';
import { useAuth } from '../../context/auth-context';
import { dbService, storage } from '../../firebase';
import MainHeader from '../../shared/Navigation/MainHeader';
import { useHistory } from 'react-router';
import LoadingSpinner from '../../shared/UIElement/LoadingSpinner';

export default function UpdateUserInfo() {
  const [loadedUserInfo, setLoadedUserInfo] = useState();
  const { currentUser } = useAuth();
  const [previewUrl, setPreviewUrl] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { formState, onInputChange, setFormData } = useForm(
    {
      nickname: {
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
    setLoading(true);
    dbService
      .collection('users')
      .doc(currentUser.email)
      .get()
      .then((doc) => {
        const loadedUserInfo = {
          nickname: {
            value: doc.data().nickname,
            isValid: true,
          },
          height: {
            value: doc.data().height,
            isValid: doc.data().height ? true : false,
          },
          weight: {
            value: doc.data().weight,
            isValid: doc.data().weight ? true : false,
          },
          workoutMode: {
            value: doc.data().workoutMode,
            isValid: true,
          },
          imageUrl: {
            value: doc.data().imageUrl,
            isValid: true,
          },
        };
        let formIsValid;
        for (const key in loadedUserInfo) {
          formIsValid = loadedUserInfo[key].isValid;
        }
        setLoadedUserInfo(loadedUserInfo);
        setFormData(loadedUserInfo, formIsValid);
        setLoading(false);
      });
  }, [setFormData, currentUser]);

  const userInfoSubmitHandler = (e) => {
    e.preventDefault();
    const {
      height: { value: height },
      weight: { value: weight },
      nickname: { value: nickname },
      imageUrl: { value: imageUrl },
      workoutMode: { value: workoutMode },
    } = formState.inputs;
    dbService
      .collection('users')
      .doc(currentUser.email)
      .set({
        nickname,
        height,
        weight,
        imageUrl: previewUrl || imageUrl,
        workoutMode,
      });
    history.push('/userinfo');
  };

  const onAvatarClick = (e) => {
    console.log('click');
    avatarRef.current.click();
  };

  const avatarChangeHandler = (e) => {
    const image = e.target.files[0];
    setLoading(true);
    const uploadImage = storage.ref(`images/avatar/${image.name}`).put(image);
    uploadImage.on(
      'state_change',
      null,
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref('images/avatar/')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setPreviewUrl(url);
            setLoading(false);
          })
          .then(() => {});
      }
    );
  };
  return (
    <>
      <MainHeader />
      <Wrapper className={classes.userInfo__container} id={classes.userInfo}>
        <h1>
          현재 {loadedUserInfo && loadedUserInfo.nickname.value} 님은 '
          {loadedUserInfo && loadedUserInfo.workoutMode.value === true
            ? '운동모드'
            : '다이어트모드'}
          '입니다
        </h1>
        {loadedUserInfo && (
          <article className={classes.userInfo}>
            <div className={classes.userImg}>
              <div className={classes.avatar} onClick={onAvatarClick}>
                <img
                  src={previewUrl || loadedUserInfo.imageUrl.value}
                  alt='userAvatar'
                />
                <p>프로필 사진</p>
                {loading && <LoadingSpinner />}
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
                    <p>{currentUser.email}</p>
                  </div>
                  <div className={`${classes.user__personal}`}>
                    <p className={classes.label}>비밀번호</p>
                    <p>*************</p>
                  </div>
                </div>
                <div className={classes.user__bmi}>
                  <div className={`${classes.user__personal}`}>
                    <p className={classes.label}>키</p>
                    <Input
                      type='text'
                      id='height'
                      // placeholder='email'
                      initialValue={loadedUserInfo.height.value || ''}
                      initialValid={loadedUserInfo.height.isValid}
                      validator={(val) => !isNaN(val)}
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
                      initialValue={loadedUserInfo.weight.value || ''}
                      initialValid={loadedUserInfo.weight.isValid}
                      validator={(val) => !isNaN(val)}
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
    </>
  );
}
