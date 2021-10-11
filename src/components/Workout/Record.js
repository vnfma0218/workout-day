import React, { useContext, useEffect, useRef, useState } from 'react';
import Wrapper from '../../shared/UIElement/Wrapper';
import Modal from '../../shared/UIElement/Modal';
import SearchPlace from '../../shared/UIElement/SearchPlace';
import SelectActivity from './SelectActivity';
import Button from '../../shared/UIElement/Button';
import { ModeContext } from '../../context/mode-context';
import { dbService, storage } from '../../firebase';
import classes from './Record.module.css';
import { useAuth } from '../../context/auth-context';
export default function Record({ selectUpdateEvent }) {
  const mode = useContext(ModeContext);
  const [mapOpen, setMapOpen] = useState(false);
  const [enter, setEnter] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // form
  const [inputs, setInputs] = useState({
    date: '',
    hour: '',
    minutes: '',
    weight: '',
    memo: '',
    location: '',
    activityName: '',
  });
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const fileInput = useRef();
  const [totalByte, setTotalByte] = useState(0);
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [activity, setActivity] = useState('');
  // const [err, setErr] = useState(false);
  const [err, setErr] = useState({
    time: false,
    activity: false,
  });
  const [clearActivity, setClearActivity] = useState(false);
  const [recordDocId, setRecordDocId] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!selectUpdateEvent) return;
    setEditMode(true);
    setRecordDocId(selectUpdateEvent.id);
    const {
      date,
      hour,
      minutes,
      weight,
      memo,
      location,
      activityName,
      imageUrl,
    } = selectUpdateEvent;
    setInputs({
      date,
      hour,
      minutes,
      weight,
      memo,
      location: typeof location === 'object' ? location[0] : location,
      activityName,
    });
    setFile(imageUrl);
    setUrl(imageUrl);
  }, [selectUpdateEvent]);

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

    if (!target.hour.value && !target.minutes.value) {
      setErr({
        time: true,
        activity: false,
      });
      return;
    }

    if (!activity) {
      setErr({
        time: false,
        activity: true,
      });
      return;
    }

    if (!editMode) {
      dbService
        .collection('record')
        .doc(currentUser.email)
        .collection('events')
        .add({
          date: target.date.value,
          hour: `${!target.hour.value ? '' : target.hour.value}`,
          minutes: `${!target.minutes.value ? '' : target.minutes.value}`,
          weight: mode.isDietMode ? parseInt(target.weight.value) : 0,
          imageUrl: url,
          memo: target.memo.value,
          location: enter ? target.location.value : [place, address],
          uploadDate: new Date(),
          workout: activity,
        })
        .then((result) => {
          //입력 후 초기화
          onReset();
        })
        .catch((err) => console.error(err));
    } else {
      dbService
        .collection('record')
        .doc(currentUser.email)
        .collection('events')
        .doc(recordDocId)
        .set({
          date: target.date.value,
          hour: `${!target.hour.value ? '' : `${target.hour.value}시간`}`,
          minutes: `${
            !target.minutes.value ? '' : `${target.minutes.value}분`
          }`,
          weight: mode.isDietMode ? parseInt(target.weight.value) : 0,
          imageUrl: url,
          memo: target.memo.value,
          location: enter ? target.location.value : [place, address],
          uploadDate: new Date(),
          workout: activity,
        })
        .then((result) => {
          onReset();
        })
        .catch((err) => console.error(err));
      setEditMode(false);
      // console.log(updatedEvent);
    }
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
    if (e.target.name === 'memo') {
      setTotalByte(value.length);
    }
  };

  const onReset = () => {
    return (
      setInputs({
        date: '',
        hour: '',
        minutes: '',
        weight: '',
        memo: '',
        location: '',
        activityName: '',
      }),
      setUrl(''),
      setFile(''),
      setPlace(''),
      setAddress(''),
      setActivity(''),
      setClearActivity((prev) => !prev)
    );
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

  const recordActivity = (activityName) => {
    if (activityName === null) {
      setActivity(activityName);
    } else {
      setErr(false);
      setActivity(activityName);
    }
  };

  const cancelHandler = () => {
    if (editMode) {
      setEditMode(false);
      onReset();
    } else {
      return null;
    }
  };

  return (
    <>
      <Modal
        open={mapOpen}
        title='Please enter your location'
        onClose={closeMapHandler}
        onConfirm={closeMapHandler}
      >
        <SearchPlace selectPlace={selectPlace} />
      </Modal>
      <Wrapper className={classes.record} id={classes.record}>
        <div className={classes.record__inner}>
          <SelectActivity
            recordActivity={recordActivity}
            err={err}
            clearActivity={clearActivity}
          />
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
                min='1'
                max='59'
                onChange={inputHandler}
                value={inputs.minutes}
              />
              <span> 분</span>
              {err.time && (
                <div className={classes.err__box}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24px'
                    viewBox='0 0 24 24'
                    width='24px'
                    fill='#000000'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' />
                  </svg>
                  <p>운동 시간을 입력해주세요.</p>
                </div>
              )}
            </div>
            <div className={classes.form__input}>
              <label className={classes.input_title}>Place :</label>
              <div className={classes.place__box}>
                <div>
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
                    <span className={classes.location__result}>{place}</span>
                  )}
                </div>

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
            {mode.isDietMode && (
              <div className={classes.form__input}>
                <label className={classes.input_title}>Weight :</label>
                <input
                  type='number'
                  name='weight'
                  min='0'
                  required
                  // disabled={mode.isDietMode ? false : true}
                  onChange={inputHandler}
                  value={inputs.weight}
                />
                &nbsp;&nbsp;kg
              </div>
            )}

            <div className={`${classes.form__input} ${classes.file__input}`}>
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
            <div className={`${classes.form__input} ${classes.memo__input}`}>
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
              {editMode && (
                <Button
                  className={classes.btn}
                  name='CANCEL'
                  onClick={cancelHandler}
                />
              )}

              <Button
                className={classes.btn}
                type='submit'
                name={editMode ? 'EDIT' : 'SAVE'}
              />
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  );
}
