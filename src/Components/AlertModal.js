import React from 'react';
import '../Styles/AlertModal.css';

const AlertModal = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="alert-icon">⚠️</div>
        <p className="alert-message">{message}</p>
        <button className="alert-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
