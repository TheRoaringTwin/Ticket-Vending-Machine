import React from "react";
import '../Styles/Balance.css';

function BalanceUI({

    cardNumber,
    balance,
    loading,
    language,
    text

}) {
    const formatBalance = (amount) => {
        if (!amount && amount !== 0) return "₹ 0.00";
        return "₹ " + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                            <span className="balance-label">{text.totalAmount} :</span>
                            <span className="balance-value">{formatBalance(balance)}</span>
                        </div>
                        <div className="balance-info-row">
                            <span className="balance-label">Card Status :</span>
                            <span className="balance-value">{`Active`}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default BalanceUI;
