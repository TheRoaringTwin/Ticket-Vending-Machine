import React, { createContext, useContext, useState } from 'react';

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [flowType, setFlowType] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const ticketFlow = ['home', 'stationSelect', 'journeyType', 'invoice', 'payment', 'ticketPrint'];
  const balanceFlow = ['home', 'checkBalance', 'balanceDisplay'];

  const getFlow = () => flowType === 'balance' ? balanceFlow : ticketFlow;

  const startTicketFlow = () => {
    setFlowType('ticket');
    setCurrentPage(0);
  };

  const startBalanceFlow = () => {
    setFlowType('balance');
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    const flow = getFlow();
    if (currentPage < flow.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToHome = () => {
    setCurrentPage(0);
  };

  const goToPage = (pageIndex) => {
    const flow = getFlow();
    if (pageIndex >= 0 && pageIndex < flow.length) {
      setCurrentPage(pageIndex);
    }
  };

  const resetFlow = () => {
    setFlowType(null);
    setCurrentPage(0);
  };

  return (
    <FlowContext.Provider value={{
      flowType,
      currentPage,
      startTicketFlow,
      startBalanceFlow,
      goToNextPage,
      goToPreviousPage,
      goToHome,
      goToPage,
      resetFlow,
      getFlow
    }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within FlowProvider');
  }
  return context;
};
