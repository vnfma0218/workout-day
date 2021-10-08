import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Wrapper from '../../shared/UIElement/Wrapper';
import Modal from '../../shared/UIElement/Modal';
import { useState } from 'react';

import './Calendar.css';
import classes from './Calendar.module.css';
import Button from '../../shared/UIElement/Button';
import useFetchEvents from '../../shared/hooks/useFetchEvents';
import LoadingSpinner from '../../shared/UIElement/LoadingSpinner';

export default function Calendar() {
  const {
    events,
    selectedDate,
    setSelectedDate,
    setStartDate,
    setEndDate,
    loading,
  } = useFetchEvents();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const getCalendarData = (fetchInfo, successCallback, failureCallback) => {
    if (fetchInfo) {
      setStartDate(fetchInfo.startStr.split('T')[0]);
      setEndDate(fetchInfo.endStr.split('T')[0]);
    }
    if (events.length === 0) {
      return;
    }
    successCallback(
      events.map((event) => {
        return {
          id: event.date,
          title: event.time,
          start: event.date,
          end: event.date,
          display: 'background',
        };
      })
    );
  };
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
          <img src={selectedEvent.imageUrl} alt='workout' />
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
          {loading && <LoadingSpinner />}
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
