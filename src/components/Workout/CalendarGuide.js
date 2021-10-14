import { useEffect, useRef, useState } from 'react';
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

export default function CalendarGuide({ currentPage }) {
  const [step, setStep] = useState(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (currentPage === 'calendar') {
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
      if (prev === 3) return 0;
      return prev + 1;
    });
  let dateItem;

  dateItem = (
    <>
      <div className={classes.workout__header}>
        <h2>{new Date().toDateString().split('T')[0]}</h2>
      </div>
      <span className={classes.mapIcon}>
        <svg viewBox='0 0 33 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M16.0417 0C7.17292 0 0 7.17292 0 16.0417C0 28.0729 16.0417 45.8333 16.0417 45.8333C16.0417 45.8333 32.0833 28.0729 32.0833 16.0417C32.0833 7.17292 24.9104 0 16.0417 0ZM16.0417 21.7708C12.8792 21.7708 10.3125 19.2042 10.3125 16.0417C10.3125 12.8792 12.8792 10.3125 16.0417 10.3125C19.2042 10.3125 21.7708 12.8792 21.7708 16.0417C21.7708 19.2042 19.2042 21.7708 16.0417 21.7708Z' />
        </svg>
      </span>
      <span className={classes.workout__location}></span>
      <div className={classes.workout__img}>
        <img src='img/exercise/guide/photo1.jpg' alt='workout' />
      </div>

      <div className={classes.btn}>
        <Button
          name='Photos'
          to='/photo'
          className={step === 3 ? classes.guidebtn : classes.photoBtn}
        />
        <Button name='EDIT' className={classes.editBtn} />
        {/* {step === 3 && <div className={classes.photo__border}></div>} */}
      </div>
    </>
  );

  const guide = (
    <div className={classes.guide__container}>
      <div
        className={`${classes.guide__message} ${
          step === 0
            ? classes.start__message
            : step === 1
            ? classes.first__message
            : step === 2
            ? classes.second__message
            : classes.third__message
        }`}
      >
        {step === 0 && (
          <div className={classes.start__message}>
            <img
              className={classes.start__img}
              src='img/icons/calendar.png'
              alt='calendar'
            />
            <h3>
              나만의 운동기록을 모아서 <br /> 간편하게 관리해보세요.
            </h3>
          </div>
        )}
        {step === 1 && (
          <h3> 👩 이번달 운동시간을 날짜별로 확인할 수 있습니다.</h3>
        )}
        {step === 2 && (
          <h3>
            {' '}
            📝 날짜를 클릭하면 <br />
            해당 날짜의 운동 정보를 볼 수 있습니다
          </h3>
        )}
        {step === 3 && (
          <div>
            <h3>
              {' '}
              🏄‍♂️ 운동사진을 한번에 <br /> 모아볼 수 있습니다
            </h3>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <>
      <Wrapper className={classes.calendar__container} id={classes.calendar}>
        <div
          className={`${classes.calendarApp} ${
            step === 1 ? classes.first : null
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
        {(currentPage === 'calendar') & !hidden ? guide : null}
        <div
          className={`${classes.dateItem} ${
            step === 2 ? classes.second : step === 3 && classes.third
          }`}
        >
          {dateItem}
        </div>
      </Wrapper>
    </>
  );
}
