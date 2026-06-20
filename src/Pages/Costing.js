import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CostingUI from "../Components/CostingUI";
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
    }, [currentPage]);

    const currentStation = location.state?.currentStation || contextCurrentStation;
    const [selectedStation, setSelectedStation] = useState(location.state?.selectedStation || costingData.selectedStation || null);
    const language = location.state?.language || costingData.language || "english";

    // Update context when selectedStation changes
    useEffect(() => {
        if (selectedStation) {
            updateSelectedStation(selectedStation);
            updateCostingData({ selectedStation });
        }
    }, [selectedStation, updateSelectedStation, updateCostingData]);

    const text = translations[language];

    // Calculate fare based on distance between stations
    const calculateFare = () => {
        if (!currentStation || !selectedStation || !selectedStation.id) return 5;

        // Extract station numbers from names (e.g., "Station 1" -> 1)
        const currentNum = parseInt(currentStation.split(" ")[1]);
        const selectedNum = selectedStation.id;

        // Calculate absolute distance
        const distance = Math.abs(selectedNum - currentNum);

        // Pricing formula: 5 rupees per station distance
        // Station 1->2 (distance 1) = 5, Station 1->9 (distance 8) = 40
        const fare = distance * 5;
        return fare;
    };

    const baseFare = useMemo(() => calculateFare(), [currentStation, selectedStation]);

    const [journeyType, setJourneyType] = useState(costingData.journeyType || "oneway");
    const [passengers, setPassengers] = useState(costingData.passengers || 1);

    // Sync journey type and passengers with context when context changes
    useEffect(() => {
        if (costingData.journeyType && costingData.journeyType !== journeyType) {
            setJourneyType(costingData.journeyType);
        }
        if (costingData.passengers && costingData.passengers !== passengers) {
            setPassengers(costingData.passengers);
        }
    }, [costingData.journeyType, costingData.passengers]);

    // Store journey type and passengers in context whenever they change
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

            <img
                src="/train.png"
                className="train-image"
                alt="train"
            />
        </div>
    );
};

export default Costing;

