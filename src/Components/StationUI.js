import React from 'react'
import stations from '../Data/Stations'
import '../Styles/Station_Selection.css';

const StationUI = ({
    stations,
    currentStation,
    selectedStation,
    onStationSelect,
    text,
    onBack,
    onContinue
}) => {
    return(
        <>
                <div className='station-container'>
                    <h1 className='station-heading'>{text.selectStation}</h1>
                    <p className='station-subtitle'>{text.selectStationSubtitle}</p>

                        <div className='station-list'>
                        {stations.map((station) => (
                            <button 
                                    key={station.id}
                                    className={`station-btn ${
                                        selectedStation?.id === station.id ? "selected" : ""
                                    } ${
                                        station.name === currentStation ? "disabled-station" : ""
                                    }`}
                                    disabled={station.name === currentStation}
                                    onClick={() => {
                                            onStationSelect && onStationSelect(station);
                                    }}
                            >
                                    <span className='circle'>
                                    {selectedStation?.id === station.id ? "" : ""}
                                    </span>

                                    <span>{station.name}</span>
                        </button>
                        ))}
                    </div>
                    <div className='continue-wrapper'>
                        <button className='back-btn' onClick={onBack}>
                            ← Back
                        </button>
                        <button className='continue-btn' onClick={onContinue}>
                            {text.continue}
                        </button>
                    </div>
            </div> 
        </>    
    )
}

export default StationUI;