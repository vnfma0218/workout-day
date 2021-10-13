import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';

export default function usePhotofetch() {
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [infiniteMode, setInfiniteMode] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!infiniteMode) return;
    console.log('fetch Photos');
    setLoading(true);
    setError(null);
    dbService
      .collection('record')
      .doc(currentUser.email)
      .collection('events')
      .orderBy('date', 'desc')
      .limit(3)
      .get()
      .then((docs) => {
        let loadedPhotos = [];
        docs.forEach((doc) => {
          loadedPhotos.push({ ...doc.data(), id: doc.id });
        });
        setLastDoc(docs.docs[docs.docs.length - 1]);
        setLoadedPhotos(loadedPhotos);
        setHasMore(!docs.empty);
        setLoading(false);
      });
  }, [currentUser.email, infiniteMode]);

  const fetchPhotosByDate = () => {
    setInfiniteMode(false);
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    if (new Date(start) > new Date(end)) {
      setLoadedPhotos([]);
      return setError('올바른 날짜범위가 아닙니다');
    }
    setError(null);
    setLoading(true);
    dbService
      .collection('record')
      .doc(currentUser.email)
      .collection('events')
      .orderBy('date')
      .startAt(start)
      .endAt(end)
      .onSnapshot((snapshot) => {
        let loadedPhotos = [];
        snapshot.forEach((doc) => {
          loadedPhotos.push({ ...doc.data(), id: doc.id });
        });
        setLoadedPhotos([...loadedPhotos]);
        setLoading(false);
      });
  };

  const fetchNextData = () => {
    if (!infiniteMode) return;
    setLoading(true);
    dbService
      .collection('record')
      .doc(currentUser.email)
      .collection('events')
      .orderBy('date', 'desc')
      .startAfter(lastDoc)
      .limit(3)
      .get()
      .then((docs) => {
        let loadedPhotos = [];
        docs.forEach((doc) => {
          loadedPhotos.push({ ...doc.data(), id: doc.id });
        });
        setLastDoc(docs.docs[docs.docs.length - 1]);
        setLoadedPhotos((prev) => {
          return [...prev, ...loadedPhotos];
        });
        setHasMore(!docs.empty);
        setLoading(false);
      });
  };
  return {
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
  };
}
