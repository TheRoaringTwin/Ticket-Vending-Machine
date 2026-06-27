import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CardDetailsUI from "../Components/Card_DetailsUI";
import Background from "../Components/Background";
import AlertModal from "../Components/AlertModal";
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
    }, [currentPage, goToNextPage]);

    const [cardNumber, setCardNumber] = useState("");
    const [pin, setPin] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const paymentData = location.state || {};

    const handleContinue = () => {
        if (cardNumber.length !== 16) {
            setAlertMessage(text.invalidCardNumber);
            setIsAlertOpen(true);
            return;
        }
        if (pin.length !== 4) {
            setAlertMessage(text.invalidPin);
            setIsAlertOpen(true);
            return;
        }
        navigate("/Processing_Payment", {
            state: {
                ...paymentData,
                cardNumber,
                pin,
                language,
            },
        });

    };

    const handleBack = () => {
        goToPreviousPage();
        navigate("/Invoice", { state: { ...paymentData, language } });
    };
    return (

        <Background>
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
            <AlertModal
                message={alertMessage}
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
            />
        </Background>
    );
}
export default Card_Details;