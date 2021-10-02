import React, { useState } from 'react';
import AddActivity from '../../shared/UIElement/AddActivity';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
import ActivityList from './ActivityList';
import classes from './SelectActivity.module.css';

export default function SelectActivity() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const activity = [
    { imageUrl: 'img/exercise/bicycle.png', name: 'Cycling' },
    { imageUrl: 'img/exercise/badminton.png', name: 'Badminton' },
    { imageUrl: 'img/exercise/yoga.png', name: 'Yoga' },
    { imageUrl: 'img/exercise/jogging.png', name: 'Running' },
    { imageUrl: 'img/exercise/swimming.png', name: 'Swimming' },
    { imageUrl: 'img/exercise/gym.png', name: 'Gym' },
  ];

  return (
    <>
      <Modal
        open={modalOpen}
        title='Add your activity.'
        onClose={closeModalHandler}
        onConfirm={closeModalHandler}
        // footer={<Button onClick={closeModalHandler}>CONFIRM</Button>}
      >
        {<AddActivity />}
      </Modal>
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
        <div className={classes.record__select__wrap}>
          {activity.map((array) => (
            <ActivityList
              key={array.id}
              imageUrl={array.imageUrl}
              name={array.name}
            />
          ))}
        </div>
        <Button className={classes.edit__btn} name='EDIT' />
      </ul>
    </>
  );
}
