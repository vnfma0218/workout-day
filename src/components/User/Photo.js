import React from 'react';
import MainHeader from '../../shared/Navigation/MainHeader';

import Button from '../../shared/UIElement/Button';
import Wrapper from '../../shared/UIElement/Wrapper';
import classes from './Photo.module.css';
export default function Photo() {
  return (
    <>
      <MainHeader />
      <Wrapper id='first__layout'>
        {/* <div className={classes.photo__header}></div> */}

        <Button name='DATE' />
        <div className={classes.photos}>
          <div className={`${classes.left} ${classes.photo}`}>
            <img src='image/userPhoto/photo1.jpg' alt='workout' />
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
              <h4 className={classes.photo__date}>2020.11.03</h4>
              <p className={classes.photo__memo}>
                여기에는 메모가 들어갈 예정입니다. 정말 힘들었지만 보람찬
                운동이었다.
              </p>
            </div>
          </div>
          <div className={classes.right}>
            <div className={`${classes.right__top} ${classes.photo}`}>
              <img src='image/userPhoto/photo2.jpg' alt='' />
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
                <h4 className={classes.photo__date}>2020.11.03</h4>
                <p className={classes.photo__memo}>
                  여기에는 메모가 들어갈 예정입니다. 정말 힘들었지만 보람찬
                  운동이었다.
                </p>
              </div>
            </div>
            <div className={classes.right__bottom}>
              <div className={`${classes.right__bottom_left}`}>
                <div className={classes.photo}>
                  <img src='image/userPhoto/photo4.jpg' alt='' />
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
                    <h4 className={classes.photo__date}>2020.11.03</h4>
                    <p className={classes.photo__memo}>
                      여기에는 메모가 들어갈 예정입니다. 정말 힘들었지만 보람찬
                      운동이었다.
                    </p>
                  </div>
                </div>
                <div className={classes.photo}>
                  <img src='image/userPhoto/photo4.jpg' alt='' />
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
                    <h4 className={classes.photo__date}>2020.11.03</h4>
                    <p className={classes.photo__memo}>
                      여기에는 메모가 들어갈 예정입니다. 정말 힘들었지만 보람찬
                      운동이었다.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.right__bottom_right} ${classes.photo}`}
              >
                <img src='image/userPhoto/photo3.jpg' alt='' />
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
                  <h4 className={classes.photo__date}>2020.11.03</h4>
                  <p className={classes.photo__memo}>
                    여기에는 메모가 들어갈 예정입니다. 정말 힘들었지만 보람찬
                    운동이었다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
