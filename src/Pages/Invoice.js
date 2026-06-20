import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import InvoiceUI from "../Components/InvoiceUI";
import translations from "../Components/Translation";
import { useFlow } from "../Context/FlowContext";
import { useInvoice } from "../Context/InvoiceContext";
import { useCosting } from "../Context/CostingContext";
import "../Styles/Invoice.css";


function Invoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { goToNextPage, goToPreviousPage, currentPage } = useFlow();
  const { invoiceData, updateInvoiceData } = useInvoice();
  const { costingData } = useCosting();

  useEffect(() => {
    if (currentPage === 2) {
      goToNextPage();
    }
  }, [currentPage]);

  // Get data from location.state or context
  const currentStation = location.state?.currentStation || invoiceData.currentStation || "Unknown";
  const selectedStationObj = location.state?.selectedStation || invoiceData.selectedStation || costingData.selectedStation || {};
  const selectedStationName = selectedStationObj?.name || invoiceData.selectedStation?.name || costingData.selectedStation?.name || "Unknown";
  const journeyType = location.state?.journeyType || invoiceData.journeyType || costingData.journeyType || "oneway";
  const passengers = location.state?.passengers || invoiceData.passengers || costingData.passengers || 1;
  const totalFare = location.state?.totalFare || invoiceData.totalFare || 0;
  const initialLanguage = location.state?.language || invoiceData.language || costingData.language || "english";

  // State management
  const [language, setLanguage] = useState(initialLanguage);

  // Store data in context whenever it changes
  useEffect(() => {
    updateInvoiceData({
      currentStation,
      selectedStation: selectedStationObj,
      journeyType,
      passengers,
      totalFare,
      language: initialLanguage,
    });
  }, [currentStation, selectedStationObj, journeyType, passengers, totalFare, initialLanguage, updateInvoiceData]);

  const text = translations[language];

  // Calculate fare based on distance between stations
  const calculateBaseFare = () => {
    if (!currentStation || !selectedStationObj.id) return 5;

    // Extract station numbers from names (e.g., "Station 1" -> 1)
    const currentNum = parseInt(currentStation.split(" ")[1]);
    const selectedNum = selectedStationObj.id;

    // Calculate absolute distance
    const distance = Math.abs(selectedNum - currentNum);

    // Pricing formula: 5 rupees per station distance (matches Costing)
    const fare = distance * 5;
    return fare;
  };

  const baseFare = useMemo(() => calculateBaseFare(), [currentStation, selectedStationObj]);
  const farePerPassenger = journeyType === "oneway" ? baseFare : baseFare * 1.5;

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

  // Handle QR payment
  const handleQRPayment = () => {
    navigate("/QR_Payment", {
      state: {
        selectedPayment: "qr",
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
            <button className="invoice-payment-btn qr-btn" onClick={handleQRPayment}>
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