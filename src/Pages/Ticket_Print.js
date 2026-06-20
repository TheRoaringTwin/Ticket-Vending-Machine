import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Ticket_PrintUI from "../Components/Ticket_PrintUI";
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
    }, [currentPage, flowType]);

    // Get data from previous pages
    const paymentData = location.state || {};

    const handleGoHome = () => {
        resetInvoiceData();
        resetCostingData();
        resetSelectedStation();
        goToHome();
        navigate("/", { state: { language } });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);

            const redirectTimer = setTimeout(() => {
                handleGoHome();
            }, 4000);

            return () => clearTimeout(redirectTimer);
        }, 9000);

        return () => clearTimeout(timer);
    }, [navigate, goToHome, resetInvoiceData, resetCostingData, resetSelectedStation]);

    return (
        <>
            <Navbar language={language} />
            <Ticket_PrintUI text={text} />

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

            <img src="/train.png" className="train-image" alt="train" />
        </>
    );
}

export default Ticket_Print;
