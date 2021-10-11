import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Wrapper from '../../shared/UIElement/Wrapper';
import Modal from '../../shared/UIElement/Modal';
import Button from '../../shared/UIElement/Button';
import useFetchEvents from '../../shared/hooks/useFetchEvents';
import LoadingSpinner from '../../shared/UIElement/LoadingSpinner';

import './Calendar.css';
import classes from './Calendar.module.css';
import { useAuth } from '../../context/auth-context';
import { useHistory } from 'react-router';

export default function Calendar(props) {
  const {
    events,
    selectedDate,
    setStartDate,
    setEndDate,
    selectedEvent,
    setSelectedEvent,
    dateClickHandler,
    loading,
  } = useFetchEvents();
  const [modalOpen, setModalOpen] = useState(false);
  const calendarComponentRef = useRef();
  const { currentUser } = useAuth();
  const history = useHistory();

  const getCalendarData = (fetchInfo, successCallback, failureCallback) => {
    if (fetchInfo) {
      setStartDate(fetchInfo.startStr.split('T')[0]);
      setEndDate(fetchInfo.endStr.split('T')[0]);
      setSelectedEvent(
        events.filter((event) => {
          return event.date === selectedDate;
        })[0]
      );
    }
    if (events.length === 0) {
      return;
    }
    successCallback(
      events.map((event) => {
        return {
          id: event.id,
          title: `${
            !event.hour
              ? `${event.minutes}분`
              : !event.minutes
              ? `${event.hour}시간`
              : `${event.hour}시간 ${event.minutes}분`
          }`,
          start: event.date,
          end: event.date,
          display: 'background',
        };
      })
    );
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const toRecordPage = () => {
    const pageHeight = window.innerHeight;
    props.toRecordPage('last', pageHeight);
  };

  const recordEditHandler = () => {
    props.recordEditHandler({ ...selectedEvent });
  };
  let dateItem;
  if (!selectedEvent) {
    dateItem = (
      <>
        {loading && <h1>loading</h1>}
        <h2 className={classes.workout__header}>{selectedDate}</h2>
        {currentUser && (
          <>
            <h1>운동기록이 없습니다.</h1>
            <div className={classes.guide}>
              <p>운동 등록하기 </p>
              <div className={classes.downward__icon} onClick={toRecordPage}>
                <img src='img/icons/arrow.png' alt='' />
              </div>
            </div>
          </>
        )}
        {!currentUser && (
          <>
            <h1 style={{ marginTop: '20px', marginBottom: '30px' }}>
              로그인을 해주세요
            </h1>
            <p
              className={classes.loginBtn}
              onClick={() => {
                history.push('/auth');
              }}
            >
              로그인 페이지 이동
            </p>
          </>
        )}
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
          {selectedEvent.location[0]}
        </span>

        <div className={classes.workout__img}>
          <img src={selectedEvent.imageUrl} alt='workout' />
        </div>

        <div className={classes.btn}>
          <Button name='Go to PhotoBook' to='/photo' />
          <Button
            name='EDIT'
            className={classes.editBtn}
            onClick={recordEditHandler}
          />
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
            customButtons={{
              myCustomBtn: {
                text: 'year',
                click: () => {
                  let calendarApi = calendarComponentRef.current.getApi();
                  calendarApi.gotoDate('2020-01-30');
                },
              },
            }}
            headerToolbar={{
              left: 'title',
              center: 'myCustomBtn',
              right: 'today,prev,next',
            }}
            dateClick={dateClickHandler}
            ref={calendarComponentRef}
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
          {!loading && dateItem}
        </div>
      </Wrapper>
    </>
  );
}
