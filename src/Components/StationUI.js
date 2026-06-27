import React from 'react'
import '../Styles/Station_Selection.css';
import { getTranslatedStationName } from '../Data/Stations';

const StationUI = ({
    stations,
    currentStation,
    selectedStation,
    onStationSelect,
    text,
    onBack,
    onContinue,
    language = 'english'
}) => {
    const svgRef = React.useRef(null);
    const pathRef = React.useRef(null);
    const travelPathRef = React.useRef(null);
    const [stationPositions, setStationPositions] = React.useState({});
    const [travelPathData, setTravelPathData] = React.useState('');
    const [, setTravelPathLength] = React.useState(0);

    const STATION_RADIUS = 40;

    const getMetroPathData = () => {
        const width = 1600;
        const height = 700;
        const startX = 120;
        const startY = height - 100;
        const endX = width - 120;
        const endY = 100;
        const midX = width / 2;
        const midY = height / 2;

        return `
            M ${startX} ${startY}
            C ${startX + 200} ${startY - 120}, ${midX - 250} ${midY + 100}, ${midX - 100} ${midY}
            S ${endX - 150} ${endY + 80}, ${endX} ${endY}
        `;
    };

    const isStationBetween = (stationId) => {
        if (!selectedStation) return false;
        const sourceIdx = stations.findIndex(s => s.name === currentStation);
        const destIdx = stations.findIndex(s => s.id === selectedStation.id);
        const currentIdx = stations.findIndex(s => s.id === stationId);

        const min = Math.min(sourceIdx, destIdx);
        const max = Math.max(sourceIdx, destIdx);

        return currentIdx > min && currentIdx < max;
    };

    React.useEffect(() => {
        if (pathRef.current && stations.length > 0) {
            const pathLength = pathRef.current.getTotalLength();
            const positions = {};

            stations.forEach((station, index) => {
                const progress = index / Math.max(stations.length - 1, 1);
                const distance = progress * pathLength;
                const point = pathRef.current.getPointAtLength(distance);
                positions[station.id] = { x: point.x, y: point.y };
            });

            setStationPositions(positions);
        }
    }, [stations]);

    React.useEffect(() => {
        if (!selectedStation || !pathRef.current || stations.length < 2) {
            setTravelPathData('');
            setTravelPathLength(0);
            return;
        }

        const sourceIdx = stations.findIndex(s => s.name === currentStation);
        const destIdx = stations.findIndex(s => s.id === selectedStation.id);

        if (sourceIdx === -1 || destIdx === -1) {
            setTravelPathData('');
            setTravelPathLength(0);
            return;
        }

        const pathLength = pathRef.current.getTotalLength();
        const sourceProgress = sourceIdx / Math.max(stations.length - 1, 1);
        const destProgress = destIdx / Math.max(stations.length - 1, 1);

        const sourceDistance = sourceProgress * pathLength;
        const destDistance = destProgress * pathLength;
        const travelDistance = Math.abs(destDistance - sourceDistance);

        let pathData = '';
        const steps = Math.ceil(travelDistance / 5);

        for (let i = 0; i <= steps; i++) {
            const dist = sourceDistance + ((destDistance - sourceDistance) * (i / steps));
            const point = pathRef.current.getPointAtLength(dist);

            if (i === 0) {
                pathData += `M ${point.x} ${point.y}`;
            } else {
                pathData += ` L ${point.x} ${point.y}`;
            }
        }

        setTravelPathData(pathData);
        setTravelPathLength(travelDistance);
    }, [selectedStation, stations, currentStation]);

    return(
        <>
            <div className='station-container'>
                <h1 className='station-heading'>{text.selectStation}</h1>
                <p className='station-subtitle'>{text.selectStationSubtitle}</p>

                <div className='metro-map-wrapper'>
                    <svg
                        ref={svgRef}
                        className='metro-map-svg'
                        viewBox='0 0 1600 700'
                        preserveAspectRatio='xMidYMid meet'
                    >
                        <defs>
                            <filter id='stationShadow'>
                                <feDropShadow dx='0' dy='2' stdDeviation='3' floodOpacity='0.3' />
                            </filter>
                        </defs>

                        <path
                            ref={pathRef}
                            d={getMetroPathData()}
                            className='metro-line'
                            fill='none'
                            stroke='#333333'
                            strokeWidth='10'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />

                        {travelPathData && (
                            <path
                                ref={travelPathRef}
                                d={travelPathData}
                                className='travel-line'
                                fill='none'
                                stroke='#00BFFF'
                                strokeWidth='8'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeDasharray='2000'
                                style={{
                                    strokeDashoffset: '2000',
                                    animation: `progressAnimation 6s ease-out forwards`
                                }}
                            />
                        )}

                        {stations.map((station) => {
                            const pos = stationPositions[station.id];
                            if (!pos) return null;

                            const isSource = station.name === currentStation;
                            const isSelected = selectedStation?.id === station.id;
                            const isBetween = isStationBetween(station.id);

                            return (
                                <g
                                    key={station.id}
                                    className={`station ${isSource ? 'source' : ''} ${isSelected ? 'selected' : ''} ${isBetween ? 'between' : ''}`}
                                    onClick={() => !isSource && onStationSelect(station)}
                                    style={{ cursor: !isSource ? 'pointer' : 'default' }}
                                >
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={STATION_RADIUS}
                                        className={`station-circle ${isSource ? 'source-circle' : ''} ${isSelected ? 'selected-circle' : isBetween ? 'between-circle' : 'default-circle'}`}
                                        filter='url(#stationShadow)'
                                    />
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={STATION_RADIUS}
                                        className={`station-border ${isSource ? 'source-border' : ''} ${isSelected ? 'selected-border' : 'default-border'}`}
                                        fill='none'
                                    />
                                </g>
                            );
                        })}

                        {stations.map((station, index) => {
                            const pos = stationPositions[station.id];
                            if (!pos) return null;

                            const isSource = station.name === currentStation;
                            const labelOffset = index % 2 === 0 ? -75 : 75;

                            return (
                                <text
                                    key={`label-${station.id}`}
                                    x={pos.x}
                                    y={pos.y + labelOffset}
                                    className={`station-label ${isSource ? 'source-label' : ''}`}
                                    textAnchor='middle'
                                    dominantBaseline='middle'
                                >
                                    {getTranslatedStationName(station.name, language)}
                                </text>
                            );
                        })}
                    </svg>
                </div>

                <div className='continue-wrapper'>
                    <button className='back-btn' onClick={onBack}>
                        ← {text.back || 'Back'}
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