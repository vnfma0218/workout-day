import React from 'react';
import classes from './Record.module.css';
import Wrapper from '../../shared/UIElement/Wrapper';
import { useState, useRef } from 'react/cjs/react.development';
import Modal from '../../shared/UIElement/Modal';
import SearchPlace from '../../shared/UIElement/SeacrchPlace';

export default function Record() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [inputs, setInputs] = useState({
    date: '',
    hour: 0,
    minutes: 0,
    weight: 0,
    memo: '',
    location: '',
  });
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  // const fileInput = useRef();
  const [totalByte, setTotalByte] = useState(0);

  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [enter, setEnter] = useState(false);
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const mapOepnHandler = () => {
    setMapOpen(true);
    setEnter(false);
  };

  const closeMapHandler = () => {
    setMapOpen(false);
  };

  // 기록 저장
  const saveHandler = (e) => {
    e.preventDefault();

    const target = e.target;
    const add = [];
    add.push({
      date: target.date.value,
      time: `${target.hour.value}시간 ${target.minutes.value}분`,
      weight: parseInt(target.weight.value),
      imageUrl: url,
      memo: target.memo.value,
      location: enter ? target.location.value : place,
    });

    console.log(add);
  };

  const fileHandler = (e) => {
    const image = e.target.files[0];
    console.log(image);

    if (image) {
      setImage(image);
      setUrl(url);
    }
  };

  const inputHandler = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
    setTotalByte(value.length);
  };

  const selectPlace = (placeName, placeAddress) => {
    setPlace(placeName);
    setAddress(placeAddress);
  };

  const enterPlaceHandler = (e) => {
    e.preventDefault();
    enter ? setEnter(false) : setEnter(true);
    setPlace('');
    setAddress('');
  };

  return (
    <>
      <Modal
        open={modalOpen}
        title='Add your activity.'
        onClose={closeModalHandler}
        onConfirm={closeModalHandler}
        // footer={<Button onClick={closeModalHandler}>CONFIRM</Button>}
      />
      <Modal
        open={mapOpen}
        title='Please enter your location'
        onClose={closeMapHandler}
        onConfirm={closeMapHandler}
      >
        {<SearchPlace selectPlace={selectPlace} />}
      </Modal>
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
          <form className={classes.record__form} onSubmit={saveHandler}>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Date :</label>
              <input
                type='date'
                name='date'
                min='2021-01-01'
                max='2030-12-31'
                required
                onChange={inputHandler}
              />
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Time :</label>
              <input
                type='number'
                name='hour'
                min='0'
                max='24'
                required
                onChange={inputHandler}
              />
              <span> 시간</span>

              <input
                type='number'
                name='minutes'
                min='0'
                max='59'
                required
                onChange={inputHandler}
              />
              <span> 분</span>
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Place :</label>
              <div className={classes.place__box}>
                <img
                  src='img/icons/location.svg'
                  alt='location'
                  onClick={mapOepnHandler}
                />
                {enter ? (
                  <input
                    name='location'
                    type='text'
                    maxLength='30'
                    placeholder='장소를 검색해보세요.'
                    onChange={inputHandler}
                  />
                ) : (
                  <span>{place}</span>
                )}

                <button
                  className={
                    enter
                      ? classes.enterBtn__active
                      : classes.enterBtn__unactive
                  }
                  onClick={enterPlaceHandler}
                >
                  직접
                  <br />
                  입력
                </button>
              </div>
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Weight :</label>
              <input
                type='number'
                name='weight'
                min='0'
                required
                onChange={inputHandler}
              />
              &nbsp;&nbsp;kg
            </div>
            <div className={`${classes.form__input} ${classes.preview__Image}`}>
              <p className={classes.input_title}>Image</p>
              <label className={classes.image__box}>
                <input
                  type='file'
                  name='image'
                  onChange={fileHandler}
                  // ref={fileInput}
                />

                <img src='img/icons/add_photo.svg' alt='add' />
                {/* {image ? (
                  <img src={url} alt='preview_image' />
                ) : (
                  <img src='img/icons/add_photo.svg' alt='photo' />
                )} */}
              </label>
            </div>
            <div className={classes.form__input}>
              <div className={classes.memo__box}>
                <label className={classes.input_title}>Memo</label>
                <p>
                  <span>{`(${totalByte} / 100)`}</span>
                </p>
              </div>
              <textarea
                name='memo'
                cols='30'
                rows='5'
                maxLength='100'
                placeholder='메모를 남겨보세요 😃'
                onChange={inputHandler}
              ></textarea>
            </div>
            <div className={classes.form__btn}>
              <button className={classes.btn}>CANCEL</button>
              <button className={classes.btn} type='submit'>
                SAVE
              </button>
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
}
