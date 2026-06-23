import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CostingUI from "../Components/CostingUI";
import Background from "../Components/Background";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import { useCosting } from "../Context/CostingContext";
import { useStation } from "../Context/StationContext";
import "../Styles/Costing.css";

const Costing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { goToNextPage, goToPreviousPage, currentPage } = useFlow();
    const { costingData, updateCostingData } = useCosting();
    const { updateSelectedStation, currentStation: contextCurrentStation } = useStation();

    useEffect(() => {
        if (currentPage === 1) {
            goToNextPage();
        }
    }, [currentPage, goToNextPage]);

    const currentStation = location.state?.currentStation || contextCurrentStation;
    const [selectedStation] = useState(location.state?.selectedStation || costingData.selectedStation || null);
    const language = location.state?.language || costingData.language || "english";

    // Update context when selectedStation changes
    useEffect(() => {
        if (selectedStation) {
            updateSelectedStation(selectedStation);
            updateCostingData({ selectedStation });
        }
    }, [selectedStation, updateSelectedStation, updateCostingData]);

    const text = translations[language];

    const baseFare = useMemo(() => {
        if (!currentStation || !selectedStation || !selectedStation.id) return 5;

        const currentNum = parseInt(currentStation.split(" ")[1]);
        const selectedNum = selectedStation.id;
        const distance = Math.abs(selectedNum - currentNum);
        return distance * 5;
    }, [currentStation, selectedStation]);

    const [journeyType, setJourneyType] = useState(costingData.journeyType || "oneway");
    const [passengers, setPassengers] = useState(costingData.passengers || 1);

    useEffect(() => {
        updateCostingData({
            journeyType,
            passengers,
        });
    }, [journeyType, passengers, updateCostingData]);

    const increasePassenger = () => {

        if(passengers < 10){
            setPassengers(passengers + 1);
        }
    };

    const decreasePassenger = () => {
        if(passengers > 1){
            setPassengers(passengers - 1);
        }
    };

    const totalFare =
        journeyType === "oneway"
            ? baseFare * passengers
            : baseFare * passengers * 1.5;

    const handleBack = () => {
        goToPreviousPage();
        navigate("/Station_Selection");
    };

    const handleContinue = () => {
        navigate("/Invoice",{
            state:{
                currentStation,
                selectedStation,
                journeyType,
                passengers,
                totalFare,
                language
            }
        });
    };

    return(
        <Background>
            <div className="costing-page">
                <Navbar language={language} />
                <CostingUI
                    text={text}
                    journeyType={journeyType}
                    setJourneyType={setJourneyType}
                    passengers={passengers}
                    increasePassenger={increasePassenger}
                    decreasePassenger={decreasePassenger}
                    totalFare={totalFare}
                    onBack={handleBack}
                    onContinue={handleContinue}
                />
            </div>
        </Background>
    );
};

export default Costing;

