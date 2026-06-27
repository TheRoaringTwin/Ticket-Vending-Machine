import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProcessingPaymentUI from "../Components/Processing_PaymentUI";
import Background from "../Components/Background";
import translations from "../Components/Translation";

function Processing_Payment() {

    const navigate = useNavigate();
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(5);
    const language = location.state?.language || "english";
    const text = translations[language];

    const paymentData = useMemo(() => location.state || {}, [location.state]);
    const BAD_CARD = "1234567891234567";

    useEffect(() => {

        const timer = setTimeout(() => {

            const cardNumber = paymentData.cardNumber?.replace(/-/g, "") || "";
            const isBadCard = cardNumber === BAD_CARD;

            if (isBadCard) {
                navigate("/booking-failed", { state: { ...paymentData, language } });
            } else {
                navigate("/booking-completion", { state: { ...paymentData, language } });
            }

        }, 5000);

        const countdownInterval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };

    }, [navigate, paymentData, language]);

    const handleBack = () => {
        navigate("/Invoice", { state: { ...paymentData, language } });
    };

    return (
        <Background>
            <Navbar language={language} />
            <ProcessingPaymentUI timeLeft={timeLeft} onBack={handleBack} language={language} text={text} />
        </Background>
    );
}

export default Processing_Payment;