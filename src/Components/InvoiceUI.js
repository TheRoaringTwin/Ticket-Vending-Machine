import React from "react";
import "../Styles/Invoice.css";

function InvoiceUI({
  fromStation,
  toStation,
  passengers,
  ticketType,
  farePerPassenger,
  totalFare,
  text,
  language,
  handleBack,
}) {
  return (
    <div className="invoice-container">

      <div className="invoice-card">

        <h1 className="invoice-heading">
          {text?.ticketInvoice || 'Ticket Invoice'}
        </h1>

        {/* Journey Details */}

        <div className="invoice-section">

          <h2>{text?.journeyDetails || 'Journey Details'}</h2>

          <div className="invoice-row">
            <span>{text?.from || 'From'}</span>
            <span>{fromStation}</span>
          </div>

          <div className="invoice-row">
            <span>{text?.to || 'To'}</span>
            <span>{toStation}</span>
          </div>

          <div className="invoice-row">
            <span>{text?.ticketType || 'Ticket Type'}</span>
            <span>{ticketType}</span>
          </div>

          <div className="invoice-row">
            <span>{text?.passengers || 'Passengers'}</span>
            <span>{passengers}</span>
          </div>

        </div>

        {/* Fare Details */}

        <div className="invoice-section">

          <h2>{text?.fareSummary || 'Fare Summary'}</h2>

          <div className="invoice-row">
            <span>{text?.farePerPassenger || 'Fare / Passenger'}</span>
            <span>₹{farePerPassenger}</span>
          </div>

          <div className="invoice-row">
            <span>{text?.totalPassengers || 'Total Passengers'}</span>
            <span>{passengers}</span>
          </div>

          <div className="invoice-row total-fare">
            <span>{text?.totalFare || 'Total Fare'}</span>
            <span>₹{totalFare}</span>
          </div>

        </div>

        <div className="invoice-back-button-wrapper">
          <button
            className="invoice-back-btn"
            onClick={handleBack}
          >
            ← {text?.back || 'Back'}
          </button>
        </div>

      </div>

    </div>
  );
}

export default InvoiceUI;