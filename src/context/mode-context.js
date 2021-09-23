import React, { useState } from 'react';

export const ModeContext = React.createContext({
  isDietMode: false,
  onDietMode: () => {},
  onNormalMode: () => {},
});
export function ModeContextProvider(props) {
  const [isDietMode, setIsDietMode] = useState(false);

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
