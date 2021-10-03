import React, { useContext } from 'react';
import classes from './Modal.module.css';
import Button from '../UIElement/Button';
import ReactDom from 'react-dom';
import { ModeContext } from '../../context/mode-context';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  const mode = useContext(ModeContext);
  return (
    <div
      className={mode.isDietMode ? classes.modal__diet : classes.modal__normal}
    >
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <main className={classes.content}>{props.children}</main>
      <footer className={classes.actions}>
        <Button
          name='CANCEL'
          onClick={props.onClose}
          className={classes.add__btn}
        />
        <Button
          name={props.name ? props.name : 'CONFIRM'}
          className={classes.add__btn}
          onClick={props.onConfirm}
        />

        {/* <Button onClick={props.onConfirm}>CONFIRM</Button> */}
      </footer>
    </div>
  );
};

export default function Modal(props) {
  const mode = useContext(ModeContext);
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
            title={props.title}
            onClose={props.onClose}
            children={props.children}
            onConfirm={props.onConfirm}
            name={props.name}
            mode={mode}
          />,
          document.getElementById('modaloverlay-root')
        )}
      </>
    );
  }
}
