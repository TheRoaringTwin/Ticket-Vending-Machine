import React from 'react';
import '../Styles/StationIndicator.css';
import { getTranslatedStationName } from '../Data/Stations';

function StationIndicator({ currentStation, selectedStation, language = 'english' }) {
  return (
    <div className="station-indicator">
      <div className="indicator-container">
        <div className="station-dot-wrapper">
          <div className="station-dot current-station"></div>
          <div className="station-name-label">{currentStation ? getTranslatedStationName(currentStation, language) : 'Current'}</div>
        </div>
        <div className="connecting-line"></div>
        <div className="station-dot-wrapper">
          <div className="station-dot selected-station"></div>
          <div className="station-name-label">{selectedStation ? getTranslatedStationName(selectedStation, language) : 'Select Station'}</div>
        </div>
      </div>
    </div>
  );
}

export default StationIndicator;
