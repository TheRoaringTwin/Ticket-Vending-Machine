import React from 'react'
import '../Styles/Home_Screen.css';

const Languagebutton = ({ language, setLanguage }) => {
  return (
   <div className="language-btn">
      <button
        onClick={() => setLanguage("english")}
        className={language === "english" ? "active" : ""}
      >
        English
      </button>
      <button
        onClick={() => setLanguage("hindi")}
        className={language === "hindi" ? "active" : ""}
      >
        हिंदी
      </button>
   </div>
  );
};

export default Languagebutton

