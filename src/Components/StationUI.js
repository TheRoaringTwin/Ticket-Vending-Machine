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
    const getIntermediateStations = () => {
        if (!currentStation || !selectedStation) return [];

        const currentIndex = stations.findIndex(s => s.name === currentStation);
        const selectedIndex = selectedStation.id - 1;

        if (currentIndex === -1) return [];

        const startIdx = Math.min(currentIndex, selectedIndex);
        const endIdx = Math.max(currentIndex, selectedIndex);

        return stations.slice(startIdx, endIdx + 1).map(s => s.id);
    };

    const intermediateStations = getIntermediateStations();
    const isStationInPath = (stationId) => intermediateStations.includes(stationId);

    return(
        <>
                <div className='station-container'>
                    <h1 className='station-heading'>{text.selectStation}</h1>
                    <p className='station-subtitle'>{text.selectStationSubtitle}</p>

                    {/* Track Visualization - Horizontal */}
                    <div className='track-visualization-horizontal'>
                        <div className='track-bar-horizontal'>
                            {stations.map((station, index) => (
                                <React.Fragment key={station.id}>
                                    <div className={`station-dot ${
                                        selectedStation?.id === station.id ? "selected-dot" : ""
                                    } ${
                                        isStationInPath(station.id) ? "in-path-dot" : ""
                                    } ${
                                        station.name === currentStation ? "current-dot" : ""
                                    } ${
                                        station.name === currentStation && selectedStation ? "animate-current" : ""
                                    }`}>
                                        🚊
                                    </div>
                                    {index < stations.length - 1 && (
                                        <div className={`connecting-line ${
                                            isStationInPath(station.id) && isStationInPath(stations[index + 1].id) ? "line-highlighted" : ""
                                        }`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Station List - 3 Columns */}
                    <div className='station-list-section'>
                        <div className='station-list'>
                            {stations.map((station) => (
                                <button
                                    key={station.id}
                                    className={`station-btn ${
                                        station.name === currentStation ? "disabled-station" : ""
                                    }`}
                                    disabled={station.name === currentStation}
                                    onClick={() => {
                                        onStationSelect && onStationSelect(station);
                                    }}
                                >
                                    <span className={`circle ${
                                        selectedStation?.id === station.id ? "selected-circle" : ""
                                    }`}>
                                    </span>
                                    <span>{station.name}</span>
                                </button>
                            ))}
                        </div>
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