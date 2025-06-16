import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import "../styles/Timer.css";

function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(3);
  const [isBreak, setIsBreak] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current);
              
              if (isBreak) {
                setMinutes(25);
                setIsBreak(false);
              } else {
                setMinutes(5);
                setIsBreak(true);
              }
              
              setSeconds(0);
              return 0;
            } else {
              setMinutes(minutes - 1);
              return 59;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, minutes, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="promodoro">
      <div className="message">
        {isBreak && <div>Break time! New Session starts in:</div>}
      </div>
      <div className="timer">{timerMinutes}:{timerSeconds}</div>
      <div className="timer-controls">
        <button className="timer-button" onClick={toggleTimer}>
          {isRunning ? <FontAwesomeIcon icon={faStop} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>
        {!isBreak && (
          <button className="timer-button" onClick={resetTimer}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Timer;