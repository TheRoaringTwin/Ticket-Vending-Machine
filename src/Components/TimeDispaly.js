import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();

      if (minutes < 10) minutes = '0' + minutes;

      const timeString = hours + ':' + minutes;
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="time">{time}</div>;
};

export default TimeDisplay;
