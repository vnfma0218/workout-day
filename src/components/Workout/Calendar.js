import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import classes from './Calendar.module.css';
import Wrapper from '../../shared/UIElement/Wrapper';
import Modal from '../../shared/UIElement/Modal';
import { useState } from 'react';
import Button from '../../shared/UIElement/Button';

const event = [
  { title: '헬스', date: '2021-10-11', display: 'background' },
  { title: '조깅', date: '2021-10-27', display: 'background' },
  { title: '사이클링', date: '2021-10-27', display: 'background' },
];

export default function Calendar(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const dateClickHandler = (arg) => {
    console.log(arg.dateStr);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={closeModalHandler}
        title='2021. 09. 28'
      />
      <Wrapper className={classes.calendar__container} id={classes.calendar}>
        <div className={classes.calendarApp} onClick={dateClickHandler}>
          <FullCalendar
            className={classes.calendarItem}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            dateClick={dateClickHandler}
            eventTextColor='black'
            events={event}
            height='100%'
          />
        </div>
        <div className={classes.dateItem}>
          <h2 className={classes.workout__header}>2021. 09. 18</h2>
          <span className={classes.mapIcon}>
            <svg
              viewBox='0 0 33 46'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M16.0417 0C7.17292 0 0 7.17292 0 16.0417C0 28.0729 16.0417 45.8333 16.0417 45.8333C16.0417 45.8333 32.0833 28.0729 32.0833 16.0417C32.0833 7.17292 24.9104 0 16.0417 0ZM16.0417 21.7708C12.8792 21.7708 10.3125 19.2042 10.3125 16.0417C10.3125 12.8792 12.8792 10.3125 16.0417 10.3125C19.2042 10.3125 21.7708 12.8792 21.7708 16.0417C21.7708 19.2042 19.2042 21.7708 16.0417 21.7708Z' />
            </svg>
          </span>
          <span className={classes.workout__location}>여의도 한강공원</span>
          <div className={classes.workout__img}>
            <img src='image/userPhoto/photo1.jpg' alt='workout' />
          </div>
          <div className={classes.btn}>
            <Button name='Go to PhotoBook' />
            <Button name='EDIT' className={classes.editBtn} />
          </div>
        </div>
      </Wrapper>
    </>
  );
}
