import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '../../shared/UIElement/Button';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './RecordGuide.module.css';

export default function RecordGuide({ currentPage }) {
  const [step, setStep] = useState(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (currentPage === 'record') {
      setStep(0);
      setTimeout(() => {
        setHidden(false);
      }, 700);
    }
    return () => setHidden(true);
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener('click', addStepCount);
    return () => {
      window.removeEventListener('click', addStepCount);
    };
  }, []);

  const addStepCount = () =>
    setStep((prev) => {
      if (prev === 2) return 0;
      return prev + 1;
    });

  const activityDefault = [
    {
      name: 'Cycling',
      imageUrl: 'img/exercise/bicycle.png',
      from: 'admin',
      id: 'adminCycling',
    },

    {
      name: 'Yoga',
      imageUrl: 'img/exercise/yoga.png',
      from: 'admin',
      id: 'adminYoga',
    },
    {
      name: 'Swimming',
      imageUrl: 'img/exercise/swimming.png',
      from: 'admin',
      id: 'adminSwimming',
    },
    {
      name: 'Badminton',
      imageUrl: 'img/exercise/badminton.png',
      from: 'admin',
      id: 'adminBadminton',
    },
    {
      name: 'Running',
      imageUrl: 'img/exercise/jogging.png',
      from: 'admin',
      id: 'adminRunning',
    },
    {
      name: 'Gym',
      imageUrl: 'img/exercise/gym.png',
      from: 'admin',
      id: 'adminGym',
    },
  ];

  const guide = (
    <>
      <div className={classes.backdrop}></div>
      {step === 0 && (
        <div className={classes.pop_1_text}>
          <img src='img/icons/diary.png' alt='diary' />
          <p>
            운동을 기록으로 남겨보며 <br /> 나만의 운동 다이어리를 채워보세요
          </p>
        </div>
      )}
      {step === 1 && (
        <div className={classes.pop_2_text}>
          <p>
            목록에서 원하는 운동을 선택하거나 <br /> 직접 만들어 추가할 수
            있습니다.
          </p>
        </div>
      )}
      {step === 2 && (
        <div className={classes.pop_3_text}>
          <p>
            운동 날짜, 시간, 장소를 입력하고 <br /> 오늘 운동을 추억할 수 있는
            사진과 간단한 메모도 남겨보세요~!
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      {(currentPage === 'record') & !hidden && guide}
      <Wrapper className={classes.record} id={classes.record}>
        <div className={classes.record__inner}>
          <ul className={step === 1 ? classes.pop_2 : classes.record__select}>
            <div className={classes.select__header}>
              <h3>Select your Activity</h3>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='30px'
                viewBox='0 0 24 24'
                width='30px'
                fill='#6499c2'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' />
              </svg>
            </div>
            <div className={classes.record__select__wrap}>
              {activityDefault.map((activity, id) => (
                <li className={classes.select__item} key={id}>
                  <div className={classes.select__item_content}>
                    <div>
                      <img
                        src={activity.imageUrl}
                        alt='activity'
                        className={classes.select__image}
                      />
                      <span>{activity.name}</span>
                    </div>

                    <svg
                      id={id}
                      xmlns='http://www.w3.org/2000/svg'
                      height='30px'
                      viewBox='0 0 24 24'
                      width='30px'
                      fill='#000000'
                      className={id === 1 ? classes.select__icon : classes.icon}
                    >
                      <path d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                    </svg>
                  </div>
                </li>
              ))}
            </div>
            <div className={classes.btn}>
              <Button className={classes.edit__btn} name='CONFIRM' />
            </div>
          </ul>
          {/* Record Form */}
          <form
            id={classes.form}
            className={step === 2 ? classes.pop_3 : classes.record__form}
          >
            <div className={classes.form__input}>
              <label className={classes.input_title}>Date :</label>

              <input type='date' name='date' defaultValue='2021-10-03' />
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Time :</label>
              <input type='number' name='hour' defaultValue='1' />
              <span> 시간</span>
              <input type='number' name='minutes' defaultValue='20' />
              <span> 분</span>
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Place :</label>
              <div className={classes.place__box}>
                <div>
                  <img src='../img/icons/location.svg' alt='location' />
                  <input
                    name='location'
                    type='text'
                    defaultValue='서울 요가스튜디오'
                  />
                </div>

                <button className={classes.enterBtn__active}>
                  <img src='../img/icons/pen.svg' alt='write' />
                </button>
              </div>
            </div>

            <div className={`${classes.form__input} ${classes.file__input}`}>
              <label className={classes.input_title}>Image</label>
              <div className={classes.preview__Image}>
                <img
                  src='../img/exercise/yogaImage.jpg'
                  alt='preview_image'
                  className={classes.preview__box__img}
                />
              </div>
              <div className={classes.filebox}>
                <input type='file' name='image' />
              </div>
            </div>
            <div className={`${classes.form__input} ${classes.memo__input}`}>
              <div className={classes.memo__box}>
                <label className={classes.input_title}>Memo</label>
                <p>
                  <span> 48 / 100</span>
                </p>
              </div>
              <textarea
                name='memo'
                cols='30'
                rows='5'
                defaultValue='퇴근 후에 피곤하지만 요가 수업을 듣고 왔다. 스트레칭하니까 피로도 풀리고 개운했다 !'
              ></textarea>
            </div>
            <div className={classes.form__btn}>
              <Button className={classes.btn} type='submit' name='SAVE' />
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
}
