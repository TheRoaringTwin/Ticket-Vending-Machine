import React, { useState } from 'react'
import TimeDisplay from './TimeDispaly'
import ProgressIndicator from './ProgressIndicator'
import stations from '../Data/Stations'
import { useStation } from '../Context/StationContext'

export default function Navbar({stationName, language = 'english', isHomeScreen = false}) {
  const { currentStation, updateStation } = useStation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStationSelect = (stationName) => {
    updateStation(stationName);
    setIsDropdownOpen(false);
  };

  const handleDropdownClick = () => {
    if (isHomeScreen) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <nav className='navbar'>
      <div className='station-dropdown-wrapper'>
        {isHomeScreen ? (
          <>
            <button
              className='station-name dropdown-toggle'
              onClick={handleDropdownClick}
              title='Click to change station'
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
          </>
        ) : (
          <span className='station-name-text'>{currentStation}</span>
        )}
      </div>
      <ProgressIndicator language={language} />
      <TimeDisplay />
    </nav>
  );
}

