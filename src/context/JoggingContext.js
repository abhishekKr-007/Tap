// context/JoggingContext.js
import React, { createContext, useContext, useState } from "react";

const JoggingContext = createContext();

export const JoggingProvider = ({ children }) => {
  const [jogStats, setJogStats] = useState({ distance: 0, duration: 0 });
  const [isJogging, setIsJogging] = useState(false); // NEW

  return (
    <JoggingContext.Provider value={{ jogStats, setJogStats, isJogging, setIsJogging }}>
      {children}
    </JoggingContext.Provider>
  );
};

export const useJogging = () => useContext(JoggingContext);
