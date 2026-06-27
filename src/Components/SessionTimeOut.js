import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFlow } from "../Context/FlowContext";
import translations from "./Translation";
import "../Styles/SessionTimeout.css";

const SessionTimeOut = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetFlow } = useFlow();

  const language = location.state?.language || "english";
  const text = translations[language];

  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownTime, setCountdownTime] = useState(60);

  const inactivityTimer = useRef(null);
  const countdownTimer = useRef(null);

 
  const INACTIVITY_TIME = 2 * 60 * 1000;

  const resetSessionTimeout = useCallback(() => {
    const EXCLUDED_PAGES = ["/", "/Processing_Payment"];

    if (EXCLUDED_PAGES.includes(location.pathname)) {
      return;
    }

    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);

    setShowCountdown(false);
    setCountdownTime(60);

    inactivityTimer.current = setTimeout(() => {
      setShowCountdown(true);
      setCountdownTime(60);

      countdownTimer.current = setInterval(() => {
        setCountdownTime((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer.current);
            setShowCountdown(false);
            resetFlow();
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, INACTIVITY_TIME);
  }, [navigate, location.pathname, INACTIVITY_TIME, resetFlow]);

  useEffect(() => {
    resetSessionTimeout();

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (countdownTimer.current) clearInterval(countdownTimer.current);
    };
  }, [location.pathname, resetSessionTimeout]);

 
  useEffect(() => {
    const handleUserActivity = () => {
      resetSessionTimeout();
    };

    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [resetSessionTimeout]);

  const handleModalClick = () => {
    
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    setShowCountdown(false);
    resetSessionTimeout();
  };
  return (
    <>
      {children}
      {showCountdown && (
        <div className="session-timeout-overlay" onClick={handleModalClick}>
          <div className="session-timeout-modal countdown-modal" onClick={handleModalClick}>
            <div className="session-timeout-icon">⏱️</div>
            <h2 className="session-timeout-title">{text.sessionExpiring}</h2>
            <p className="session-timeout-message">
              {text.redirectingIn} <span className="countdown-number">{countdownTime}</span> {text.seconds}
            </p>
            <p className="session-timeout-hint">{text.clickToContinue}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionTimeOut;
