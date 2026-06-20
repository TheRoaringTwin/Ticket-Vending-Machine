import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/Home_Screen.css';
import './Styles/Global.css';
import { StationProvider } from './Context/StationContext';
import { FlowProvider } from './Context/FlowContext';
import { InvoiceProvider } from './Context/InvoiceContext';
import { CostingProvider } from './Context/CostingContext';
import SessionTimeOut from './Components/SessionTimeOut';
import HomeScreen from './Pages/Home_Screen';
import StationSelection from './Pages/Station_Selection';
import Costing from './Pages/Costing';
import Invoice from './Pages/Invoice';
import CardDetails from './Pages/Card_Details';
import QRPayment from './Pages/QR_Payment';
import ProcessingPayment from './Pages/Processing_Payment';
import TicketPrint from './Pages/Ticket_Print';
import BookingSuccessful from './Pages/Booking_Successful';
import BookingFailed from './Pages/Booking_Failed';
import BalanceCheck from './Pages/Balance_Check';
import CheckingBalance from './Pages/Checking_Balance';
import Balance from './Pages/Balance';



function App() {
  return (
   <StationProvider>
    <FlowProvider>
     <InvoiceProvider>
      <CostingProvider>
       <BrowserRouter>
         <SessionTimeOut>
           <Routes>
           <Route path="/" element={<HomeScreen/>} />
           <Route path="/Station_Selection" element={<StationSelection/>} />
           <Route path="/Costing" element={<Costing/>}/>
           <Route path="/Invoice" element={<Invoice/>}/>
           <Route path="/Card_Details" element={<CardDetails/>}/>
           <Route path="/QR_Payment" element={<QRPayment/>}/>
           <Route path="/Processing_Payment" element={<ProcessingPayment/>}/>
           <Route path="/Ticket_Print" element={<TicketPrint/>}/>
           <Route path="/booking-completion" element={<BookingSuccessful/>}/>
           <Route path="/booking-failed" element={<BookingFailed/>}/>
           <Route path="/Balance_Check" element={<BalanceCheck/>}/>
           <Route path="/checking-balance" element={<CheckingBalance/>}/>
           <Route path="/Balance" element={<Balance/>}/>
         </Routes>
         </SessionTimeOut>
       </BrowserRouter>
      </CostingProvider>
     </InvoiceProvider>
    </FlowProvider>
   </StationProvider>
  );
}

export default App;
