import React, { forwardRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useState } from 'react/cjs/react.development';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import MonthPicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import classes from './Chart.module.css';
import MainHeader from '../../shared/Navigation/MainHeader';

const Chart = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={classes.datepicker__btn} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  useEffect(() => {
    setLoading(true);
    dbService
      .collection('record')
      .doc('vnfma0218@naver.com')
      .collection('events')
      .get()
      .then((docs) => {
        const loadedData = [];
        docs.forEach((doc) => {
          loadedData.push({
            ...doc.data(),
            minutes: Number(doc.data().hour * 60) + Number(doc.data().minutes),
          });
        });
        setData(loadedData);
        setLoading(false);
      });
  }, [currentUser]);

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(58,123,213,1)');
    gradient.addColorStop(1, 'rgba(0,210,255,0.3)');

    return {
      labels: data.map((el) => el.date),
      datasets: [
        {
          label: '운동시간',
          data: data.map((el) => el.minutes),
          fill: true,
          backgroundColor: gradient,
          borderColor: '#fff',
          pointBackgroundColor: 'rgb(189,195,199)',
          tension: 0.4,
        },
      ],
    };
  };

  const selectDate = (date) => {
    setStartDate(date);
    const start = date.toISOString().split('T')[0];
    const end = date
      .toISOString()
      .split('T')[0]
      .split('-')
      .map((el, i) => {
        if (i === 2) {
          return '31';
        } else {
          return el;
        }
      })
      .join('-');

    setLoading(true);
    if (currentUser) {
      const userEmail = currentUser.email;
      dbService
        .collection('record')
        .doc(userEmail)
        .collection('events')
        .orderBy('date', 'asc')
        .startAt(start)
        .endAt(end)
        .get()
        .then((docs) => {
          const loadedData = [];
          docs.forEach((doc) => {
            loadedData.push({
              ...doc.data(),
              minutes:
                Number(doc.data().hour * 60) + Number(doc.data().minutes),
            });
          });
          setData(loadedData);
          setLoading(false);
        });

      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <MainHeader />
      <div className={classes.hour__container}>
        <div className={classes.chart__title}>
          <h1>운동시간</h1>
        </div>
        <div className={classes.chart__content}>
          <div className={classes.datepicker}>
            <MonthPicker
              locale={ko}
              selected={startDate}
              onChange={(date) => selectDate(date)}
              dateFormat='MM/yyyy'
              showMonthYearPicker
              showFullMonthYearPicker
              showFourColumnMonthYearPicker
              customInput={<ExampleCustomInput />}
            />
          </div>
          {data && !loading && (
            <div className={classes.chart}>
              <Line
                data={chartData}
                options={{
                  radius: 5,
                  hitRadius: 30,
                  hoverRadius: 12,
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      ticks: {
                        callback: function (value) {
                          return value + '(분)';
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
