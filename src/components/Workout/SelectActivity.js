import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
import ActivityList from './ActivityList';
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
    dbService
      .collection('activity')
      .get()
      .then((docs) => {
        let activitiList = [];
        docs.forEach((doc) => {
          activitiList.push({ ...doc.data(), id: doc.id });
        });
        console.log(activitiList);
        setActivities(activitiList);
        setLoading(true);
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
          {loading &&
            activities.map((activity) => (
              <ActivityList
                key={activity.id}
                imageUrl={activity.imageUrl}
                name={activity.name}
                from={activity.from}
                edit={edit}
              />
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
