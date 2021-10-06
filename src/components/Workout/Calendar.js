import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Wrapper from '../../shared/UIElement/Wrapper';
import Modal from '../../shared/UIElement/Modal';
import { useEffect, useState } from 'react';

import './Calendar.css';
import classes from './Calendar.module.css';
import Button from '../../shared/UIElement/Button';
const event = [
  {
    title: '등산',
    date: '2021-09-30',
    location: '한강공원',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmMniUplL6ws5rYq2aL_5gmxs84lok4556mg&usqp=CAU',
    display: 'background',
  },
  {
    title: '헬스',
    date: '2021-09-26',
    location: '인왕산',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8mtwsKwDy-6pphY-1hBvDuN7zV-xawOJA&usqp=CAU',
    display: 'background',
  },
  {
    title: '등산',
    date: '2021-10-05',
    location: '한강공원',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmMniUplL6ws5rYq2aL_5gmxs84lok4556mg&usqp=CAU',
    display: 'background',
  },
  {
    title: '헬스',
    date: '2021-10-11',
    location: '인왕산',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8mtwsKwDy-6pphY-1hBvDuN7zV-xawOJA&usqp=CAU',
    display: 'background',
  },
  {
    title: '조깅',
    date: '2021-10-28',
    location: '태릉 아이스스케이팅장',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8mtwsKwDy-6pphY-1hBvDuN7zV-xawOJA&usqp=CAU',
    display: 'background',
  },
  {
    title: '사이클링',
    date: '2021-10-27',
    location: '우리동네 헬스장',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8mtwsKwDy-6pphY-1hBvDuN7zV-xawOJA&usqp=CAU',
    display: 'background',
  },
  {
    title: '헬스',
    date: '2021-11-11',
    location: '인왕산',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8mtwsKwDy-6pphY-1hBvDuN7zV-xawOJA&usqp=CAU',
    display: 'background',
  },
  {
    title: '조깅',
    date: '2021-11-28',
    location: '태릉 아이스스케이팅장',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8mtwsKwDy-6pphY-1hBvDuN7zV-xawOJA&usqp=CAU',
    display: 'background',
  },
  {
    title: '사이클링',
    date: '2021-11-27',
    location: '우리동네 헬스장',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCe8mtwsKwDy-6pphY-1hBvDuN7zV-xawOJA&usqp=CAU',
    display: 'background',
  },
];

export default function Calendar(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const today = new Date();
    setTimeout(() => {
      setEvents(event);
    }, 2000);
    setSelectedEvent(
      events.filter(
        (event) => event.date === today.toISOString().split('T')[0]
      )[0]
    );
    setSelectedDate(today.toISOString().split('T')[0]);
  }, [events]);

  const dateClickHandler = (arg) => {
    if (!arg.dateStr) return;
    const clickedEvent = events.filter(
      (event) => event.date === arg.dateStr
    )[0];
    setSelectedEvent(clickedEvent);
    setSelectedDate(arg.dateStr);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const getCalendarData = (fetchInfo, successCallback, failureCallback) => {
    // let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    if (fetchInfo) {
      // year = new Date(fetchInfo.start).getFullYear();
      month = new Date(fetchInfo.start).getMonth() + 1;
    }
    // const response = await api.get(API, { year, month });
    const data = events.filter((event) => {
      return (
        +event.date.split('-')[1] === month + 1 ||
        +event.date.split('-')[1] === month + 2
      );
    });

    // console.log(data);
    successCallback(
      data.map((event) => {
        return {
          id: event.date,
          title: event.title,
          start: event.date,
          end: event.date,
          display: 'background',
        };
      })
    );
  };

  let dateItem;
  if (!selectedEvent) {
    dateItem = (
      <>
        <h2 className={classes.workout__header}>{selectedDate}</h2>
        <h1>운동기록이 없습니다.</h1>
      </>
    );
  } else {
    dateItem = (
      <>
        <h2 className={classes.workout__header}>{selectedDate}</h2>
        <span className={classes.mapIcon}>
          <svg
            viewBox='0 0 33 46'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M16.0417 0C7.17292 0 0 7.17292 0 16.0417C0 28.0729 16.0417 45.8333 16.0417 45.8333C16.0417 45.8333 32.0833 28.0729 32.0833 16.0417C32.0833 7.17292 24.9104 0 16.0417 0ZM16.0417 21.7708C12.8792 21.7708 10.3125 19.2042 10.3125 16.0417C10.3125 12.8792 12.8792 10.3125 16.0417 10.3125C19.2042 10.3125 21.7708 12.8792 21.7708 16.0417C21.7708 19.2042 19.2042 21.7708 16.0417 21.7708Z' />
          </svg>
        </span>
        <span className={classes.workout__location}>
          {selectedEvent.location}
        </span>
        <div className={classes.workout__img}>
          <img src={selectedEvent.image} alt='workout' />
        </div>
        <div className={classes.btn}>
          <Button name='Go to PhotoBook' to='/photo' />
          <Button name='EDIT' className={classes.editBtn} />
        </div>
      </>
    );
  }
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
            events={(fetchInfo, successCallback, failureCallback) =>
              getCalendarData(fetchInfo, successCallback, failureCallback)
            }
            height='100%'
          />
        </div>

        <div
          className={[
            classes.dateItem,
            !selectedEvent ? classes.noEvent : [],
          ].join(' ')}
        >
          {dateItem}
        </div>
      </Wrapper>
    </>
  );
}
