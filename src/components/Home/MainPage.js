import React from 'react';

import classes from './MainPage.module.css';
import Home from './Home';

export default function MainPage(props) {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Home />
        {/* {!currentUser && width > 1024 ? (
          <>
            <CalendarGuide currentPage={currentPage} />
            <div className={classes.divider}></div>
            <RecordGuide currentPage={currentPage} />
            <div className={classes.divider}></div>
            <UserInfoGuide currentPage={currentPage} />
          </>
        ) : null} */}
      </div>
    </React.Fragment>
  );
}
