import { useState, useEffect } from 'react'
import './App.css'
import Leaderboard from './components/Leaderboard'
import Buzzer from './components/Buzzer'
import io from 'socket.io-client';

function App() {
  return (
    <div className="App">
      <Leaderboard />
      <Buzzer />
    </div>
  );
}

export default App;
