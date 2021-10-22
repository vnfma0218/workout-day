import React, { useCallback, useRef, useState } from 'react';
import useDietfetch from '../../shared/hooks/useDietfetch';
import DateRange from '../../shared/UIElement/DatePicker';
import LoadingSpinner from '../../shared/UIElement/LoadingSpinner';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './SecondLayout.module.css';

export default function DietPhoto() {
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  const {
    loadedPhotos,
    loading,
    hasMore,
    fetchNextData,
    startDate,
    setStartDate,
    setEndDate,
    fetchPhotosByDate,
    setInfiniteMode,
    infiniteMode,
    error,
  } = useDietfetch();

  const observer = useRef();

  const lastRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      let options = {
        rootMargin: '10px',
        threshold: 1,
      };
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('bottom');
          fetchNextData();
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [fetchNextData, hasMore, loading]
  );

  const selectMinDate = (date) => {
    setStartDate(date);
  };

  console.log(loadedPhotos);

  return (
    <>
      <Wrapper id='second__layout' className={classes.second__layout}>
        {/* <UserPhotoInfo /> */}
        <div className={classes.selectDate__container}>
          <div className={classes.selectDate}>
            <DateRange
              open={startPickerOpen}
              setDate={selectMinDate}
              pickerOpen={setStartPickerOpen}
            />
            <p>–</p>
            <DateRange
              open={!startPickerOpen && endPickerOpen}
              minDate={startDate}
              pickerOpen={setEndPickerOpen}
              setDate={(date) => {
                setEndDate(date);
              }}
            />
          </div>
          <button
            className={classes.selectBtn}
            onClick={() => fetchPhotosByDate()}
          >
            조회
          </button>
          {error && (
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
              <p>{error}</p>
            </div>
          )}
          <button
            className={classes.latestBtn}
            onClick={() => setInfiniteMode(true)}
          >
            최근순
          </button>
        </div>

        {loading && <LoadingSpinner />}
        <article className={classes.photos}>
          {loadedPhotos &&
            loadedPhotos.map((photo, index) => {
              if (loadedPhotos.length === index + 1 && infiniteMode) {
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
        </article>
      </Wrapper>
    </>
  );
}
