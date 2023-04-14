import React from 'react';
import { useState, useEffect } from 'react'
import './Buzzer.css'

function Buzzer() {
    const [isActive, setIsActive] = useState(true);

    const handleClick = () => {
      setIsActive(false);
    };
  
    const handleReset = () => {
      setIsActive(true);
    };
  
    return (
      <button
        onClick={handleClick}
        disabled={!isActive}
      >
        {isActive ? 'Buzz' : 'Inactive'}
        <br />
        <button onClick={handleReset}>Next</button>
      </button>
    );
}

export default Buzzer;