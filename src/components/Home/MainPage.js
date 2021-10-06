import React, { useEffect, useRef, useState } from 'react';

import MainHeader from '../../shared/Navigation/MainHeader';
import classes from './MainPage.module.css';
import Home from './Home';
import Calendar from '../Workout/Calendar';
import { useLocation } from 'react-router-dom';
import Record from '../Workout/Record';
import { useAuth } from '../../context/auth-context';

export default function MainPage(props) {
  const outerDivRef = useRef();
  const DIVIDER_HEIGHT = 5;
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('/');
  const { currentUser } = useAuth();
  console.log(currentUser);
  const changePage = (page, pageHeight) => {
    if (page === 'first') {
      setCurrentPage('home');
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else if (page === 'second') {
      setCurrentPage('calendar');

      outerDivRef.current.scrollTo({
        top: pageHeight + DIVIDER_HEIGHT,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      setCurrentPage('record');

      outerDivRef.current.scrollTo({
        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
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
        } else {
          // 현재 3페이지
          changePage('last', pageHeight);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          changePage('first', pageHeight);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          changePage('first', pageHeight);
        } else {
          // 현재 3페이지
          changePage('second', pageHeight);
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
  }, []);

  const pageHeight = window.innerHeight;

  useEffect(() => {
    if (location.state) {
      changePage(location.state.page, pageHeight);
    }
  }, [location.state, pageHeight]);

  const navClickHandler = (link) => {
    if (link === 'home') {
      changePage('first', pageHeight);
    } else if (link === 'calendar') {
      changePage('second', pageHeight);
    } else if (link === 'record') {
      changePage('last', pageHeight);
    }
  };

  return (
    <React.Fragment>
      <MainHeader navClickHandler={navClickHandler} currentPage={currentPage} />
      <div ref={outerDivRef} className={classes.container}>
        <Home />

        <div className={classes.divider}></div>
        <Calendar />
        <div className={classes.divider}></div>
        <Record />
      </div>
      <img
        src='img/icons/scroll.png'
        alt='scroll'
        className={classes.mainpage__scroll}
      />
    </React.Fragment>
  );
}
