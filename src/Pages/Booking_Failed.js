import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BookingFailedUI from "../Components/Booking_FailedUI";
import translations from "../Components/Translation";

function Booking_Failed() {

    const navigate = useNavigate();
    const location = useLocation();
    const language = location.state?.language || "english";
    const text = translations[language];

    const handleRetry = () => {

        navigate("/invoice");

    };

    return (

        <>

            <Navbar language={language} />

            <BookingFailedUI

                handleRetry={handleRetry}
                language={language}
                text={text}

            />

            <img src="/train.png" className="train-image" alt="train" />

        </>

    );

}

export default Booking_Failed;