import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Checking_BalanceUI from "../Components/Checking_BalanceUI";
import translations from "../Components/Translation";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlow } from "../Context/FlowContext";

function Checking_Balance() {

    const location = useLocation();
    const navigate = useNavigate();
    const { flowType } = useFlow();
    const [language, setLanguage] = useState(location.state?.language || "english");
    const text = translations[language];
    const [timeLeft, setTimeLeft] = useState(5);

    const cardNumber = location.state?.cardNumber || "";

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/Balance", {
                state: {
                    cardNumber: cardNumber,
                    language: language
                }
            });
        }, 5000);

        const countdownInterval = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(countdownInterval);
        };
    }, [navigate, cardNumber, language]);

    return (

        <>

            <Navbar language={language} />

            <Checking_BalanceUI

                cardNumber={cardNumber}
                timeLeft={timeLeft}

                language={language}
                text={text}

            />

            <img src="/train.png" className="train-image" alt="train" />

        </>

    );

}

export default Checking_Balance;