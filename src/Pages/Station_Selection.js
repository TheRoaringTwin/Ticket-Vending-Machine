import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import StationUI from "../Components/StationUI";
import stations from "../Data/Stations";
import translations from "../Components/Translation";
import { useStation } from "../Context/StationContext";
import { useFlow } from "../Context/FlowContext";

const StationSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentStation } = useStation();
    const { goToNextPage, goToPreviousPage, currentPage } = useFlow();

    useEffect(() => {
        if (currentPage === 0) {
            goToNextPage();
        }
    }, []);
    // Get language from home screen or default to english
    const language = location.state?.language || "english";
    // Selected station
    const [selectedStation, setSelectedStation] = useState(null);
    // Translation object
    const text = translations[language];
    // Only one station can be selected
    const handleStationSelect = (station) => {

        if (selectedStation === station) {
            setSelectedStation(null);
        } else {
            setSelectedStation(station);
        }

    };
    // Continue Button
    const handleContinue = () => {

        if (!selectedStation) {
            alert(text.selectStationMessage);
            return;
        }
        navigate("/Costing", {
            state: {
                currentStation: currentStation,
                selectedStation: selectedStation,
                language: language,
            },
        });
    };
    
    // Back button handler
    const handleBack = () => {
        goToPreviousPage();
        navigate('/');
    };

    return (
        <div className="station-selection-page">
            <Navbar language={language} />
            <StationUI
                language={language}
                text={text}
                currentStation={currentStation}            
                stations={stations}
                selectedStation={selectedStation}
                onStationSelect={handleStationSelect}
                onContinue={handleContinue}
                onBack={handleBack}
            />
            <img src="/train.png" className='train-image' />
        </div>
    );

};

export default StationSelection;