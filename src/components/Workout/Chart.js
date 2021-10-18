import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import Wrapper from '../../shared/UIElement/Wrapper';
// import classes from './Chart.module.css';
import DatePicker from 'react-datepicker';
import { Line } from 'react-chartjs-2';
import './Chart.css';

export default function Chart() {
  const { currentUser } = useAuth();
  const [recordData, setRecordData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectDate, setSelectDate] = useState('');
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
  }, [selectDate]);
  console.log(recordData);

  const monthChangeHandler = (date) => {
    const dateInfo = date.toISOString().slice(0, 7);
    setSelectDate(dateInfo);
    setStartDate(date);
  };
  return (
    <Wrapper>
      <Line
        data={{
          labels: recordData.map(({ date }) => date),
          datasets: [
            {
              data: recordData.map(({ weight }) => weight),
              label: 'weight',
              borderColor: 'rgb(75, 192, 192)',
              fill: true,
            },
          ],
        }}
        options={{
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
      <DatePicker
        selected={startDate}
        onChange={(date) => monthChangeHandler(date)}
        dateFormat='MM/yyyy'
        showMonthYearPicker
        showFullMonthYearPicker
        showFourClumnMonthYearPicker
      />
    </Wrapper>
  );
}
