import React, { useCallback, useRef, useState } from 'react';
import usePhotofetch from '../../shared/hooks/usePhotofetch';
import MainHeader from '../../shared/Navigation/MainHeader';

import DateRange from '../../shared/UIElement/DatePicker';
import Wrapper from '../../shared/UIElement/Wrapper';

import classes from './SecondLayout.module.css';
export default function SecondLayout() {
  // const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [minDate, setMinDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  const { loadedPhotos, loading, hasMore, fetchNextData } = usePhotofetch();
  const observer = useRef();

  const lastRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      let options = {
        rootMargin: '0px',
        threshold: 1,
      };
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNextData();
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [fetchNextData, hasMore, loading]
  );

  const selectMinDate = (date) => {
    setMinDate(date);
  };

  return (
    <>
      <MainHeader />
      <Wrapper id='second__layout' className={classes.second__layout}>
        <div className={classes.selectDate__container}>
          <div className={classes.selectDate}>
            <DateRange setDate={selectMinDate} />
            <p>–</p>
            <DateRange minDate={minDate} setDate={(date) => setEndDate(date)} />
          </div>
          <button className={classes.selectBtn}>조회</button>
        </div>

        <div className={classes.photos}>
          {loadedPhotos &&
            loadedPhotos.map((photo, index) => {
              if (loadedPhotos.length === index + 1) {
                return (
                  <div
                    key={photo.id}
                    ref={lastRef}
                    className={`${classes.photo}`}
                  >
                    <img src={photo.imageUrl} alt='workout' />
                    <div className={classes.mapIcon}>
                      <svg
                        viewBox='0 0 33 46'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M16.0417 0C7.17292 0 0 7.17292 0 16.0417C0 28.0729 16.0417 45.8333 16.0417 45.8333C16.0417 45.8333 32.0833 28.0729 32.0833 16.0417C32.0833 7.17292 24.9104 0 16.0417 0ZM16.0417 21.7708C12.8792 21.7708 10.3125 19.2042 10.3125 16.0417C10.3125 12.8792 12.8792 10.3125 16.0417 10.3125C19.2042 10.3125 21.7708 12.8792 21.7708 16.0417C21.7708 19.2042 19.2042 21.7708 16.0417 21.7708Z' />
                      </svg>
                    </div>
                    <div className={classes.photo__description}>
                      <h4 className={classes.photo__date}>{photo.date}</h4>
                      <p className={classes.photo__memo}>{photo.memo}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={photo.id} className={`${classes.photo}`}>
                    <img src={photo.imageUrl} alt='workout' />
                    <div className={classes.mapIcon}>
                      <svg
                        viewBox='0 0 33 46'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M16.0417 0C7.17292 0 0 7.17292 0 16.0417C0 28.0729 16.0417 45.8333 16.0417 45.8333C16.0417 45.8333 32.0833 28.0729 32.0833 16.0417C32.0833 7.17292 24.9104 0 16.0417 0ZM16.0417 21.7708C12.8792 21.7708 10.3125 19.2042 10.3125 16.0417C10.3125 12.8792 12.8792 10.3125 16.0417 10.3125C19.2042 10.3125 21.7708 12.8792 21.7708 16.0417C21.7708 19.2042 19.2042 21.7708 16.0417 21.7708Z' />
                      </svg>
                    </div>
                    <div className={classes.photo__description}>
                      <h4 className={classes.photo__date}>{photo.date}</h4>
                      <p className={classes.photo__memo}>{photo.memo}</p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Wrapper>
    </>
  );
}
