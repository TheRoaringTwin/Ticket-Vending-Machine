import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import QRPaymentUI from "../Components/QR_PaymentUI";
import Background from "../Components/Background";
import { useFlow } from "../Context/FlowContext";

function QR_Payment() {

    const navigate = useNavigate();
    const { goToNextPage, currentPage } = useFlow();
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        if (currentPage === 3) {
            goToNextPage();
        }
    }, [currentPage, goToNextPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/Processing_Payment");
        }, 7000);

        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    const handleBack = () => {
        navigate("/Invoice");
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (

        <Background>

            <Navbar />

            <QRPaymentUI onBack={handleBack} timeLeft={`${minutes}:${seconds.toString().padStart(2, '0')}`} />

        </Background>

    );

}

export default QR_Payment;
