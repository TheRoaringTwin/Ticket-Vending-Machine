import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../Context/FlowContext';
import translations from './Translation';
import '../Styles/ProgressIndicator.css';

const ProgressIndicator = ({ language = 'english' }) => {
  const navigate = useNavigate();
  const { flowType, currentPage, getFlow, goToPage } = useFlow();

  if (!flowType) return null;

  const flow = getFlow();
  const text = translations[language];

  const pageRoutes = {
    home: '/',
    stationSelect: '/Station_Selection',
    journeyType: '/Costing',
    invoice: '/Invoice',
    payment: '/Card_Details',
    ticketPrint: '/Ticket_Print',
    checkBalance: '/Balance_Check',
    balanceDisplay: '/Balance'
  };

  const getPageLabel = (pageKey) => {
    return text[pageKey] || pageKey;
  };

  const handleDotClick = (index) => {
    if (index <= currentPage) {
      goToPage(index);
      const pageKey = flow[index];
      const route = pageRoutes[pageKey] || '/';
      navigate(route, { state: { language } });
    }
  };

  return (
    <div className='progress-container'>
      <div className='progress-dots'>
        {flow.map((pageKey, index) => (
          <div key={index} className='progress-step'>
            <div
              className={`progress-dot ${
                index < currentPage
                  ? 'visited'
                  : index === currentPage
                  ? 'current'
                  : 'pending'
              }`}
              onClick={() => handleDotClick(index)}
              style={{ cursor: index <= currentPage ? 'pointer' : 'not-allowed' }}
            />
            <span className='progress-label'>{getPageLabel(pageKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
