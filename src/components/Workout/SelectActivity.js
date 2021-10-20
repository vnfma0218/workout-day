import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import Button from '../../shared/UIElement/Button';
import Modal from '../../shared/UIElement/Modal';
import AddActivity from './AddActivity';
import classes from './SelectActivity.module.css';

export default function SelectActivity({
  err,
  recordActivity,
  clearActivity,
  selectActivityNameId,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    imageUrl: '',
    from: 'user',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const { currentUser } = useAuth();

  const openModalHandler = () => {
    setModalOpen(true);
    setError(false);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
    setError(false);
  };

  useEffect(() => {
    const activityDefault = [
      {
        name: 'Cycling',
        imageUrl: 'img/exercise/bicycle.png',
        from: 'admin',
        id: 'adminCycling',
      },
      {
        name: 'Swimming',
        imageUrl: 'img/exercise/swimming.png',
        from: 'admin',
        id: 'adminSwimming',
      },
      {
        name: 'Yoga',
        imageUrl: 'img/exercise/yoga.png',
        from: 'admin',
        id: 'adminYoga',
      },
      {
        name: 'Badminton',
        imageUrl: 'img/exercise/badminton.png',
        from: 'admin',
        id: 'adminBadminton',
      },
      {
        name: 'Running',
        imageUrl: 'img/exercise/jogging.png',
        from: 'admin',
        id: 'adminRunning',
      },
      {
        name: 'Gym',
        imageUrl: 'img/exercise/gym.png',
        from: 'admin',
        id: 'adminGym',
      },
    ];
    if (currentUser) {
      const activityRef = dbService
        .collection('activity')
        .doc(currentUser.email)
        .collection('activityList');

      activityRef.onSnapshot((docs) => {
        if (!docs.empty) {
          let activityList = [];
          docs.forEach((doc) => {
            activityList.push({ ...doc.data(), id: doc.id });
          });

          setActivities(activityDefault.concat(activityList).reverse());
          setLoading(true);
        } else {
          setActivities(activityDefault.reverse());
          setLoading(true);
        }
      });
    }
  }, [currentUser]);

  const addActivityHandler = () => {
    const activityRef = dbService
      .collection('activity')
      .doc(currentUser.email)
      .collection('activityList');

    if (!inputs.name || !inputs.imageUrl) {
      setError(true);
    } else {
      activityRef.add({
        ...inputs,
      });
      setLoading(true);
      setInputs({
        name: '',
        imageUrl: '',
        from: 'user',
        date: '',
      });
      setModalOpen(false);
    }
  };

  const editHandler = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const deleteHandler = () => {
    const activityRef = dbService
      .collection('activity')
      .doc(currentUser.email)
      .collection('activityList');

    let newActivities = activities.filter(
      (activity) => !checkItems.includes(activity.id)
    );
    setActivities(newActivities);
    checkItems.forEach((id) => {
      activityRef.doc(id).delete();
    });
  };

  const checkHandler = (id, checked) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  useEffect(() => {
    setActivities((prev) => {
      const Change = prev.map((el) => {
        return { ...el, selected: false };
      });
      return Change;
    });
  }, [clearActivity]);

  useEffect(() => {
    if (selectActivityNameId) {
      setActivities((prev) => {
        const Change = prev.map((el) => {
          if (selectActivityNameId.id === el.id) {
            recordActivity(el.name, el.id);
            return { ...el, selected: true };
          } else {
            return { ...el, selected: false };
          }
        });
        return Change;
      });
    }
  }, [selectActivityNameId, recordActivity]);

  const selectActivityHandler = (id, activity) => {
    const allSelectedFalse = activities.map((el) => {
      return { ...el, selected: false };
    });

    const oneSelectedTrue = activities.map((el, idx) => {
      if (id === idx) {
        recordActivity(el.name, el.id);
        // setSelectedActivity(el.name);
        return { ...el, selected: true };
      } else {
        // setSelectedActivity('');
        return { ...el, selected: false };
      }
    });
    if (activity.selected) {
      setActivities(allSelectedFalse);
      recordActivity(null);
    } else {
      setActivities(oneSelectedTrue);
    }
  };

  return (
    <>
      <Modal
        open={modalOpen}
        title='Add your activity.'
        onClose={closeModalHandler}
        onConfirm={addActivityHandler}
      >
        {<AddActivity inputs={inputs} setInputs={setInputs} error={error} />}
      </Modal>
      <ul className={classes.record__select}>
        {err && err.activity && (
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
            <p>이미지와 운동명을 입력해주세요.</p>
          </div>
        )}
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
            activities.map((activity, id) => (
              <li className={classes.select__item} key={id}>
                <div className={classes.select__item_content}>
                  <div>
                    <img
                      src={activity.imageUrl}
                      alt='activity'
                      className={classes.select__image}
                    />
                    <span>{activity.name}</span>
                  </div>

                  {activity.from === 'user' && edit ? (
                    <input
                      type='checkbox'
                      style={{ transform: 'scale(1.5)' }}
                      onChange={(e) =>
                        checkHandler(activity.id, e.target.checked)
                      }
                      checked={checkItems.includes(activity.id) ? true : false}
                    />
                  ) : (
                    <svg
                      id={id}
                      xmlns='http://www.w3.org/2000/svg'
                      height='30px'
                      viewBox='0 0 24 24'
                      width='30px'
                      fill='#000000'
                      className={
                        activity.selected === true
                          ? classes.select__icon
                          : classes.icon
                      }
                      onClick={(e) => selectActivityHandler(id, activity)}
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
            onClick={deleteHandler}
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
