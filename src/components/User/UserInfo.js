import React, { useContext, useState } from 'react';
import { ModeContext } from '../../context/mode-context';
import MainHeader from '../../shared/Navigation/MainHeader';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './UserInfo.module.css';
export default function UserInfo() {
  const mode = useContext(ModeContext);

  const [modalOpen, setModalOpen] = useState(false);
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

  return (
    <>
      <MainHeader />
      <Modal
        title='Change Your Mode'
        open={modalOpen}
        onClose={closeModalHandler}
        onConfirm={changeModelHandler}
        name='CHANGE'
      >
        {
          <div className={classes.modal__content}>
            <h3>
              <strong>{mode.isDietMode ? '운동' : '다이어트'} 모드</strong>로
              변경하시겠습니까?
            </h3>
            <div>
              <p>운동 모드는 기본적인 운동을 기록하고 확인할 수 있습니다.</p>
              <p>
                다이어트 모드는 목표 몸무게를 설정하고 식단과 몸무게를 기록할 수
                있습니다.
              </p>
            </div>
          </div>
        }
      </Modal>
      <Wrapper className={classes.userInfo__container} id={classes.userInfo}>
        <h1>
          현재 JW 님은
          <Button
            name={mode.isDietMode ? '다이어트 모드' : '운동 모드'}
            onClick={openModalHandler}
            className={classes.modal__btn}
          />
          입니다.
        </h1>
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
          <Button
            to='/userinfo/edit'
            name='EDIT'
            className={classes.edit__btn}
          />
        </article>
      </Wrapper>
    </>
  );
}
