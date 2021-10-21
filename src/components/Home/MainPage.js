import React, { useCallback, useEffect, useRef, useState } from 'react';

import MainHeader from '../../shared/Navigation/MainHeader';
import classes from './MainPage.module.css';
import Home from './Home';
import Calendar from '../Workout/Calendar';
import { useLocation } from 'react-router-dom';
import Record from '../Workout/Record';
import { useAuth } from '../../context/auth-context';
import CalendarGuide from '../Workout/CalendarGuide';
import RecordGuide from '../Workout/RecordGuide';
import UserInfoGuide from '../User/UserInfoGuide';

export default function MainPage(props) {
  const { currentUser } = useAuth();

  const outerDivRef = useRef();
  const DIVIDER_HEIGHT = 5;
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectUpdateEvent, setSelectUpdateEvent] = useState();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeWindowHandler = () => {
      let newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener('resize', resizeWindowHandler);

    return () => window.removeEventListener('resize', resizeWindowHandler);
  }, []);

  const changePage = useCallback(
    (page, pageHeight) => {
      if (
        (currentUser && page === 'first') ||
        (!currentUser && page === 'first')
      ) {
        setCurrentPage('home');
        outerDivRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else if (
        (currentUser && page === 'second') ||
        (!currentUser && page === 'second')
      ) {
        setCurrentPage('calendar');

        outerDivRef.current.scrollTo({
          top: pageHeight + DIVIDER_HEIGHT,
          left: 0,
          behavior: 'smooth',
        });
      } else if (
        (currentUser && page === 'last') ||
        (!currentUser && page === 'last')
      ) {
        setCurrentPage('record');

        outerDivRef.current.scrollTo({
          top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
          left: 0,
          behavior: 'smooth',
        });
      } else if (!currentUser && page === 'end') {
        setCurrentPage('userinfo');
        outerDivRef.current.scrollTo({
          top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
          left: 0,
          behavior: 'smooth',
        });
      }
    },
    [currentUser]
  );

  useEffect(() => {
    if (width <= 1024) return;
    const wheelHandler = (e) => {
      e.preventDefault();
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const { deltaY } = e;
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          changePage('second', pageHeight);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          changePage('last', pageHeight);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          changePage('end', pageHeight);
        } else {
          // 현재 4페이지
          changePage('end', pageHeight);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          changePage('first', pageHeight);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          changePage('first', pageHeight);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          changePage('second', pageHeight);
        } else {
          // 현재 4페이지
          changePage('last', pageHeight);
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener('wheel', wheelHandler, {
      passive: false,
    });
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler, {
        passive: false,
      });
    };
  }, [changePage]);

  const pageHeight = window.innerHeight;

  useEffect(() => {
    if (location.state) {
      changePage(location.state.page, pageHeight);
    }
  }, [location.state, pageHeight, changePage]);

  const navClickHandler = (link) => {
    if (link === 'home') {
      changePage('first', pageHeight);
    } else if (link === 'calendar') {
      changePage('second', pageHeight);
    } else if (link === 'record') {
      changePage('last', pageHeight);
    }
  };

  const recordEditHandler = (selectedEvent) => {
    changePage('last', pageHeight);
    setSelectUpdateEvent(selectedEvent);
  };

  return (
    <React.Fragment>
      <MainHeader navClickHandler={navClickHandler} currentPage={currentPage} />
      <Home />
      {currentUser ? (
        <div ref={outerDivRef} className={classes.container}>
          <div className={classes.divider}></div>
          <Calendar
            toRecordPage={changePage}
            recordEditHandler={recordEditHandler}
          />
          <div className={classes.divider}></div>
          <Record
            selectUpdateEvent={selectUpdateEvent}
            recordEditHandler={recordEditHandler}
          />
        </div>
      ) : null}
      {!currentUser && width > 1024 ? (
        <div ref={outerDivRef} className={classes.container}>
          <CalendarGuide currentPage={currentPage} />
          <div className={classes.divider}></div>
          <RecordGuide currentPage={currentPage} />
          <div className={classes.divider}></div>
          <UserInfoGuide currentPage={currentPage} />
        </div>
      ) : null}

      {!currentUser && width > 1024 ? (
        <img
          src={
            currentUser
              ? 'img/icons/scroll.png'
              : !currentUser && currentPage === 'home'
              ? 'img/icons/scroll.png'
              : 'img/icons/mouseClick.png'
          }
          alt='scroll'
          className={classes.mainpage__scroll}
        />
      ) : null}
    </React.Fragment>
  );
}
