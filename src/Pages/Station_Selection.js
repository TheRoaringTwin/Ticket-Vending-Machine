import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import StationUI from "../Components/StationUI";
import AlertModal from "../Components/AlertModal";
import Background from "../Components/Background";
import stations from "../Data/Stations";
import translations from "../Components/Translation";
import { useStation } from "../Context/StationContext";
import { useFlow } from "../Context/FlowContext";

const StationSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentStation, selectedStation: contextSelectedStation, updateSelectedStation } = useStation();
    const { goToNextPage, goToPreviousPage, currentPage } = useFlow();

    useEffect(() => {
        if (currentPage === 0) {
            goToNextPage();
        }
    }, [currentPage, goToNextPage]);
    // Get language from home screen or default to english
    const language = location.state?.language || "english";
    // Selected station - use context value if available
    const [selectedStation, setSelectedStation] = useState(contextSelectedStation || null);
    // Alert modal state
    const [showAlert, setShowAlert] = useState(false);
    // Translation object
    const text = translations[language];
    // Only one station can be selected
    const handleStationSelect = (station) => {

        if (selectedStation === station) {
            setSelectedStation(null);
            updateSelectedStation(null);
        } else {
            setSelectedStation(station);
            updateSelectedStation(station);
        }

    };
    // Continue Button
    const handleContinue = () => {

        if (!selectedStation) {
            setShowAlert(true);
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
        updateSelectedStation(null);
        goToPreviousPage();
        navigate('/');
    };

    return (
        <Background>
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
                <AlertModal
                    message={text.selectStationMessage}
                    isOpen={showAlert}
                    onClose={() => setShowAlert(false)}
                />
            </div>
        </Background>
    );

};

export default StationSelection;