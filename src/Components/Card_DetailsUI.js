import React from "react";
import "../Styles/Card_Details.css";

function CardDetailsUI({

    cardNumber,
    setCardNumber,

    pin,
    setPin,

    handleContinue,
    handleBack,

    language,
    text

}) {

    return (

        <div className="card-page">

            <div className="card-container">

                <h1>{text.cardPayment}</h1>

                <p className="card-subtitle">
                    {text.enterCardDetailsPayment}
                </p>

                <div className="input-group">

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

                <div className="input-group">

                    <label>
                        {text.fourDigitPin}
                    </label>

                    <input

                        type="password"

                        maxLength="4"

                        placeholder="****"

                        value={pin}

                        onChange={(e) =>
                            setPin(
                                e.target.value.replace(/\D/g, "")
                            )
                        }

                    />

                </div>

                <div className="button-container">

                    <button
                        className="back-button"
                        onClick={handleBack}
                    >
                        {text.back}
                    </button>

                    <button
                        className="continue-button"
                        onClick={handleContinue}
                    >
                        {text.continue}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default CardDetailsUI;