import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Wrapper from '../../shared/UIElement/Wrapper';
import Button from '../../shared/UIElement/Button';

import './Calendar.css';
import classes from './Calendar.module.css';

const SAMPLE_EVENTS = [
  {
    title: '3시간 10분',
    start: '2021-10-06',
    end: '2021-10-06',
    display: 'background',
  },
  {
    title: '30분',
    start: '2021-10-24',
    end: '2021-10-24',
    display: 'background',
  },
  {
    title: '2시간 60분',
    start: '2021-10-13',
    end: '2021-10-13',
    display: 'background',
  },
];

export default function CalendarGuide() {
  const [step, setStep] = useState(0);
  // const [hidden, setHidden] = useState(true);

  // useEffect(() => {
  //   console.log('d');
  //   setStep(0);
  //   setTimeout(() => {
  //     setHidden(false);
  //   }, 700);

  //   return () => setHidden(true);
  // }, []);

  useEffect(() => {
    window.addEventListener('click', addStepCount);
    return () => {
      window.removeEventListener('click', addStepCount);
    };
  }, []);

  const addStepCount = () =>
    setStep((prev) => {
      if (prev === 3) return 0;
      return prev + 1;
    });

  return (
    <>
      {/* {!hidden ? (
        <> */}
      <div className={classes.backdrop}></div>
      {/* <Link to='/auth'>
              <button className={classes.guide__loginBtn}>
                <svg
                  data-key='auth'
                  viewBox='0 0 20 18'
                  fill='#383838'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M9 4L7.6 5.4L10.2 8H0V10H10.2L7.6 12.6L9 14L14 9L9 4ZM18 16H10V18H18C19.1 18 20 17.1 20 16V2C20 0.9 19.1 0 18 0H10V2H18V16Z' />
                </svg>
              </button>
            </Link> */}

      {/* </>
      ) : null} */}

      <Wrapper className={classes.calendar__container} id={classes.calendar}>
        <div className={classes.guide__container}>
          {step === 0 ? (
            <div className={classes.start__message}>
              <img
                className={classes.start__img}
                src='../img/icons/calendar.png'
                alt='calendar'
              />
              <h3>
                나만의 운동기록을 모아서 <br /> 간편하게 관리해보세요.
              </h3>
            </div>
          ) : null}

          {step === 1 ? (
            <div className={classes.first__message}>
              <h3> 👩 이번달 운동시간을 날짜별로 확인할 수 있습니다.</h3>
            </div>
          ) : step === 2 ? (
            <div className={classes.second__message}>
              <h3>
                📝 날짜를 클릭하면 <br />
                해당 날짜의 운동 정보를 볼 수 있습니다
              </h3>
            </div>
          ) : step === 3 ? (
            <div className={classes.third__message}>
              <h3>
                운동사진을 한번에 <br /> 모아볼 수 있습니다
              </h3>
            </div>
          ) : null}
          <div
            className={`${classes.calendarApp} ${
              step === 1 ? classes.first : classes.calendarApp
            } `}
          >
            <FullCalendar
              className={classes.calendarItem}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView='dayGridMonth'
              defaultDate='2021-10-01'
              headerToolbar={{
                left: 'title',
                right: 'today,prev,next',
              }}
              height='100%'
              events={SAMPLE_EVENTS}
            />
          </div>
          {/* {(currentPage === 'calendar') & !hidden ? guide : null}
          {(currentPage === 'calendar') & !hidden ? backdrop : null} */}

          <div className={step === 2 ? classes.second : classes.dateItem}>
            <div className={classes.workout__header}>
              <h2>{new Date().toDateString().split('T')[0]}</h2>
            </div>
            <span className={classes.mapIcon}>
              <svg
                viewBox='0 0 33 46'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M16.0417 0C7.17292 0 0 7.17292 0 16.0417C0 28.0729 16.0417 45.8333 16.0417 45.8333C16.0417 45.8333 32.0833 28.0729 32.0833 16.0417C32.0833 7.17292 24.9104 0 16.0417 0ZM16.0417 21.7708C12.8792 21.7708 10.3125 19.2042 10.3125 16.0417C10.3125 12.8792 12.8792 10.3125 16.0417 10.3125C19.2042 10.3125 21.7708 12.8792 21.7708 16.0417C21.7708 19.2042 19.2042 21.7708 16.0417 21.7708Z' />
              </svg>
            </span>
            <span className={classes.workout__location}>한강 체육공원</span>
            <div className={classes.workout__img}>
              <img src='../img/exercise/guide/photo1.jpg' alt='workout' />
            </div>

            <div className={classes.btn}>
              <Button
                name='Photos'
                to='/auth'
                className={step === 3 ? classes.third : classes.photoBtn}
              />
              <Button name='EDIT' className={classes.editBtn} />
              {/* {step === 3 && <div className={classes.photo__border}></div>} */}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
