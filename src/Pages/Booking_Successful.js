import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BookingSuccessfulUI from "../Components/Booking_SuccesfulUI";
import Background from "../Components/Background";
import translations from "../Components/Translation";
import "../Styles/Booking_Successful.css";

function Booking_Successful() {

    const navigate = useNavigate();
    const location = useLocation();
    const language = location.state?.language || "english";
    const text = translations[language];


    const handlePrint = () => {

        navigate("/Ticket_Print", {
            state: location.state
        });

    };

    return (

        <Background>

            <Navbar language={language} />

            <BookingSuccessfulUI
                handlePrint={handlePrint}
                language={language}
                text={text}
            />

        </Background>

    );

}

export default Booking_Successful;