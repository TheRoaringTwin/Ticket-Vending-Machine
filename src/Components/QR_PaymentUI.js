import React from "react";
import "../Styles/QR_Payment.css";

function QR_PaymentUI({ onBack }) {

    return (

        <div className="qr-page">

            <div className="qr-container">

                <h1 className="qr-title">

                    UPI Payment

                </h1>

                <div className="qr-scanner-wrapper">

                    <img

                        src="/qr-code.png"

                        alt="QR Code"

                        className="qr-image"

                    />

                    <div className="qr-scanner-line"></div>

                </div>

                <p className="qr-text">

                    Scan the QR Code to Pay

                </p>

                <button className="qr-back-btn" onClick={onBack}>

                    ← Back

                </button>

            </div>

        </div>

    );

}

export default QR_PaymentUI;
