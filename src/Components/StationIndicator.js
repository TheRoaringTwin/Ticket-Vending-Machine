import React from 'react';
import '../Styles/StationIndicator.css';

function StationIndicator({ currentStation, selectedStation }) {
  return (
    <div className="station-indicator">
      <div className="indicator-container">
        <div className="station-dot-wrapper">
          <div className="station-dot current-station"></div>
          <div className="station-name-label">{currentStation || 'Current'}</div>
        </div>
        <div className="connecting-line"></div>
        <div className="station-dot-wrapper">
          <div className="station-dot selected-station"></div>
          <div className="station-name-label">{selectedStation || 'Select Station'}</div>
        </div>
      </div>
    </div>
  );
}

export default StationIndicator;
