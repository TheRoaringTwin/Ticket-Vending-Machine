import React from "react";
import "../Styles/Ticket_Print.css";

function Ticket_PrintUI({ text }) {

    return (
        <div className="print-page">
            <div className="print-container">
                <div className="print-animation">
                    <div className="printer-wrapper">
                        <div className="printer">
                            <div className="printer-header">
                                <div className="printer-light"></div>
                                <span className="printer-label">RECEIPT</span>
                            </div>
                            <div className="paper-slot">
                                <div className="paper">
                                    <div className="paper-line"></div>
                                    <div className="paper-line"></div>
                                    <div className="paper-line"></div>
                                </div>
                            </div>
                            <div className="printer-footer">
                                <div className="printer-button"></div>
                            </div>
                        </div>
                        <div className="collected-papers">
                            <div className="paper-stack"></div>
                        </div>
                    </div>
                </div>

                <p className="print-message">
                    🖨️ Please be patient while the receipt is being printed
                </p>

                <div className="print-loader">
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                    <div className="loader-dot"></div>
                </div>
            </div>
        </div>
    );

}

export default Ticket_PrintUI;
