import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BookingFailedUI from "../Components/Booking_FailedUI";
import Background from "../Components/Background";
import translations from "../Components/Translation";

function Booking_Failed() {

    const navigate = useNavigate();
    const location = useLocation();
    const language = location.state?.language || "english";
    const text = translations[language];

    const handleRetry = () => {

        navigate("/invoice", { state: { ...location.state, language } });

    };

    return (

        <Background>

            <Navbar language={language} />

            <BookingFailedUI

                handleRetry={handleRetry}
                language={language}
                text={text}

            />

        </Background>

    );

}

export default Booking_Failed;