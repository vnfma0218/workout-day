import React, { useEffect, useRef, useState } from 'react';
import Home from '../../components/Home/Home';
import Record from '../../components/Workout/Record';
import UserInfo from '../../components/User/UserInfo';
import classes from './MainPage.module.css';
import MainHeader from '../Navigation/MainHeader';

export default function MainPage(props) {
  const containerRef = useRef();
  const DIVIDER_HEIGHT = 5;

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      // 스크롤 행동 구현

      const { deltaY } = e;

      // 스크롤 위쪽 끝부분 위치
      const { scrollTop } = containerRef.current;
      console.log(containerRef);
      console.log('scrollTop', scrollTop);
      // 화면 세로길이. 100vh와 같음.
      const pageHeight = window.innerHeight;
      console.log('pageHeight', pageHeight);

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log('현재 1페이지, down');
          containerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, down');
          containerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, down');
          containerRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log('현재 1페이지, up');
          containerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log('현재 2페이지, up');
          containerRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          // 현재 3페이지
          console.log('현재 3페이지, up');
          containerRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    };

    const containerRefCurrent = containerRef.current;
    containerRefCurrent.addEventListener('wheel', wheelHandler, {
      passive: false,
    });
    return () => {
      containerRefCurrent.removeEventListener('wheel', wheelHandler, {
        passive: false,
      });
    };
  }, []);

  return (
    <div className={classes.container} ref={containerRef}>
      <MainHeader />
      <Home />
      <div className={classes.divider}></div>
      <Record />
      <div className={classes.divider}></div>

      <UserInfo />
    </div>
  );
}
