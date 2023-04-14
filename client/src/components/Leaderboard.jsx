import React from 'react';
import { useState, useEffect } from 'react'
import './Leaderboard.css'
import io from 'socket.io-client';

function Leaderboard() {
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

  users.sort((a, b) => b.score - a.score);

  return (
    <div className="Leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {users.map(user => (
          <li key={user.name}>
            {user.name} - {user.score}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;