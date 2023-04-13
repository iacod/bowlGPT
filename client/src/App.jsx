import { useState, useEffect } from 'react'
import './App.css'
import Leaderboard from './components/Leaderboard'
import io from 'socket.io-client';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:8080');

    socket.on('leaderboard-update', (data) => {
      setUsers(data);
      console.log(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Leaderboard users={users} />
    </div>
  );
}

export default App;
