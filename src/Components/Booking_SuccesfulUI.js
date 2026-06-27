import React from "react";
import "../Styles/Booking_SuccessfulUI.css";

function BookingSuccessfulUI({ handlePrint, language, text }) {
    return (
        <div className="success-page">
            <div className="success-container">
                <div className="success-circle">
                    <div className="checkmark">
                        ✓
                    </div>
                </div>
                <h1 className="success-heading">
                    {text.bookingSuccessful}
                </h1>
                <p className="success-message">
                    {text.bookingConfirmed}
                </p>
                <button
                    className="home-button"
                    onClick={handlePrint}
                >
                    {text.printTicket}
                </button>
            </div>
        </div>
    );
}
export default BookingSuccessfulUI;