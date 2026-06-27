import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import translations from '../Components/Translation';
import Navbar from '../Components/Navbar';
import Languagebutton from '../Components/Language-button';
import Background from '../Components/Background';
import { useStation } from '../Context/StationContext';
import { useFlow } from '../Context/FlowContext';
import '../Styles/Home_Screen.css';


const PurchaseButton = ({onclick, language}) => {
    const currentText = translations[language];
    return(
          <button className='metro-btn' onClick={onclick}>
              <img src="/ticket.png" className='button-icon' alt="ticket icon" />
              <span>{currentText.purchaseTicket}</span>
          </button>
      ); 
   };

const BalanceCheck  = ({onclick, language}) => {
    const currentText = translations[language];
    return(
         <button className='metro-btn' onClick={onclick}>
                <img src="/money.png" className='button-icon' alt="balance check icon" />
                <span>{currentText.balanceCheck}</span>
          </button>
      );
   };

const WelcomeContainer = ({onPurchaseClick, onBalanceClick, language, currentStation}) => {
    const currentText = translations[language];
    const heading = language === 'hindi'
      ? `${currentText.stationNumber} ${currentStation.split(' ')[1]} ${currentText.heading}`
      : `${currentText.heading} ${currentStation}`;
      return(
        <div className='container'>
          <h1 className='home_Heading'>{heading}</h1>
            <div className='button-container'>
           <PurchaseButton onclick={onPurchaseClick} language={language}></PurchaseButton>
           <BalanceCheck onclick={onBalanceClick} language={language}></BalanceCheck>
          </div>
        </div>
      );
  };

const Home_Screen = () => {
    const [language, setLanguage] = useState("english");
    const { currentStation, updateStation } = useStation();
    const { startTicketFlow, startBalanceFlow, flowType } = useFlow();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!flowType) {
            startTicketFlow();
        }
    }, [flowType, startTicketFlow]);

    const handlePurchaseTicket = () => {
        startTicketFlow();
        navigate('/Station_Selection', {
            state: { language }
        });
    };

    const handleBalanceCheck = () => {
        startBalanceFlow();
        navigate('/Balance_Check', {
            state: { language }
        });
    };

    const handleStationChange = (stationName) => {
        updateStation(stationName);
    };

    return (
        <Background>
            <Navbar language={language} isHomeScreen={true} />
            <WelcomeContainer onPurchaseClick={handlePurchaseTicket} onBalanceClick={handleBalanceCheck} language={language} currentStation={currentStation}
            onStationChange={handleStationChange} />
            <Languagebutton language={language} setLanguage={setLanguage} />
        </Background>
    );
}


export default Home_Screen