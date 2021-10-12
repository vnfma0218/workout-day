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
import useFetchEvents from '../../shared/hooks/useFetchEvents';

export default function Record(props) {
  const selectUpdateEvent = props.selectUpdateEvent;
  const { selectedEvent, setSelectedEvent } = useFetchEvents();

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
    activityId: '',
  });
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const fileInput = useRef();
  const [totalByte, setTotalByte] = useState(0);
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [activity, setActivity] = useState({
    name: '',
    id: '',
  });
  const [editActivity, setEditActivity] = useState({
    name: '',
    id: '',
  });

  const [err, setErr] = useState({
    time: false,
    activity: false,
  });
  const [clearActivity, setClearActivity] = useState(false);
  const [recordDocId, setRecordDocId] = useState();
  const { currentUser } = useAuth();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Edit Modal
  const openEditModalHandler = () => {
    setEditModalOpen(true);
  };

  const closeEditModalHandler = () => {
    setEditModalOpen(false);
    setInputs({ ...inputs, date: '' });
  };

  // Map Modal
  const oepnMapHandler = () => {
    setMapOpen(true);
    setEnter(false);
  };

  const closeMapHandler = () => {
    setMapOpen(false);
  };

  // Delete Record Modal
  const oepnDeleteModalHandler = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteMapHandler = () => {
    setDeleteModalOpen(false);
  };

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
      activityId,
      imageUrl,
    } = selectUpdateEvent;
    setSelectedEvent(selectUpdateEvent);
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
    setEditActivity({ name: activityName, id: activityId });
  }, [selectUpdateEvent, setSelectedEvent]);

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

    if (!activity.name && !activity.id) {
      setErr({
        time: false,
        activity: true,
      });
      return;
    }
    setOnSubmit(true);

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
          activityName: activity.name,
          activityId: activity.id,
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
          hour: `${!target.hour.value ? '' : target.hour.value}`,
          minutes: `${!target.minutes.value ? '' : target.minutes.value}`,
          weight: mode.isDietMode ? parseInt(target.weight.value) : 0,
          imageUrl: url,
          memo: target.memo.value,
          location: enter ? target.location.value : [place, address],
          uploadDate: new Date(),
          activityName: activity.name,
          activityId: activity.id,
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
    if (e.target.files.length === 0) return;
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFile(file);
      setUrl(url);
    }

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
    if (name === 'hour' || name === 'minutes') {
      setErr((prev) => {
        return { ...prev, time: null };
      });
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
    if (e.target.name === 'memo') {
      setTotalByte(value.length);
    }

    if (name === 'hour' || name === 'minute') {
      setErr({
        time: false,
        activity: false,
      });
    }

    if (name === 'date') {
      dbService
        .collection('record')
        .doc(currentUser.email)
        .collection('events')
        // .where('date', '==', value)
        .get()
        .then((docs) => {
          const savedDate = [];
          docs.forEach((doc) => {
            savedDate.push({ ...doc.data(), id: doc.id });
          });

          let sameDateRecord = savedDate.filter((el) => el.date === value)[0];
          setSelectedEvent(sameDateRecord);

          if (sameDateRecord) {
            openEditModalHandler();
          }
        });
    }
  };

  const recordEditHandler = () => {
    props.recordEditHandler({ ...selectedEvent });
    setEditModalOpen(false);
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
      setActivity({ name: '', id: '' }),
      setClearActivity((prev) => !prev),
      setErr({
        time: false,
        activity: false,
      }),
      setOnSubmit(false)
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

  const recordActivity = (activityName, activityId) => {
    if (activityName === null) {
      setActivity({ name: '', id: '' });
    } else {
      setErr(false);
      setActivity({ name: activityName, id: activityId });
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

  const recordDeleteHandler = () => {
    dbService
      .collection('record')
      .doc(currentUser.email)
      .collection('events')
      .doc(selectedEvent.id)
      .delete();
    setDeleteModalOpen(false);
    onReset();
  };

  return (
    <>
      <Modal
        open={deleteModalOpen}
        title='Already have record'
        onClose={closeDeleteMapHandler}
        onConfirm={recordDeleteHandler}
        name='DELETE'
      >
        {
          <div className={classes.modal__Delete}>
            운동기록을 삭제하시겠습니까? <br />
            삭제한 기록은 복구할 수 없습니다.
          </div>
        }
      </Modal>
      <Modal
        open={editModalOpen}
        title='Already have record'
        onClose={closeEditModalHandler}
        onConfirm={recordEditHandler}
        name='EDIT'
      >
        {
          <div className={classes.modal__date}>
            선택한 날짜에 작성한 기록이 있습니다. <br />
            수정하시겠습니까?
          </div>
        }
      </Modal>
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
            selectActivityNameId={editActivity}
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
              {err && err.time && (
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
                  required={editMode ? false : true}
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
                className={onSubmit ? classes.btn__unactive : classes.btn}
                type='submit'
                name={editMode ? 'EDIT' : 'SAVE'}
                disable={onSubmit ? true : false}
              />
            </div>
            {editMode && (
              <button
                className={classes.btn__delete}
                type='button'
                onClick={oepnDeleteModalHandler}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 0 24 24'
                  width='24px'
                  fill='#000000'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
                </svg>
              </button>
            )}
          </form>
        </div>
      </Wrapper>
    </>
  );
}
