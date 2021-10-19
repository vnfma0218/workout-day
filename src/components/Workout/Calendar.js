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
import Map from '../../shared/UIElement/Map';
import useWindowDimensions from '../../shared/hooks/useWindowDemensions';

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
  const { width } = useWindowDimensions();

  const [mapOpen, setMapOpen] = useState(false);
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
  console.log('render from calendar');
  const closeModalHandler = () => {
    setMapOpen(false);
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
        <div className={classes.workout__header}>
          <h2>{selectedDate}</h2>
        </div>
        {currentUser && (
          <>
            <h1 className={classes.norecord__message}>운동기록이 없습니다.</h1>
            <div className={classes.guide}>
              <p>등록하기 </p>
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
        <div className={classes.workout__header}>
          <h2>{selectedDate}</h2>
        </div>
        <span
          className={
            typeof selectedEvent.location === 'object'
              ? `${classes.mapIcon}`
              : `${classes.mapIcon} ${classes.noAddress}`
          }
          onClick={() => setMapOpen(true)}
        >
          <svg
            viewBox='0 0 33 46'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M16.0417 0C7.17292 0 0 7.17292 0 16.0417C0 28.0729 16.0417 45.8333 16.0417 45.8333C16.0417 45.8333 32.0833 28.0729 32.0833 16.0417C32.0833 7.17292 24.9104 0 16.0417 0ZM16.0417 21.7708C12.8792 21.7708 10.3125 19.2042 10.3125 16.0417C10.3125 12.8792 12.8792 10.3125 16.0417 10.3125C19.2042 10.3125 21.7708 12.8792 21.7708 16.0417C21.7708 19.2042 19.2042 21.7708 16.0417 21.7708Z' />
          </svg>
        </span>
        <span className={classes.workout__location}>
          {typeof selectedEvent.location === 'object'
            ? selectedEvent.location[0]
            : selectedEvent.location}
        </span>
        <div className={classes.workout__img}>
          <img src={selectedEvent.imageUrl} alt='workout' />
        </div>
        {width < 768 && (
          <div className={classes.memo__container}>
            <p className={classes.memo__title}>MEMO</p>
            <p className={classes.memo}>
              {selectedEvent.memo.split('').splice(0, 40).join('')}...
            </p>
          </div>
        )}

        <div className={classes.btn}>
          <Button name='Photos' to='/photo' className={classes.photoBtn} />
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
        title='Are you sure'
        open={mapOpen}
        onClose={closeModalHandler}
        onConfirm={closeModalHandler}
      >
        {selectedEvent && (
          <Map
            searchPlace={
              typeof selectedEvent === 'object'
                ? selectedEvent.location[1]
                : selectedEvent.location
            }
          />
        )}
      </Modal>

      <Wrapper className={classes.calendar__container} id={classes.calendar}>
        <div className={classes.inner__container}>
          <div className={classes.calendarApp} onClick={dateClickHandler}>
            {loading && <LoadingSpinner />}
            <FullCalendar
              className={classes.calendarItem}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView='dayGridMonth'
              headerToolbar={{
                left: 'title',
                right: width > 1024 ? 'today,prev,next' : 'prev,next',
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
        </div>
      </Wrapper>
    </>
  );
}
