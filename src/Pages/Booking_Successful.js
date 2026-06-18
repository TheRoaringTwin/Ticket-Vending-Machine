import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BookingSuccessfulUI from "../Components/Booking_SuccesfulUI";
import translations from "../Components/Translation";
import "../Styles/Booking_Successful.css";

function Booking_Successful() {

    const navigate = useNavigate();
    const location = useLocation();
    const language = location.state?.language || "english";
    const text = translations[language];

    const handleHome = () => {

        navigate("/");

    };

    return (

        <>

            <Navbar language={language} />

            <BookingSuccessfulUI
                handleHome={handleHome}
                language={language}
                text={text}
            />

            <img src="/train.png" className="train-image" alt="train" />

        </>

    );

}

export default Booking_Successful;