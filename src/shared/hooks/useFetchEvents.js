import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';

export default function useFetchEvents() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  // const {
  //   currentUser: { email },
  // } = useAuth();

  const dateClickHandler = (arg) => {
    if (!arg.dateStr) return;
    setLoading(true);
    const clickedEvent = events.filter(
      (event) => event.date === arg.dateStr
    )[0];
    setSelectedEvent(clickedEvent);
    setSelectedDate(arg.dateStr);
    setLoading(false);
  };

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
      .doc('jiwon')
      .collection('events')
      .orderBy('date')
      .startAt(start)
      .endAt(end)
      .onSnapshot((snapshot) => {
        loadedEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(loadedEvents);
        setLoading(false);
      });
    setSelectedDate(date.toISOString().split('T')[0]);
  }, [startDate, endDate]);

  return {
    events,
    selectedDate,
    setStartDate,
    setEndDate,
    selectedEvent,
    setSelectedEvent,
    dateClickHandler,
    loading,
  };
}
