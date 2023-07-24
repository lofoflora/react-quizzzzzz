import React, { useState, useEffect } from 'react';
import hourglassGif from "../assets/warning-alert.gif";
import hourglassLast10SecGif from '../assets/emergency-animated.gif';

const Timer = ({ onTimeIsUp }) => {
  const [seconds, setSeconds] = useState(60);
  const [messageVisible, setMessageVisible] = useState(true);
  const [showLast10SecondsGif, setShowLast10SecondsGif] = useState(false);

  useEffect(() => {
    let interval;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 11) {
            setShowLast10SecondsGif(true);
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
      onTimeIsUp(); // Appeler la fonction onTimeIsUp lorsque le minuteur atteint 0
    }

    return () => clearInterval(interval);
  }, [seconds, onTimeIsUp]);

  useEffect(() => {
    if (seconds === 0) {
      setTimeout(() => setMessageVisible(false), 500);
    }
  }, [seconds]);

  return (
    <div className="timer-container">
      <div className={`hourglass ${showLast10SecondsGif ? 'last-10-seconds' : ''}`}>
        {/* Utilisez un élément visuel pour le GIF de sablier */}
        <img src={showLast10SecondsGif ? hourglassLast10SecGif : hourglassGif} alt="hourglass" />
      </div>
      <div className={`message ${messageVisible ? 'blink' : ''}`}>
        {seconds > 0 ? `Temps restant pour sauver le monde ${seconds} secondes` : 'Ton ordinateur va exploser !'}
      </div>
    </div>
  );
};

export default Timer;
