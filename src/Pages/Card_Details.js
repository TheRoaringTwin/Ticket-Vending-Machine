import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CardDetailsUI from "../Components/Card_DetailsUI";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";

function Card_Details() {

    const navigate = useNavigate();
    const location = useLocation();
    const { goToNextPage, goToPreviousPage, currentPage } = useFlow();
    const language = location.state?.language || "english";
    const text = translations[language];

    useEffect(() => {
        if (currentPage === 3) {
            goToNextPage();
        }
    }, []);

    const [cardNumber, setCardNumber] = useState("");
    const [pin, setPin] = useState("");

    // Get payment data from Invoice page
    const paymentData = location.state || {};

    const handleContinue = () => {

        if (cardNumber.length !== 16) {
            alert("Please enter a valid 16 digit card number.");
            return;
        }

        if (pin.length !== 4) {
            alert("Please enter a valid 4 digit PIN.");
            return;
        }

        navigate("/Processing_Payment", {
            state: {
                ...paymentData,
                cardNumber,
                pin,
            },
        });

    };

    const handleBack = () => {

        goToPreviousPage();
        navigate("/Invoice", { state: paymentData });

    };

    return (

        <>
            <Navbar language={language} />

            <CardDetailsUI

                cardNumber={cardNumber}
                setCardNumber={setCardNumber}

                pin={pin}
                setPin={setPin}

                handleContinue={handleContinue}
                handleBack={handleBack}

                language={language}
                text={text}

            />

            <img src="/train.png" className="train-image" alt="train" />

        </>

    );

}

export default Card_Details;