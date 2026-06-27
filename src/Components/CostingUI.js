import React from "react";
import "../Styles/Costing.css";

const CostingUI = ({
    text,
    journeyType,
    setJourneyType,
    passengers,
    increasePassenger,
    decreasePassenger,
    totalFare,
    onBack,
    onContinue

    
}) => {
    return(
        <div className="costing-container">
            <h1 className="costing-heading">
                {text.selectJourney}
            </h1>
            <p className="costing-subtitle">
                {text.selectJourneySubtitle}
            </p>
            <div className="journey-options">
                <button
                    className={`journey-btn ${
                        journeyType === "oneway" ? "selected" : ""
                    }`}
                    onClick={() => setJourneyType("oneway")}
                >
                    {text.oneWay}
                </button>
                <button
                    className={`journey-btn ${
                        journeyType === "roundtrip" ? "selected" : ""
                    }`}
                    onClick={() => setJourneyType("roundtrip")}
                >
                    {text.roundTrip}
                </button>
            </div>
            <div className="passenger-section">
                <h3>
                    {text.passengers}
                </h3>
                <div className="counter">
                    <button
                        className="counter-btn"
                        onClick={decreasePassenger}
                    >
                        -

                    </button>
                    <span className="counter-value">
                        {passengers}
                    </span>
                    <button
                        className="counter-btn"
                        onClick={increasePassenger}
                    >

                        +
                    </button>
                </div>
            </div>
            <div className="price-section">
                <p>
                    {text.totalFare}
                </p>
                <h2>
                    ₹ {totalFare}
                </h2>
            </div>
            <div className="continue-wrapper">
                <button
                    className="back-btn"
                    onClick={onBack}
                >
                    ← {text.back || 'Back'}
                </button>
                <button
                    className="continue-btn"
                    onClick={onContinue}
                >
                    {text.continue}
                </button>
            </div>
        </div>
    );
};

export default CostingUI;

