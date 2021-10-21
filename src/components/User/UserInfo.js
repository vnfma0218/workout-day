import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../context/auth-context';
import { ModeContext } from '../../context/mode-context';
import { dbService } from '../../firebase';
import useWindowDimensions from '../../shared/hooks/useWindowDemensions';
import MainHeader from '../../shared/Navigation/MainHeader';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './UserInfo.module.css';

export default function UserInfo() {
  const mode = useContext(ModeContext);
  const [user, setUser] = useState();
  const [bmi, setBMI] = useState(null);
  const { currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const { width } = useWindowDimensions();
  useEffect(() => {
    dbService
      .collection('users')
      .doc(currentUser.email)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data());
        setUser(snapshot.data());
        if (snapshot.data().weight && snapshot.data().height) {
          console.log(snapshot.data());
          const { bmi, result } = getBMI(
            snapshot.data().weight,
            snapshot.data().height
          );
          setBMI({ bmi, result });
        }
      });
  }, [currentUser]);
  console.log(user);

  const openModalHandler = () => {
    setModalOpen(true);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const changeModelHandler = () => {
    setModalOpen(false);
    mode.isDietMode ? mode.onNormalMode() : mode.onDietMode();
  };

  const getBMI = (weight, height) => {
    let bmi = (weight / (((height / 100) * height) / 100)).toFixed(2);
    let result;
    if (isNaN(bmi)) {
      result = '키와 몸무게를 입력해주세요';
      bmi = 0;
      return { bmi, result };
    }
    if (bmi <= 18.5) {
      result = '저체중';
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      result = '정상';
    } else if (bmi >= 23.0 && bmi <= 24.9) {
      result = '과체중';
    } else {
      result = '비만';
    }
    return { bmi, result };
  };
  return (
    <>
      <MainHeader pageName='My Page' />
      <Modal
        title='Change Your Mode'
        open={modalOpen}
        onClose={closeModalHandler}
        onConfirm={changeModelHandler}
        name='CHANGE'
      >
        <div className={classes.modal__content}>
          <h3>
            <strong>{mode.isDietMode ? '운동' : '다이어트'} 모드</strong>로
            변경하시겠습니까?
          </h3>

          <p>운동 모드는 기본적인 운동을 기록하고 확인할 수 있습니다.</p>
          <p>
            다이어트 모드는 목표 몸무게를 설정하고 식단과 몸무게를 기록할 수
            있습니다.
          </p>
        </div>
      </Modal>
      {user && (
        <Wrapper className={classes.userInfo__container} id={classes.userInfo}>
          <h1>
            현재 {user.nickname} 님은
            <Button
              name={mode.isDietMode ? '다이어트 모드' : '운동 모드'}
              onClick={openModalHandler}
              className={classes.modal__btn}
            />
            입니다.
          </h1>
          <article className={classes.userInfo}>
            <div className={classes.userImg}>
              <div className={classes.avatar}>
                <img src={user.imageUrl} alt='userAvatar' />
              </div>
            </div>
            <div className={classes.user__detail}>
              <div className={classes.user__info}>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.nickname}>닉네임</p>
                  <p>{user.nickname}</p>
                </div>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.email}>이메일</p>
                  <p className={classes.emailValue}>{currentUser.email}</p>
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
                  <p>{user.height}</p>
                </div>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.height}>몸무게</p>
                  <p>{user.weight}</p>
                </div>
                <div className={`${classes.user__personal}`}>
                  <p className={classes.height}>BMI</p>
                  <p>
                    {bmi && `${bmi.bmi} (${bmi.result})`}
                    {!bmi && '키와 몸무게를 입력해주세요'}
                  </p>
                </div>
              </div>
            </div>
            {width < 768 && (
              <Button
                className={classes.chartBtn}
                name={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                    fill='#000000'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z' />
                  </svg>
                }
                to='/chart'
              />
            )}
            {width > 768 && (
              <Button
                className={classes.chartBtn}
                name={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                    fill='#000000'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z' />
                  </svg>
                }
                to='/chart'
              />
            )}
            <Button
              to='/userinfo/edit'
              name='수정'
              className={classes.edit__btn}
            />
          </article>
        </Wrapper>
      )}
    </>
  );
}
