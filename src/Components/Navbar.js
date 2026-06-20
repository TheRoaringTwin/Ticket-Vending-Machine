import React, { useState } from 'react'
import TimeDisplay from './TimeDispaly'
import ProgressIndicator from './ProgressIndicator'
import stations from '../Data/Stations'
import { useStation } from '../Context/StationContext'

export default function Navbar({stationName, language = 'english'}) {
  const { currentStation, updateStation } = useStation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStationSelect = (stationName) => {
    updateStation(stationName);
    setIsDropdownOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='station-dropdown-wrapper'>
        <button
          className='station-name dropdown-toggle'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {currentStation}
          <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
        </button>
        {isDropdownOpen && (
          <div className='station-dropdown-menu'>
            {stations.map((station) => (
              <button
                key={station.id}
                className='dropdown-item'
                onClick={() => handleStationSelect(station.name)}
              >
                {station.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <ProgressIndicator language={language} />
      <TimeDisplay />
    </nav>
  );
}

