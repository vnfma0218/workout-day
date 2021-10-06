import React, { useContext, useRef, useState } from 'react';
import classes from './Record.module.css';
import Wrapper from '../../shared/UIElement/Wrapper';
import Modal from '../../shared/UIElement/Modal';
import SearchPlace from '../../shared/UIElement/SearchPlace';
import SelectActivity from './SelectActivity';
import Button from '../../shared/UIElement/Button';
import { ModeContext } from '../../context/mode-context';
import { dbService, storage } from '../../firebase';

export default function Record() {
  const mode = useContext(ModeContext);
  const [mapOpen, setMapOpen] = useState(false);
  const [enter, setEnter] = useState(false);

  // form
  const [inputs, setInputs] = useState({
    date: '',
    hour: '',
    minutes: '',
    weight: '',
    memo: '',
    location: '',
  });
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const fileInput = useRef();
  const [totalByte, setTotalByte] = useState(0);
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');

  const oepnMapHandler = () => {
    setMapOpen(true);
    setEnter(false);
  };

  const closeMapHandler = () => {
    setMapOpen(false);
  };

  // form 저장
  const saveHandler = (e) => {
    e.preventDefault();

    const target = e.target;
    dbService
      .collection('record')
      .add({
        date: target.date.value,
        time: `${target.hour.value}시간 ${target.minutes.value}분`,
        weight: mode.isDietMode ? parseInt(target.weight.value) : 0,
        imageUrl: url,
        memo: target.memo.value,
        location: enter ? target.location.value : [place, address],
        uploadDate: new Date(),
      })
      .then((result) => {
        //입력 후 초기화
        return (
          setInputs({
            date: '',
            hour: '',
            minutes: '',
            weight: '',
            memo: '',
            location: '',
          }),
          setUrl(''),
          setFile(''),
          setPlace(''),
          setAddress('')
        );
      })
      .catch((err) => console.error(err));
  };

  // image file 저장
  const fileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFile(file);
      setUrl(url);
    }
    console.log(file.name);
    const uploadFile = storage.ref(`images/record/${file.name}`).put(file);
    uploadFile.on(
      'state_change',
      null,
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref('images/record')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

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
        <div className={classes.record__inner}>
          <SelectActivity />
          {/* Record Form */}
          <form
            id={classes.form}
            className={classes.record__form}
            onSubmit={saveHandler}
          >
            <div className={classes.form__input}>
              <label className={classes.input_title}>Date :</label>
              <input
                type='date'
                name='date'
                min='2021-01-01'
                max={new Date().toISOString().split('T')[0]}
                required
                onChange={inputHandler}
                value={inputs.date}
              />
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Time :</label>
              <input
                type='number'
                name='hour'
                min='1'
                max='24'
                onChange={inputHandler}
                value={inputs.hour}
              />
              <span> 시간</span>

              <input
                type='number'
                name='minutes'
                min='0'
                max='59'
                required
                onChange={inputHandler}
                value={inputs.minutes}
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
                    placeholder='장소를 입력하세요.'
                    onChange={inputHandler}
                    value={inputs.location}
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
                disabled={mode.isDietMode ? false : true}
                onChange={inputHandler}
                value={inputs.weight}
              />
              &nbsp;&nbsp;kg
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Image</label>
              <div
                className={classes.preview__Image}
                onClick={() => fileInput.current.click()}
              >
                {file ? (
                  <img
                    src={url}
                    alt='preview_image'
                    className={classes.preview__box__img}
                  />
                ) : (
                  <img
                    src='img/icons/add_photo.svg'
                    alt='icon'
                    className={classes.image__box__icon}
                  />
                )}
              </div>
              <div className={classes.filebox}>
                <input
                  type='file'
                  name='image'
                  required
                  onChange={fileHandler}
                  ref={fileInput}
                />
              </div>
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
                value={inputs.memo}
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
