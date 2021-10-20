import React, { forwardRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';

import { Line } from 'react-chartjs-2';
import classes from './HourChart.module.css';

export default function Chart() {
  const { currentUser } = useAuth();
  const [recordData, setRecordData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState('');

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={classes.datepicker__btn} onClick={onClick} ref={ref}>
      {value}
      <img src='img/icons/down-arrow.png' alt='down-arrow' />
    </button>
  ));

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(211, 179, 247,1)');
    gradient.addColorStop(1, 'rgba(154, 106, 209, 0.3)');

    return {
      labels: recordData
        .map(({ date }) => date)
        .map((el) => {
          return el
            .split('-')
            .filter((el, i) => i !== 0)
            .join('-');
        }),
      datasets: [
        {
          data: recordData.map(({ weight }) => weight),
          label: '몸무게',
          fill: true,
          backgroundColor: gradient,
          borderColor: '#fff',
          pointBackgroundColor: 'rgb(189,195,199)',
          tension: 0.4,
        },
      ],
    };
  };

  useEffect(() => {
    dbService
      .collection('record')
      .doc(currentUser.email)
      .collection('events')
      .orderBy('date')
      .onSnapshot((snapshot) => {
        const record = [];

        snapshot.forEach((doc) => {
          if (doc.data().weight) {
            record.push({ date: doc.data().date, weight: doc.data().weight });
          }
        });

        let chartDate = [];
        if (selectDate) {
          chartDate = record.filter((el) => {
            return el.date.slice(0, 7) === selectDate;
          });
        } else {
          chartDate = record.filter(
            (el) => el.date.slice(0, 7) === startDate.toISOString().slice(0, 7)
          );
        }

        setRecordData(chartDate);
      });
  }, [selectDate, currentUser, startDate]);

  const monthChangeHandler = (date) => {
    const dateInfo = date.toISOString().slice(0, 7);
    setSelectDate(dateInfo);
    setStartDate(date);
  };

  return (
    <>
      <div className={classes.datepicker}>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={(date) => monthChangeHandler(date)}
          dateFormat='MM/yyyy'
          showMonthYearPicker
          showFullMonthYearPicker
          showFourClumnMonthYearPicker
          customInput={<ExampleCustomInput />}
        />
      </div>
      {recordData && (
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
                yAxes: {
                  ticks: {
                    min: 0,
                    callback: function (label, index, labels) {
                      return label + 'kg';
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
}
