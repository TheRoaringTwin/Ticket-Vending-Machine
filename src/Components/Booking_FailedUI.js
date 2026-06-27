import React from "react";
import "../Styles/Booking_Failed.css";

function Booking_FailedUI({

    handleRetry,
    language,
    text

}) {

    return (
        <div className="failed-page">
            <div className="failed-container">
                <div className="failed-circle">
                    <div className="failed-cross">
                        ✕
                    </div>
                </div>
                <h1 className="failed-heading">
                    {text.paymentFailed}
                </h1>
                <p className="failed-message">
                    {text.paymentDenied}
                </p>
                <button
                    className="retry-button"
                    onClick={handleRetry}
                >
                    {text.tryAgain}
                </button>
            </div>
        </div>
    );
}

export default Booking_FailedUI;