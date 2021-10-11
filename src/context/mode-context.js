import React, { useEffect, useState } from 'react';
import { dbService } from '../firebase';
import { useAuth } from './auth-context';

export const ModeContext = React.createContext({
  isDietMode: false,
  onDietMode: () => {},
  onNormalMode: () => {},
});
export function ModeContextProvider(props) {
  const [isDietMode, setIsDietMode] = useState(false);
  const { currentUser } = useAuth();
  console.log();
  useEffect(() => {
    if (currentUser) {
      dbService
        .collection('users')
        .doc(currentUser.email)
        .get()
        .then((doc) => {
          setIsDietMode(!doc.data().workoutMode);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  const DietModeHandler = () => {
    setIsDietMode(true);
  };
  const NormalModeHandler = () => {
    setIsDietMode(false);
  };

  return (
    <ModeContext.Provider
      value={{
        isDietMode: isDietMode,
        onDietMode: DietModeHandler,
        onNormalMode: NormalModeHandler,
      }}
    >
      {props.children}
    </ModeContext.Provider>
  );
}
