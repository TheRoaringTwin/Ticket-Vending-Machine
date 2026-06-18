import React from 'react';
import { useFlow } from '../Context/FlowContext';
import translations from './Translation';
import '../Styles/ProgressIndicator.css';

const ProgressIndicator = ({ language = 'english' }) => {
  const { flowType, currentPage, getFlow } = useFlow();

  if (!flowType) return null;

  const flow = getFlow();
  const text = translations[language];

  const getPageLabel = (pageKey) => {
    return text[pageKey] || pageKey;
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
            />
            <span className='progress-label'>{getPageLabel(pageKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
