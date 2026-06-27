import React from "react";
import "../Styles/QR_Payment.css";

function QRPaymentUI({ onBack, timeLeft, language = 'english', text = {} }) {

    return (

        <div className="qr-page">
            <div className="qr-container">
                <h1 className="qr-title">
                    {text.upiPayment || 'UPI Payment'}
                </h1>
                <div className="qr-scanner-wrapper">
                    <img src="/qr-code.png" alt="QR Code" className="qr-image"/>

                    <div className="qr-scanner-line"></div>
                </div>
                <p className="qr-text">
                    {text.scanQR || 'Scan the QR Code to Pay'}
                </p>
                <p className="qr-timer">
                    {timeLeft}
                </p>
                <button className="qr-back-btn" onClick={onBack}>
                    ← Back
                </button>
            </div>
        </div>
    );
}

export default QRPaymentUI;
