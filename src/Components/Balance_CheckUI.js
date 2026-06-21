import React from "react";
import '../Styles/Balance_Check.css';

function Balance_CheckUI({

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

                <div className="card-machine-wrapper">
                    <div className="card-machine">
                        <div className="machine-indicator"></div>
                        <div className="tap-zone">
                            <div className="card"></div>
                        </div>
                        <p className="card-machine-label">Place the card on the machine below</p>
                    </div>
                </div>

                <div className="balance-button-group">

                    <button

                        className="balance-button back"

                        onClick={handleBack}

                    >

                        {text.back}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Balance_CheckUI;