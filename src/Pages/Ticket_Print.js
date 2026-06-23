import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TicketPrintUI from "../Components/Ticket_PrintUI";
import Background from "../Components/Background";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import { useInvoice } from "../Context/InvoiceContext";
import { useCosting } from "../Context/CostingContext";
import { useStation } from "../Context/StationContext";
import "../Styles/TicketCollectionPopup.css";

function Ticket_Print() {

    const navigate = useNavigate();
    const location = useLocation();
    const { goToNextPage, currentPage, goToHome, flowType } = useFlow();
    const { resetInvoiceData } = useInvoice();
    const { resetCostingData } = useCosting();
    const { resetSelectedStation } = useStation();
    const language = location.state?.language || "english";
    const text = translations[language];
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (flowType === 'ticket' && currentPage === 4) {
            goToNextPage();
        }
    }, [currentPage, flowType, goToNextPage]);

    const handleGoHome = useCallback(() => {
        resetInvoiceData();
        resetCostingData();
        resetSelectedStation();
        goToHome();
        navigate("/", { state: { language } });
    }, [resetInvoiceData, resetCostingData, resetSelectedStation, goToHome, navigate, language]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);

            const redirectTimer = setTimeout(() => {
                handleGoHome();
            }, 4000);

            return () => clearTimeout(redirectTimer);
        }, 9000);

        return () => clearTimeout(timer);
    }, [handleGoHome]);

    return (
        <Background>
            <Navbar language={language} />
            <TicketPrintUI text={text} />

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <div className="popup-icon">
                            ✓
                        </div>
                        <h2 className="popup-title">Your Ticket Has Been Printed</h2>
                        <p className="popup-message">
                            Please collect your ticket
                        </p>
                    </div>
                </div>
            )}

        </Background>
    );
}

export default Ticket_Print;
