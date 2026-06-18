import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProcessingPaymentUI from "../Components/Processing_PaymentUI";
import translations from "../Components/Translation";

function Processing_Payment() {

    const navigate = useNavigate();
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(5);
    const [language, setLanguage] = useState(location.state?.language || "english");
    const text = translations[language];

    // Get data from Invoice page
    const paymentData = location.state || {};
    const BAD_CARD = "1234567891234567"; // Bad card number without dashes

    useEffect(() => {

        const timer = setTimeout(() => {

            // Check if the card is the bad card
            const cardNumber = paymentData.cardNumber?.replace(/-/g, "") || "";
            const isBadCard = cardNumber === BAD_CARD;

            // Navigate to appropriate page
            if (isBadCard) {
                navigate("/booking-failed", { state: paymentData });
            } else {
                navigate("/booking-completion", { state: paymentData });
            }

        }, 5000);

        const countdownInterval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };

    }, [navigate, paymentData]);

    const handleBack = () => {
        navigate("/Invoice", { state: paymentData });
    };

    return (
        <>
            <Navbar language={language} />

            <ProcessingPaymentUI timeLeft={timeLeft} onBack={handleBack} language={language} text={text} />

            <img src="/train.png" className="train-image" alt="train" />
        </>
    );
}

export default Processing_Payment;