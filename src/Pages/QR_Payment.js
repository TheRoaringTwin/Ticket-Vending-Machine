import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import QR_PaymentUI from "../Components/QR_PaymentUI";
import { useFlow } from "../Context/FlowContext";

function QR_Payment() {

    const navigate = useNavigate();
    const { goToNextPage, currentPage } = useFlow();

    useEffect(() => {
        if (currentPage === 3) {
            goToNextPage();
        }
    }, [currentPage]);

    useEffect(() => {

        const timer = setTimeout(() => {

            navigate("/Processing_Payment");

        }, 7000);

        return () => clearTimeout(timer);

    }, [navigate]);

    const handleBack = () => {
        navigate("/Invoice");
    };

    return (

        <>

            <Navbar />

            <QR_PaymentUI onBack={handleBack} />

            <img src="/train.png" className="train-image" alt="train" />

        </>

    );

}

export default QR_Payment;
