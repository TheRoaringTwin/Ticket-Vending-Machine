import React from "react";
import "../Styles/Booking_SuccessfulUI.css";

function BookingSuccessfulUI({ handleHome, language, text }) {
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
                    onClick={handleHome}
                >
                    {text.goHome}
                </button>
            </div>
        </div>
    );
}
export default BookingSuccessfulUI;