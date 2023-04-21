import React from 'react';
import { useState, useEffect, useRef } from 'react'
import './Buzzer.css'

function Buzzer(props) {
    const { socket } = props;
    const [isActive, setIsActive] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const inputRef = useRef('blank');

    const handleClick = () => {
      setIsActive(false);
      setShowPopup(true);
      setTimeLeft(5);
      socket.emit('buzz')
    };

    useEffect(() => {
      let intervalId;
  
      if (showPopup) {
        intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);
      }
  
      if (timeLeft === 0) {
        if (inputRef.current) {
          console.log(inputRef.current.value);
          socket.emit('answer', inputRef.current.value);
        }
        setShowPopup(false);
        setIsActive(true);
      }
  
      return () => clearInterval(intervalId);
    }, [showPopup, timeLeft]);

    useEffect(() => {
      socket.on('lock-buzzer', () => {
        setIsActive(false);
        console.log('locked')
      });
  
      return () => {
        socket.off('lock-buzzer');
      };
    }, [socket]);

    useEffect(() => {
      socket.on('unlock-buzzer', () => {
        setIsActive(true);
        console.log('unlocked')
      });
  
      return () => {
        socket.off('unlock-buzzer');
      };
    }, [socket]);
  
    return (
      <div className="Buzzer">
        <button onClick={handleClick} disabled={!isActive}>
          {isActive ? 'Buzz' : 'Inactive'}
          <br />
        </button>
        {showPopup && (
          <div className="popup">
            <h1>Answer</h1>
            <input type="text" ref={inputRef} />
            <p>Time left: {timeLeft} seconds</p>
          </div>
        )}
      </div>
    );
}

export default Buzzer;