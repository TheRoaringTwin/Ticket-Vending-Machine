import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/Home_Screen.css';
import './Styles/Global.css';
import { StationProvider } from './Context/StationContext';
import { FlowProvider } from './Context/FlowContext';
import SessionTimeOut from './Components/SessionTimeOut';
import Home_Screen from './Pages/Home_Screen';
import Station_Selection from './Pages/Station_Selection';
import Costing from './Pages/Costing';
import Invoice from './Pages/Invoice';
import Card_Details from './Pages/Card_Details';
import Processing_Payment from './Pages/Processing_Payment';
import Booking_Successful from './Pages/Booking_Successful';
import Booking_Failed from './Pages/Booking_Failed';
import Balance_Check from './Pages/Balance_Check';
import Checking_Balance from './Pages/Checking_Balance';
import Balance from './Pages/Balance';



function App() {
  return (
   <StationProvider>
    <FlowProvider>
     <BrowserRouter>
       <SessionTimeOut>
         <Routes>
           <Route path="/" element={<Home_Screen/>} />
           <Route path="/Station_Selection" element={<Station_Selection/>} />
           <Route path="/Costing" element={<Costing/>}/>
           <Route path="/Invoice" element={<Invoice/>}/>
           <Route path="/Card_Details" element={<Card_Details/>}/>
           <Route path="/Processing_Payment" element={<Processing_Payment/>}/>
           <Route path="/booking-completion" element={<Booking_Successful/>}/>
           <Route path="/booking-failed" element={<Booking_Failed/>}/>
           <Route path="/Balance_Check" element={<Balance_Check/>}/>
           <Route path="/checking-balance" element={<Checking_Balance/>}/>
           <Route path="/Balance" element={<Balance/>}/>
         </Routes>
       </SessionTimeOut>
     </BrowserRouter>
    </FlowProvider>
   </StationProvider>
  );
}

export default App;
