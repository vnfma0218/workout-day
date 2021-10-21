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
  useEffect(() => {
    if (currentUser) {
      dbService
        .collection('users')
        .doc(currentUser.email)
        .onSnapshot((doc) => {
          setIsDietMode(!doc.data().workoutMode);
        });
      // .catch((err) => console.log(err));
    }
  }, [currentUser]);

  const DietModeHandler = () => {
    dbService
      .collection('users')
      .doc(currentUser.email)
      .update({ workoutMode: false })
      .catch((err) => console.log(err));
  };
  function NormalModeHandler() {
    dbService
      .collection('users')
      .doc(currentUser.email)
      .update({ workoutMode: true })
      .catch((err) => console.log(err));
  }

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
