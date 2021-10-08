import { useEffect, useState } from 'react';
import { dbService } from '../../firebase';

// firebase로부터 데이터 받아오는거 custom hook 으로 만들기
export default function usePhotofetch() {
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState();

  useEffect(() => {
    setLoading(true);
    dbService
      .collection('record')
      .doc('user1')
      .collection('events')
      .orderBy('date')
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
  }, []);

  const fetchNextData = () => {
    setLoading(true);
    dbService
      .collection('record')
      .doc('user1')
      .collection('events')
      .orderBy('date')
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
  return { loadedPhotos, loading, hasMore, fetchNextData };
}
