import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';

export default function usePhotofetch() {
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState();
  const {
    currentUser: { email },
  } = useAuth();

  useEffect(() => {
    setLoading(true);
    dbService
      .collection('record')
      .doc(email)
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
  }, [email]);

  const fetchNextData = () => {
    setLoading(true);
    dbService
      .collection('record')
      .doc(email)
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
