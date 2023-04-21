import { useState, useEffect } from 'react'
import './App.css'
import Leaderboard from './components/Leaderboard'
import Buzzer from './components/Buzzer'
import io from 'socket.io-client';

const socket = io('http://localhost:8080')

function App() {
  return (
    <div className="App">
      <Leaderboard socket={socket} />
      <Buzzer socket={socket}/>
    </div>
  );
}

export default App;
