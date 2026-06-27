import React from "react";
import '../Styles/Balance.css';
import { convertToHindiNumerals } from "../Utils/hindiConverter";

function BalanceUI({

    cardNumber,
    balance,
    loading,
    language,
    text

}) {
    const formatBalance = (amount) => {
        if (!amount && amount !== 0) return "₹ 0.00";
        const formatted = "₹ " + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return language === 'hindi' ? convertToHindiNumerals(formatted) : formatted;
    };

    const formatCardNumber = (card) => {
        if (!card) return "xxxx-xxxx-xxxx-5128";
        const cleanCard = card.replace(/\D/g, '');
        if (cleanCard.length < 4) return "xxxx-xxxx-xxxx-xxxx";
        const lastFour = cleanCard.slice(-4);
        return `xxxx-xxxx-xxxx-${lastFour}`;
    };
    return (
        <div className="balance-page">
            <div className="balance-container">
                {loading ? (
                    <>
                        <div className="balance-loader"></div>
                        <h2>
                            {text.processingPayment}
                        </h2>
                        <p>
                            {text.pleaseWait}
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="balance-title">
                            {text.balanceEnquiry}
                        </h2>
                        <div className="balance-info-row">
                            <span className="balance-label">{text.cardNumber} :</span>
                            <span className="balance-value">{language === 'hindi' ? convertToHindiNumerals(formatCardNumber(cardNumber)) : formatCardNumber(cardNumber)}</span>
                        </div>
                        <div className="balance-info-row">
                            <span className="balance-label">{text.totalAmount} :</span>
                            <span className="balance-value">{formatBalance(balance)}</span>
                        </div>
                        <div className="balance-info-row">
                            <span className="balance-label">{text.cardStatus} :</span>
                            <span className="balance-value">{text.active}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default BalanceUI;
