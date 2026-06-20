import React, { createContext, useState, useCallback } from 'react';

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
  const [currentStation, setCurrentStation] = useState(() => {
    return localStorage.getItem('currentStation') || 'Station 1';
  });

  const [selectedStation, setSelectedStation] = useState(null);

  const updateStation = useCallback((stationName) => {
    setCurrentStation(stationName);
    localStorage.setItem('currentStation', stationName);
  }, []);

  const updateSelectedStation = useCallback((station) => {
    setSelectedStation(station);
  }, []);

  const resetSelectedStation = useCallback(() => {
    setSelectedStation(null);
  }, []);

  return (
    <StationContext.Provider value={{ currentStation, updateStation, selectedStation, updateSelectedStation, resetSelectedStation }}>
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
