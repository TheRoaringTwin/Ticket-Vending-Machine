import React, { createContext, useState, useCallback } from 'react';

export const CostingContext = createContext();

export const CostingProvider = ({ children }) => {
  const [costingData, setCostingData] = useState({
    selectedStation: null,
    journeyType: 'oneway',
    passengers: 1,
    language: 'english',
  });

  const updateCostingData = useCallback((data) => {
    setCostingData(prev => ({
      ...prev,
      ...data,
    }));
  }, []);

  const resetCostingData = useCallback(() => {
    setCostingData({
      selectedStation: null,
      journeyType: 'oneway',
      passengers: 1,
      language: 'english',
    });
  }, []);

  return (
    <CostingContext.Provider value={{ costingData, updateCostingData, resetCostingData }}>
      {children}
    </CostingContext.Provider>
  );
};

export const useCosting = () => {
  const context = React.useContext(CostingContext);
  if (!context) {
    throw new Error('useCosting must be used within CostingProvider');
  }
  return context;
};
