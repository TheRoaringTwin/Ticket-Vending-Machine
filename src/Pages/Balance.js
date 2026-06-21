import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BalanceUI from "../Components/BalanceUI";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import '../Styles/Balance.css';

function Balance() {

    const location = useLocation();
    const navigate = useNavigate();
    const { goToNextPage, currentPage } = useFlow();
    const language = location.state?.language || "english";
    const text = translations[language];
    const cardNumber = location.state?.cardNumber || "";

    const mockBalance = 5250.75;

    useEffect(() => {
        if (currentPage === 1) {
            goToNextPage();
        }
    }, [currentPage, goToNextPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/", {
                state: {
                    language: language
                }
            });
        }, 9000);

        return () => clearTimeout(timer);
    }, [navigate, language]);

    return (

        <>

            <Navbar language={language} />

            <BalanceUI

                cardNumber={cardNumber}
                balance={mockBalance}
                loading={false}

                language={language}
                text={text}

            />

            <img src="/train.png" className="train-image" alt="train" />

        </>

    );

}

export default Balance;
