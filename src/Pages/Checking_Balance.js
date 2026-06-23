import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CheckingBalanceUI from "../Components/Checking_BalanceUI";
import Background from "../Components/Background";
import translations from "../Components/Translation";
import { useLocation, useNavigate } from "react-router-dom";

function Checking_Balance() {

    const location = useLocation();
    const navigate = useNavigate();
    const [language] = useState(location.state?.language || "english");
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

        <Background>

            <Navbar language={language} />

            <CheckingBalanceUI

                cardNumber={cardNumber}
                timeLeft={timeLeft}

                language={language}
                text={text}

            />

        </Background>

    );

}

export default Checking_Balance;