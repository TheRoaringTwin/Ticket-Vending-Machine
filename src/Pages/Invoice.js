import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import InvoiceUI from "../Components/InvoiceUI";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import "../Styles/Invoice.css";


function Invoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { goToNextPage, goToPreviousPage, currentPage } = useFlow();

  useEffect(() => {
    if (currentPage === 2) {
      goToNextPage();
    }
  }, []);

  // Get data from Costing page
  const currentStation = location.state?.currentStation || "Unknown";
  const selectedStationObj = location.state?.selectedStation || {};
  const selectedStationName = selectedStationObj?.name || "Unknown";
  const journeyType = location.state?.journeyType || "oneway";
  const passengers = location.state?.passengers || 1;
  const totalFare = location.state?.totalFare || 0;
  const initialLanguage = location.state?.language || "english";

  // State management
  const [language, setLanguage] = useState(initialLanguage);

  const text = translations[language];

  // Calculate fare per passenger (assuming base fare of 20)
  const baseFare = 20;
  const farePerPassenger = journeyType === "oneway" ? baseFare : baseFare * 2;

  // Handle back navigation
  const handleBack = () => {
    goToPreviousPage();
    navigate("/Costing", {
      state: {
        selectedStation: selectedStationObj,
        language,
      },
    });
  };

  // Handle card payment
  const handleCardPayment = () => {
    navigate("/Card_Details", {
      state: {
        selectedPayment: "card",
        totalFare,
        currentStation,
        selectedStationName,
        journeyType,
        passengers,
        language,
      },
    });
  };

  return (
    <>
      <Navbar language={language} />

      <div className="invoice-main-wrapper">
        <InvoiceUI
          fromStation={currentStation}
          toStation={selectedStationName}
          passengers={passengers}
          ticketType={journeyType === "oneway" ? text.oneWay : text.roundTrip}
          farePerPassenger={farePerPassenger}
          totalFare={totalFare}
          text={text}
          language={language}
          handleBack={handleBack}
        />

        <div className="payment-options-container">
          <h3 className="payment-method-heading">Choose Payment Method</h3>

          <div className="invoice-payment-buttons">
            <button className="invoice-payment-btn card-btn" onClick={handleCardPayment}>
              <span className="btn-icon">💳</span>
              <span className="btn-text">Card Payment</span>
            </button>
            <button className="invoice-payment-btn qr-btn">
              <span className="btn-icon">📱</span>
              <span className="btn-text">QR Payment</span>
            </button>
          </div>
        </div>
      </div>

      <img src="/train.png" className="train-image" alt="train" />
    </>
  );
}

export default Invoice;