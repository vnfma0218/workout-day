import { useEffect, useState } from 'react';
import { dbService } from '../../firebase';

export default function useFetchEvents() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    console.log('fetch events');
    setLoading(true);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const start =
      startDate || `${year}-${month < 10 ? `0${month}` : { month }}-01`;
    const end = endDate || `${year}-${month < 10 ? `0${month}` : { month }}-31`;
    let loadedEvents = [];
    dbService
      .collection('record')
      .doc('user1')
      .collection('events')
      .orderBy('date')
      .startAt(start)
      .endAt(end)
      .get((docs) => {
        return docs;
      })
      .then((res) => {
        res.forEach((doc) => loadedEvents.push(doc.data()));
        setEvents(loadedEvents);
        setLoading(false);
      });
    setSelectedDate(date.toISOString().split('T')[0]);
  }, [startDate, endDate]);
  return {
    events,
    selectedDate,
    setSelectedDate,
    // getCalendarData,
    setStartDate,
    setEndDate,
    loading,
  };
}
