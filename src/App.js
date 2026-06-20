import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/Home_Screen.css';
import './Styles/Global.css';
import { StationProvider } from './Context/StationContext';
import { FlowProvider } from './Context/FlowContext';
import { InvoiceProvider } from './Context/InvoiceContext';
import { CostingProvider } from './Context/CostingContext';
import SessionTimeOut from './Components/SessionTimeOut';
import Home_Screen from './Pages/Home_Screen';
import Station_Selection from './Pages/Station_Selection';
import Costing from './Pages/Costing';
import Invoice from './Pages/Invoice';
import Card_Details from './Pages/Card_Details';
import QR_Payment from './Pages/QR_Payment';
import Processing_Payment from './Pages/Processing_Payment';
import Ticket_Print from './Pages/Ticket_Print';
import Booking_Successful from './Pages/Booking_Successful';
import Booking_Failed from './Pages/Booking_Failed';
import Balance_Check from './Pages/Balance_Check';
import Checking_Balance from './Pages/Checking_Balance';
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
           <Route path="/" element={<Home_Screen/>} />
           <Route path="/Station_Selection" element={<Station_Selection/>} />
           <Route path="/Costing" element={<Costing/>}/>
           <Route path="/Invoice" element={<Invoice/>}/>
           <Route path="/Card_Details" element={<Card_Details/>}/>
           <Route path="/QR_Payment" element={<QR_Payment/>}/>
           <Route path="/Processing_Payment" element={<Processing_Payment/>}/>
           <Route path="/Ticket_Print" element={<Ticket_Print/>}/>
           <Route path="/booking-completion" element={<Booking_Successful/>}/>
           <Route path="/booking-failed" element={<Booking_Failed/>}/>
           <Route path="/Balance_Check" element={<Balance_Check/>}/>
           <Route path="/checking-balance" element={<Checking_Balance/>}/>
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
