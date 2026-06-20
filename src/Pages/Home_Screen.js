import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import translations from '../Components/Translation';
import Navbar from '../Components/Navbar';
import Languagebutton from '../Components/Language-button';
import { useStation } from '../Context/StationContext';
import { useFlow } from '../Context/FlowContext';
import '../Styles/Home_Screen.css';


const PurchaseBotton = ({onclick, language}) => {
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
    const heading = `${currentText.welcome} ${currentStation}`;
      return(
        <div className='container'>
          <h1 className='home_Heading'>{heading}</h1>
            <div className='button-container'>
           <PurchaseBotton onclick={onPurchaseClick} language={language}></PurchaseBotton>
           <BalanceCheck onclick={onBalanceClick} language={language}></BalanceCheck>
          </div>
        </div>
      );
  };

const Home_Screen = () => {
    const [language, setLanguage] = useState("english");
    const { currentStation } = useStation();
    const { startTicketFlow, startBalanceFlow, flowType } = useFlow();
    const navigate = useNavigate();

    // Initialize flow on home screen so progress shows
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

    return (
        <>
            <Navbar language={language} />
            <WelcomeContainer onPurchaseClick={handlePurchaseTicket} onBalanceClick={handleBalanceCheck} language={language} currentStation={currentStation} />
            <Languagebutton language={language} setLanguage={setLanguage} />
            <img src="/train.png" className='train-image' alt="train" />
        </>
    );
}


export default Home_Screen