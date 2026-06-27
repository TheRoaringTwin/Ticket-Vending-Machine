import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import QRPaymentUI from "../Components/QR_PaymentUI";
import Background from "../Components/Background";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";

function QR_Payment() {

    const navigate = useNavigate();
    const location = useLocation();
    const { goToNextPage, currentPage } = useFlow();
    const language = location.state?.language || "english";
    const text = translations[language];
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        if (currentPage === 3) {
            goToNextPage();
        }
    }, [currentPage, goToNextPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/Processing_Payment", { state: { language } });
        }, 7000);

        return () => clearTimeout(timer);
    }, [navigate, language]);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    const handleBack = () => {
        navigate("/Invoice", { state: { language } });
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (

        <Background>
            <Navbar language={language} />
            <QRPaymentUI onBack={handleBack} timeLeft={`${minutes}:${seconds.toString().padStart(2, '0')}`} language={language} text={text} />
        </Background>

    );

}

export default QR_Payment;
