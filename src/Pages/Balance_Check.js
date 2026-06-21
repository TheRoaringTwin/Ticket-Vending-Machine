import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BalanceCheckUI from "../Components/Balance_CheckUI";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import '../Styles/Balance_Check.css';

function Balance_Check() {

    const location = useLocation();
    const navigate = useNavigate();
    const language = location.state?.language || "english";
    const text = translations[language];
    const { goToNextPage, goToPreviousPage, currentPage } = useFlow();

    useEffect(() => {
        if (currentPage === 0) {
            goToNextPage();
        }
    }, [currentPage, goToNextPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/Balance", {
                state: {
                    language: language
                }
            });
        }, 7000);

        return () => clearTimeout(timer);
    }, [navigate, language]);

    const handleCheck = () => {
       navigate("/Balance", {
    state: {
        language: language
    }
});

    };

    const handleBack = () => {
        goToPreviousPage();
        navigate('/');
    };

    return (

        <>

            <Navbar language={language} />

            <BalanceCheckUI

                handleCheck={handleCheck}
                handleBack={handleBack}

                language={language}
                text={text}

            />

            <img src="/train.png" className="train-image" alt="train" />

        </>

    );

}

export default Balance_Check;