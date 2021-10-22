import React, { useEffect, useRef, useState } from 'react';

import classes from './MainPage.module.css';
import Home from './Home';
import { useAuth } from '../../context/auth-context';
import CalendarGuide from '../Workout/CalendarGuide';
import RecordGuide from '../Workout/RecordGuide';
import UserInfoGuide from '../User/UserInfoGuide';

export default function MainPage(props) {
  const { currentUser } = useAuth();
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState('home');
  const [width, setWidth] = useState(window.innerWidth);
  console.log(setCurrentPage);
  useEffect(() => {
    const resizeWindowHandler = () => {
      let newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener('resize', resizeWindowHandler);

    return () => window.removeEventListener('resize', resizeWindowHandler);
  }, []);

  return (
    <React.Fragment>
      <div ref={outerDivRef} className={classes.container}>
        <Home />
        {!currentUser && width > 1024 ? (
          <>
            <CalendarGuide currentPage={currentPage} />
            <div className={classes.divider}></div>
            <RecordGuide currentPage={currentPage} />
            <div className={classes.divider}></div>
            <UserInfoGuide currentPage={currentPage} />
          </>
        ) : null}
      </div>
    </React.Fragment>
  );
}
