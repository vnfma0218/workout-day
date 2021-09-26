import React, { useEffect, useRef } from 'react';
import MainHeader from '../../shared/Navigation/MainHeader';
import UserInfo from '../User/UserInfo';
import Record from '../workout/Record';
import classes from './MainPage.module.css';
import Home from './Home';
export default function MainPage(props) {
  const outerDivRef = useRef();
  const DIVIDER_HEIGHT = 5;
  const changePage = (page, pageHeight) => {
    if (page === 'first') {
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else if (page === 'second') {
      outerDivRef.current.scrollTo({
        top: pageHeight + DIVIDER_HEIGHT,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      outerDivRef.current.scrollTo({
        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
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

  useEffect(() => {
    window.addEventListener('wheel', wheelHandler, { passive: false });
    return () => {
      window.removeEventListener('wheel', wheelHandler, { passive: false });
    };
  });

  const navClickHandler = (link) => {
    const pageHeight = window.innerHeight;
    console.log(link);
    if (link === 'home') {
      changePage('first', pageHeight);
    } else if (link === 'calenadar') {
      changePage('second', pageHeight);
    } else {
      changePage('last', pageHeight);
    }
  };
  return (
    <React.Fragment>
      <MainHeader navClickHandler={navClickHandler} />
      <div ref={outerDivRef} className={classes.container}>
        <Home />
        <div className={classes.divider}></div>
        <Record />
        <div className={classes.divider}></div>
        <UserInfo />
      </div>
    </React.Fragment>
  );
}
