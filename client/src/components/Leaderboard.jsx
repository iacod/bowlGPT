import React from 'react';

function Leaderboard(props) {
  const { users } = props;

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