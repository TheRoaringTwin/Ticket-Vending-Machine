import React, { createContext, useState, useCallback } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState({
    currentStation: 'Unknown',
    selectedStation: {},
    journeyType: 'oneway',
    passengers: 1,
    totalFare: 0,
    language: 'english',
  });

  const updateInvoiceData = useCallback((data) => {
    setInvoiceData(prev => ({
      ...prev,
      ...data,
    }));
  }, []);

  const resetInvoiceData = useCallback(() => {
    setInvoiceData({
      currentStation: 'Unknown',
      selectedStation: {},
      journeyType: 'oneway',
      passengers: 1,
      totalFare: 0,
      language: 'english',
    });
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoiceData, updateInvoiceData, resetInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = React.useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within InvoiceProvider');
  }
  return context;
};
