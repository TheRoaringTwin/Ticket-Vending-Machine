import React, { useEffect } from "react";
import "../Styles/Checking_Balance.css";
import { convertToHindiNumerals } from "../Utils/hindiConverter";

function Checking_BalanceUI({

    cardNumber,
    timeLeft,
    language,
    text

}) {

    useEffect(() => {
        const timer = setTimeout(() => {
                }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="checking-page">
            <div className="checking-container">
                <div className="checking-loader"></div>
                <h2>
                    {text.processingPayment}
                </h2>
                <p>
                    {text.pleaseWait}
                </p>
                <p style={{fontSize: '18px', marginTop: '15px', opacity: '0.9'}}>
                    {text.redirectingInSeconds} {language === 'hindi' ? convertToHindiNumerals(timeLeft) : timeLeft} {text.seconds}...
                </p>
            </div>
        </div>
    );
}

export default Checking_BalanceUI;
