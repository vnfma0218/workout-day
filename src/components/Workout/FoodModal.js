import React, { useRef, useState } from 'react';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
import classes from './Record.module.css';
import { dbService, storage } from '../../firebase';
import { useAuth } from '../../context/auth-context';

export default function FoodModal() {
  const [dietModalOpen, setDietModalOpen] = useState(false);
  const [totalByte, setTotalByte] = useState(0);
  const { currentUser } = useAuth();
  const [onSubmit, setOnSubmit] = useState(false);

  const [inputs, setInputs] = useState({
    date: '',
    time: '',
    memo: '',
  });
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const fileInput = useRef();

  // Add food photo
  const oepnDietModalHandler = () => {
    setDietModalOpen(true);
  };

  const closeDietModalHandler = () => {
    setDietModalOpen(false);
  };
  console.log(inputs);
  // Form Save
  const saveHandler = (e) => {
    e.preventDefault();
    const target = e.target;

    console.log(target);
    setOnSubmit(true);

    dbService
      .collection('record')
      .doc(currentUser.email)
      .collection('diet')
      .add({
        date: inputs.date,
        time: inputs.time,
        imageUrl: url,
        memo: inputs.memo,
      })
      .then((result) => {
        onReset();
      })
      .catch((err) => console.error(err));
  };

  const filehandler = (e) => {
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
    const uploadFile = storage.ref(`images/diet/${file.name}`).put(file);
    uploadFile.on(
      'state_change',
      null,
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref('images/diet')
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
        time: '',
        memo: '',
      }),
      setUrl(''),
      setFile(''),
      setOnSubmit(false)
    );
  };

  const modalContent = (
    <form className={classes.form__food} onSubmit={saveHandler}>
      <div className={classes.food__input}>
        <label className={classes.input_title}>Date</label>

        <input
          type='date'
          name='date'
          min='2021-01-01'
          max={new Date().toISOString().split('T')[0]}
          required
          value={inputs.date}
          onChange={inputHandler}
        />
      </div>
      <div className={classes.food__input}>
        <label className={classes.input_title}>Time</label>
        <input
          type='time'
          name='time'
          min='1'
          max='24'
          onChange={inputHandler}
          value={inputs.time}
        />
      </div>
      <div className={`${classes.food__input} ${classes.file__input}`}>
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
            onChange={filehandler}
            required
            ref={fileInput}
          />
        </div>
      </div>
      <div className={`${classes.food__input} ${classes.memo__input}`}>
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
          value={inputs.memo}
          onChange={inputHandler}
        ></textarea>
      </div>
    </form>
  );

  return (
    <>
      <Button
        className={classes.btn__food}
        type='button'
        name={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='utensils'
            class='svg-inline--fa fa-utensils fa-w-13'
            role='img'
            viewBox='0 0 416 512'
          >
            <path
              fill='currentColor'
              d='M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z'
            />
          </svg>
        }
        onClick={oepnDietModalHandler}
      />
      <Modal
        open={dietModalOpen}
        title='Record Your Diet'
        onClose={closeDietModalHandler}
        onConfirm={saveHandler}
        name='ADD'
        type='submit'
        disable={onSubmit ? true : false}
      >
        {modalContent}
      </Modal>
    </>
  );
}
