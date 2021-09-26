import React from 'react';
import classes from './Record.module.css';
import Wrapper from '../../shared/UIElement/Wrapper';
import { useState } from 'react/cjs/react.development';
import Modal from '../../shared/UIElement/Modal';

export default function Record() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
    setOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
    setOpen(false);
  };

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <Modal
        open={modalOpen}
        title='Add your activity.'
        onClose={closeModalHandler}
        onConfirm={closeModalHandler}
        // footer={<Button onClick={closeModalHandler}>CONFIRM</Button>}
      ></Modal>
      <Wrapper className={classes.record} id={classes.record}>
        <h2>Today's Workout</h2>
        <div className={classes.record__inner}>
          <ul className={classes.record__select}>
            <div className={classes.select__header}>
              <h3>Select your Activity</h3>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                focusable='false'
                data-prefix='fas'
                data-icon='plus-circle'
                role='img'
                viewBox='0 0 512 512'
                onClick={openModalHandler}
              >
                <path
                  fill='#0f6189'
                  d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z'
                />
              </svg>
            </div>
            <li className={classes.select__item}>
              <div className={classes.select__item_content}>
                <img src='img/illustrations/bicycle.png' alt='bicycle' />
                <span>Cycling</span>
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
              </div>
            </li>
          </ul>
          {/* Record Form */}
          <form className={classes.record__form}>
            <div className={classes.form__input}>
              <label htmlFor='date' className={classes.input_title}>
                Date :
              </label>
              <input
                type='date'
                id='date'
                min='2021-01-01'
                max='2030-12-31'
                required
              />
            </div>
            <div className={classes.form__input}>
              <label htmlFor='time' className={classes.input_title}>
                Time :
              </label>

              <input type='number' id='hour' min='0' max='24' required />
              <span> 시간</span>
              <input type='number' id='minutes' min='0' max='59' required />
              <span> 분</span>
            </div>
            <div className={classes.form__input}>
              <label htmlFor='place' className={classes.input_title}>
                Place :
              </label>
              <div className={classes.place__box}>
                <img src='img/icons/location.svg' alt='location' />
              </div>
            </div>
            <div className={classes.form__input}>
              <label htmlFor='weight' className={classes.input_title}>
                Weight :
              </label>
              <input type='number' />
              &nbsp;&nbsp;kg
            </div>
            <div className={classes.form__input}>
              <p className={classes.input_title}>Image</p>
              <label htmlFor='image' className={classes.image__box}>
                <input type='file' id='image' />

                <img src='img/icons/add_photo.svg' alt='location' />
              </label>
            </div>
            <div className={classes.form__input}>
              <label htmlFor='memo' className={classes.input_title}>
                Memo
              </label>
              <textarea
                name='memo'
                id='memo'
                cols='30'
                rows='5'
                placeholder='메모도 남겨보세요!'
              ></textarea>
            </div>
            <div className={classes.form__btn}>
              <button className={classes.btn}>CANCEL</button>
              <button className={classes.btn}>SAVE</button>
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
}
