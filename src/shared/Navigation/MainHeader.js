import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { ModeContext } from '../../context/mode-context';
import { useAuth } from '../../context/auth-context';
import Modal from '../UIElement/Modal';

import classes from './MainHeader.module.css';
export default function MainHeader(props) {
  const mode = useContext(ModeContext);
  const history = useHistory();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const onNavLinkClick = (e) => {
    const navLink = e.target.dataset.link;
    if (!navLink) return;

    if (navLink === 'auth' && !currentUser) {
      history.push('/auth');
      return;
    }

    if (navLink === 'auth' && currentUser) {
      setModalOpen(true);
      return;
    }

    if (location.pathname !== '/' && navLink === 'home') {
      history.push('/');
      return;
    }

    if (location.pathname !== '/' && navLink === 'calendar') {
      history.push({
        pathname: '/',
        state: { page: 'second' },
      });
      return;
    }

    if (location.pathname !== '/' && navLink === 'record') {
      history.push({
        pathname: '/',
        state: { page: 'last' },
      });
      return;
    }
    props.navClickHandler(navLink);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        title='LOG OUT'
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          logout();
          setModalOpen(false);
          history.push('/auth');
        }}
      >
        <p className={classes.logout__message}> You want to logout?</p>
      </Modal>
      <div className={classes.header__container}>
        <header
          className={
            mode.isDietMode ? classes.main__header__diet : classes.main__header
          }
          onClick={onNavLinkClick}
        >
          <div className='' style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink exact to='/'>
              <h1 className={classes.logo} data-link='home'>
                운동Day
              </h1>
            </NavLink>
          </div>
          <h2 className={classes.currentpage}>
            {props.currentPage === 'calendar'
              ? 'My Calendar'
              : props.currentPage === 'record'
              ? "Today's Workout"
              : null}
          </h2>

          <ul className={classes.nav__list}>
            <li
              className={
                props.currentPage === 'calendar'
                  ? `${classes.selected} ${classes.nav__item}`
                  : classes.nav__item
              }
              data-link='calendar'
            >
              <svg
                viewBox='0 0 50 50'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M35.4167 25H25V35.4167H35.4167V25ZM33.3333 2.08337V6.25004H16.6667V2.08337H12.5V6.25004H10.4167C8.10417 6.25004 6.27083 8.12504 6.27083 10.4167L6.25 39.5834C6.25 41.875 8.10417 43.75 10.4167 43.75H39.5833C41.875 43.75 43.75 41.875 43.75 39.5834V10.4167C43.75 8.12504 41.875 6.25004 39.5833 6.25004H37.5V2.08337H33.3333ZM39.5833 39.5834H10.4167V16.6667H39.5833V39.5834Z' />
              </svg>
            </li>

            <li
              className={
                props.currentPage === 'record'
                  ? `${classes.selected} ${classes.nav__item}`
                  : classes.nav__item
              }
              data-link='record'
            >
              <svg
                viewBox='0 0 50 50'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M6.25 35.9375V43.75H14.0625L37.1042 20.7084L29.2917 12.8959L6.25 35.9375Z' />
                <path d='M43.1458 11.7292L38.2708 6.85425C37.4583 6.04175 36.1458 6.04175 35.3333 6.85425L31.5208 10.6667L39.3333 18.4792L43.1458 14.6667C43.9583 13.8542 43.9583 12.5417 43.1458 11.7292Z' />
              </svg>
            </li>
            {currentUser && (
              <NavLink to='/userinfo' activeClassName={classes.selected}>
                <li className={classes.nav__item}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                    fill='#000000'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z' />
                  </svg>
                </li>
              </NavLink>
            )}

            {/* <NavLink to='/auth' activeClassName={classes.selected} > */}
            <li className={classes.nav__item} data-link='auth'>
              <svg
                data-key='auth'
                viewBox='0 0 20 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M9 4L7.6 5.4L10.2 8H0V10H10.2L7.6 12.6L9 14L14 9L9 4ZM18 16H10V18H18C19.1 18 20 17.1 20 16V2C20 0.9 19.1 0 18 0H10V2H18V16Z' />
              </svg>
            </li>
            {/* </NavLink> */}
          </ul>
        </header>
      </div>
    </>
  );
}
