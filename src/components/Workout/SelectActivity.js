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
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState();

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // dbService
    //   .collection('activity')
    //   .get()
    //   .then((docs) => {
    //     console.log(docs);
    //     let activitiList = [];
    //     docs.forEach((doc) => {
    //       activitiList.push({ ...doc.data(), id: doc.id });
    //     });
    //     setActivities(activitiList);
    //     setLoading(true);
    //   });
    dbService
      .doc('/activity/iDowLboCGD6mfAnoIvOJ') //userId로 바꾸기
      .get()
      .then((docs) => {
        console.log(docs.data());
        let list = docs.data().activityList;
        // let activitiList = [];
        // list.forEach((doc) => {
        //   activitiList.push({ ...doc.data(), id: doc.id });
        // });
        setActivities(list);
        setLoading(true);
        // console.log(activitiList);
      });
  }, []);

  const editHandler = () => {
    edit ? setEdit(false) : setEdit(true);
  };

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
          {/* {loading &&
            activities.map((activity) => (
              <ActivityList
                key={activity.id}
                imageUrl={activity.imageUrl}
                name={activity.name}
                from={activity.from}
                edit={edit}
              />
            ))} */}
          {loading &&
            activities.map((activity) => (
              <li
                className={classes.select__item}
                key={activity.id}
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
                  {activity.from === 'user' && activity.edit ? (
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
