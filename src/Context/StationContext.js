import React, { createContext, useState, useCallback } from 'react';

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [currentStation, setCurrentStation] = useState(() => {
    return localStorage.getItem('currentStation') || 'Station 1';
  });

  const updateStation = useCallback((stationName) => {
    setCurrentStation(stationName);
    localStorage.setItem('currentStation', stationName);
  }, []);

  return (
    <StationContext.Provider value={{ currentStation, updateStation }}>
      {children}
    </StationContext.Provider>
  );
};

export const useStation = () => {
  const context = React.useContext(StationContext);
  if (!context) {
    throw new Error('useStation must be used within StationProvider');
  }
  return context;
};
