import React from 'react';
import classes from './MainHeader.module.css';
export default function MainHeader(props) {
  const onNavLinkClick = (e) => {
    props.navClickHandler(e.target.dataset.link);
  };
  return (
    <div className={classes.header__container}>
      <header className={classes.main__header} onClick={onNavLinkClick}>
        <h1 className={classes.logo} data-link='home'>
          운동Day
        </h1>
        <ul className={classes.nav__list}>
          <li className={classes.nav__item}>
            <svg
              data-link='calenadar'
              viewBox='0 0 50 50'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M35.4167 25H25V35.4167H35.4167V25ZM33.3333 2.08337V6.25004H16.6667V2.08337H12.5V6.25004H10.4167C8.10417 6.25004 6.27083 8.12504 6.27083 10.4167L6.25 39.5834C6.25 41.875 8.10417 43.75 10.4167 43.75H39.5833C41.875 43.75 43.75 41.875 43.75 39.5834V10.4167C43.75 8.12504 41.875 6.25004 39.5833 6.25004H37.5V2.08337H33.3333ZM39.5833 39.5834H10.4167V16.6667H39.5833V39.5834Z' />
            </svg>
          </li>
          <li className={classes.nav__item}>
            <svg
              data-link='userInfo'
              viewBox='0 0 50 50'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M6.25 35.9375V43.75H14.0625L37.1042 20.7084L29.2917 12.8959L6.25 35.9375Z' />
              <path d='M43.1458 11.7292L38.2708 6.85425C37.4583 6.04175 36.1458 6.04175 35.3333 6.85425L31.5208 10.6667L39.3333 18.4792L43.1458 14.6667C43.9583 13.8542 43.9583 12.5417 43.1458 11.7292Z' />
            </svg>
          </li>
          <li className={classes.nav__item}>
            <svg
              viewBox='0 0 20 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9 4L7.6 5.4L10.2 8H0V10H10.2L7.6 12.6L9 14L14 9L9 4ZM18 16H10V18H18C19.1 18 20 17.1 20 16V2C20 0.9 19.1 0 18 0H10V2H18V16Z' />
            </svg>
          </li>
        </ul>
      </header>
    </div>
  );
}
