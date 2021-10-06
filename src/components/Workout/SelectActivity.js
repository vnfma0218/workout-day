import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
// import ActivityList from './ActivityList';
import AddActivity from './AddActivity';
import classes from './SelectActivity.module.css';

export default function SelectActivity() {
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    imageUrl: '',
    from: 'user',
  });
  // console.log(inputs);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const activityRef = dbService.collection('activity').doc('jiwon');
  // const activityRef = dbService.collection('activity').doc(currentUser.uid);
  useEffect(() => {
    activityRef.onSnapshot((doc) => {
      if (doc.exists) {
        setActivities(doc.data().activityList);
        setLoading(true);
      } else {
        setLoading(false);
      }
    });
  }, []);
  console.log(activities);

  const addActivityHandler = () => {
    if (!inputs.name || !inputs.imageUrl) {
      //필수입력 알림 필요
      alert('입력하세요');
    } else {
      activityRef.get().then((doc) => {
        if (!doc.exists) {
          dbService.doc('/activity/jiwon').set({
            activityList: [inputs],
          });
          setLoading(true);
          setInputs({
            name: '',
            imageUrl: '',
            from: 'user',
          });
        } else {
          dbService
            .doc('/activity/jiwon')
            .get()
            .then((doc) => {
              let newActivityList = [];
              newActivityList = doc.data().activityList;

              newActivityList.push(inputs);
              activityRef.update({ activityList: newActivityList });
              setLoading(true);
            });
          setInputs({
            name: '',
            imageUrl: '',
            from: 'user',
          });
        }
      });
      setModalOpen(false);
    }
  };

  const activityDefault = [
    { name: 'Cycling', imageUrl: 'img/exercise/bicycle.png', from: 'admin' },
    { name: 'Swimming', imageUrl: 'img/exercise/swimming.png', from: 'admin' },
    { name: 'Yoga', imageUrl: 'img/exercise/yoga.png', from: 'admin' },
    {
      name: 'Badminton',
      imageUrl: 'img/exercise/badminton.png',
      from: 'admin',
    },
    { name: 'Running', imageUrl: 'img/exercise/jogging.png', from: 'admin' },
    { name: 'Gym', imageUrl: 'img/exercise/gym.png', from: 'admin' },
  ];

  const editHandler = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        title='Add your activity.'
        onClose={closeModalHandler}
        onConfirm={addActivityHandler}
        // footer={<Button onClick={closeModalHandler}>CONFIRM</Button>}
      >
        {<AddActivity inputs={inputs} setInputs={setInputs} />}
      </Modal>
      <ul className={classes.record__select}>
        <div className={classes.select__header}>
          <h3>Select your Activity</h3>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='30px'
            viewBox='0 0 24 24'
            width='30px'
            fill='#6499c2'
            onClick={openModalHandler}
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' />
          </svg>
        </div>
        <div className={classes.record__select__wrap}>
          {loading &&
            activities.map((add, id) => (
              <li className={classes.select__item} key={id} from={add.from}>
                <div className={classes.select__item_content}>
                  <div>
                    <img
                      src={add.imageUrl}
                      alt='activity'
                      className={classes.select__image}
                    />
                    <span>{add.name}</span>
                  </div>
                  {add.from && edit ? (
                    <input
                      type='checkbox'
                      style={{ transform: 'scale(1.5)' }}
                    />
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='30px'
                      viewBox='0 0 24 24'
                      width='30px'
                      fill='#000000'
                      className={classes.select__icon}
                    >
                      <path d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                    </svg>
                  )}
                </div>
              </li>
            ))}

          {activityDefault.map((activity) => (
            <li
              className={classes.select__item}
              key={activity.name}
              from={activity.from}
            >
              <div className={classes.select__item_content}>
                <div>
                  <img
                    src={activity.imageUrl}
                    alt='activity'
                    className={classes.select__image}
                  />
                  <span>{activity.name}</span>
                </div>
                {activity.from && edit ? (
                  <input type='checkbox' style={{ transform: 'scale(1.5)' }} />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='30px'
                    viewBox='0 0 24 24'
                    width='30px'
                    fill='#000000'
                    className={classes.select__icon}
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
                  </svg>
                )}
              </div>
            </li>
          ))}
        </div>
        <div className={classes.btn}>
          <Button
            className={edit ? classes.edit__btn : classes.unactive}
            name='DELETE'
            // onClick={deleteHandler}
          />
          <Button
            className={classes.edit__btn}
            name={edit ? 'CONFIRM' : 'EDIT'}
            onClick={editHandler}
          />
        </div>
      </ul>
    </>
  );
}
