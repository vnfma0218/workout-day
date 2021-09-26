import React from 'react';
import classes from './Modal.module.css';
import Button from '../UIElement/Button';
import ReactDom from 'react-dom';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <form
          className={classes.form}
          // onSubmit={
          //   props.submit ? props.onSubmit : (event) => event.preventDefault
          // }
        >
          <select name='choice' className={classes.form__select}>
            <option value=''>Choose Image</option>
            <option value='one'>등산</option>
            <option value='two'>홈트</option>
            <option value='three'>기타</option>
          </select>
          <input type='text' placeholder='Enter your workout' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='30px'
            viewBox='0 0 24 24'
            width='30px'
            fill='#000000'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
          </svg>
        </form>

        {props.children}
      </div>
      <footer className={classes.actions}>
        <Button
          name='CANCEL'
          onClick={props.onClose}
          className={classes.add__btn}
        />
        <Button
          name='CONFIRM'
          onClick={props.onConfirm}
          className={classes.add__btn}
          // onSubmit={
          //   props.submit ? props.onSubmit : (event) => event.preventDefault
          // }
        />

        {/* <Button onClick={props.onConfirm}>CONFIRM</Button> */}
      </footer>
    </div>
  );
};

export default function Modal(props) {
  if (!props.open) {
    return null;
  } else {
    return (
      <>
        {ReactDom.createPortal(
          <Backdrop onConfirm={props.onClose} />,
          document.getElementById('backdrop-root')
        )}
        {ReactDom.createPortal(
          <ModalOverlay
            onConfirm={props.onClose}
            title={props.title}
            onClose={props.onClose}
          />,
          document.getElementById('modaloverlay-root')
        )}
      </>
    );
  }
}
