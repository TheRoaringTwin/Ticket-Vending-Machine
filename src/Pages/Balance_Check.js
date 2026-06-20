import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BalanceCheckUI from "../Components/Balance_CheckUI";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import '../Styles/Balance_Check.css';

function Balance_Check() {

    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
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

    const handleCheck = () => {

        if (cardNumber.length !== 16) {
            alert("Please enter a valid 16 digit card number.");
            return;
        }

        if (expiryDate.length !== 5) {
            alert("Please enter a valid expiry date.");
            return;
        }

        if (cvv.length !== 3) {
            alert("Please enter a valid 3 digit security code.");
            return;
        }

       navigate("/checking-balance", {
    state: {
        cardNumber: cardNumber,
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

                cardNumber={cardNumber}
                setCardNumber={setCardNumber}

                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}

                cvv={cvv}
                setCvv={setCvv}

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