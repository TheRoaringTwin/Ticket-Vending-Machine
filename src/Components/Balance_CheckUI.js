import React from "react";
import '../Styles/Balance_Check.css';

function Balance_CheckUI({

    cardNumber,
    setCardNumber,

    expiryDate,
    setExpiryDate,

    cvv,
    setCvv,

    handleCheck,
    handleBack,

    language,
    text

}) {

    return (

        <div className="balance-page">

            <div className="balance-container">

                <h1 className="balance-title">

                    {text.checkBalance}

                </h1>

                <p className="balance-subtitle">

                    {text.enterCardDetails2}

                </p>

                <div className="balance-input-group">

                    <label>

                        {text.cardNumber}

                    </label>

                    <input

                        type="text"

                        maxLength="16"

                        placeholder="1234-5678-1234-5678"

                        value={cardNumber}

                        onChange={(e) =>
                            setCardNumber(
                                e.target.value.replace(/\D/g, "")
                            )
                        }

                    />

                </div>

                <div className="balance-input-group">

                    <label>

                        {text.expiryDate}

                    </label>

                    <input

                        type="text"

                        maxLength="5"

                        placeholder="MM/YY"

                        value={expiryDate}

                        onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (value.length >= 2) {
                                value = value.slice(0, 2) + "/" + value.slice(2);
                            }
                            setExpiryDate(value);
                        }}

                    />

                </div>

                <div className="balance-input-group">

                    <label>

                        {text.cvv}

                    </label>

                    <input

                        type="password"

                        maxLength="3"

                        placeholder="***"

                        value={cvv}

                        onChange={(e) =>
                            setCvv(
                                e.target.value.replace(/\D/g, "")
                            )
                        }

                    />

                </div>

                <div className="balance-button-group">

                    <button

                        className="balance-button back"

                        onClick={handleBack}

                    >

                        {text.back}

                    </button>

                    <button

                        className="balance-button"

                        onClick={handleCheck}

                    >

                        {text.checkBalanceBtn}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Balance_CheckUI;