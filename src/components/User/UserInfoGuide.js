import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { ModeContext } from '../../context/mode-context';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './UserInfo.module.css';

export default function UserInfo({ currentPage }) {
  const mode = useContext(ModeContext);
  const [user, setUser] = useState();
  const [bmi, setBMI] = useState(null);
  const { currentUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [hidden, setHidden] = useState(true);

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

  useEffect(() => {
    if (currentPage === 'userinfo') {
      setStep(0);
      setTimeout(() => {
        setHidden(false);
      }, 700);
    }
    return () => setHidden(true);
  }, [currentPage]);

  return (
    <>
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
          <div>
            <p>운동 모드는 기본적인 운동을 기록하고 확인할 수 있습니다.</p>
            <p>
              다이어트 모드는 목표 몸무게를 설정하고 식단과 몸무게를 기록할 수
              있습니다.
            </p>
          </div>
        </div>
      </Modal>
      {(currentPage === 'userinfo') & !hidden ? (
        <div className={classes.backdrop}></div>
      ) : null}
      <Wrapper className={classes.guide__container} id={classes.userInfo}>
        <div className={classes.guide__title}>
          <h1>
            현재 JW 님은
            <Button
              name={mode.isDietMode ? '다이어트 모드' : '운동 모드'}
              onClick={openModalHandler}
              className={classes.modal__btn__guide}
            />
            입니다.
          </h1>

          <p>
            ↑ 버튼을 클릭해보세요. <br />
            설정 모드를 변경할 수 있습니다.
          </p>
        </div>

        <article className={classes.userInfo}>
          <div className={classes.userImg}>
            <div className={classes.avatar}>
              <img src='img/exercise/yogaImage.jpg' alt='userAvatar' />
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
                <p>hello@nicetomeet.you</p>
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
                <p>170cm</p>
              </div>
              <div className={`${classes.user__personal}`}>
                <p className={classes.height}>몸무게</p>
                <p>70kg</p>
              </div>
              <div className={`${classes.user__personal}`}>
                <p className={classes.height}>BMI</p>
                <p>24.22(과체중)</p>
              </div>
            </div>
          </div>
          <Button name='EDIT' className={classes.edit__btn} />
        </article>
      </Wrapper>
    </>
  );
}
