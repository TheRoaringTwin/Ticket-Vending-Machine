import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CostingUI from "../Components/CostingUI";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import "../Styles/Costing.css";

const Costing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { goToNextPage, goToPreviousPage, currentPage } = useFlow();

    useEffect(() => {
        if (currentPage === 1) {
            goToNextPage();
        }
    }, []);

    const currentStation = location.state?.currentStation;
    const selectedStation = location.state?.selectedStation;
    const language = location.state?.language || "english";

    const text = translations[language];

    const baseFare = 20;

    const [journeyType, setJourneyType] = useState("oneway");
    const [passengers, setPassengers] = useState(1);

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
            : baseFare * passengers * 2;

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

