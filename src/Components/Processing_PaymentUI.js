import React from "react";
import "../Styles/Processing_Payment.css";

function ProcessingPaymentUI({ timeLeft = 5, onBack, language, text }) {
    return (
        <div className="processing-container">
            <div className="processing-card">
                <div className="loading-spinner"></div>
                <h2 className="processing-title">
                    {text.processingPayment}
                </h2>
                <p className="processing-text">
                    {text.pleaseWait}
                </p>
                <p className="countdown-text">
                    Redirecting in {timeLeft}s
                </p>
            </div>
        </div>
    );
}
export default ProcessingPaymentUI;