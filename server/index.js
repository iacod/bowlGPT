const express = require('express');
const app = express();
http = require('http');
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
    },
});

let users = [];

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    users.push({
        id: socket.id,
        team: 'spectator',
        score: Math.random(),
        name: `User ${socket.id}`
    });

    console.log(users);
    io.sockets.emit("leaderboard-update", users);

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);

        users = users.filter((obj) => obj.id !== socket.id);
        console.log(users);

        io.sockets.emit("leaderboard-update", users);
    });
});

server.listen(8080, () => {console.log('Server is running on port 8080')});