import React, { useContext } from 'react';
import classes from './Record.module.css';
import Wrapper from '../../shared/UIElement/Wrapper';
import { useState, useRef } from 'react/cjs/react.development';
import Modal from '../../shared/UIElement/Modal';
import SearchPlace from '../../shared/UIElement/SeacrchPlace';
import SelectActivity from './SelectActivity';
import Button from '../../shared/UIElement/Button';
import { ModeContext } from '../../context/mode-context';

export default function Record() {
  const mode = useContext(ModeContext);

  const [mapOpen, setMapOpen] = useState(false);
  const [inputs, setInputs] = useState({
    date: '',
    hour: 0,
    minutes: 0,
    weight: 0,
    memo: '',
    location: '',
  });
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const fileInput = useRef();

  const [totalByte, setTotalByte] = useState(0);
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [enter, setEnter] = useState(false);

  const oepnMapHandler = () => {
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
      location: enter ? target.location.value : [place, address],
    });

    console.log(add);
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result);
      setUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // console.log(url);

    if (file) {
      setFile(file);
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
          <SelectActivity />
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
                  onClick={oepnMapHandler}
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
                  <img src='img/icons/pen.svg' alt='write' />
                </button>
              </div>
            </div>
            <div
              className={
                mode.isDietMode ? classes.form__input : classes.unactive
              }
            >
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
                  ref={fileInput}
                  required
                />

                {file ? (
                  <img
                    src={url}
                    alt='preview_image'
                    className={classes.preview__box__preview}
                  />
                ) : (
                  <img
                    src='img/icons/add_photo.svg'
                    alt='icon'
                    className={classes.image__box__icon}
                  />
                )}
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
              <Button className={classes.btn} name='CANCEL' />
              <Button className={classes.btn} type='submit' name='SAVE' />

              {/* <button className={classes.btn}>CANCEL</button>
              <button className={classes.btn} type='submit'>
                SAVE
              </button> */}
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
}
