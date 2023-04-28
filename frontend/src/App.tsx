import Buzzer from './Buzzer'
import Leaderboard from './Leaderboard'
import Reader from './Reader'
import io from "socket.io-client";

const socket = io('http://localhost:8080');

function App() {
  return (
    <div className="App">
      <Reader socket={socket}/>
      <Buzzer socket={socket} />
      <Leaderboard socket={socket} />
    </div>
  )
}

export default App
