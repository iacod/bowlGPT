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
      methods: ["GET", "POST"]
    },
});

let buzzed = null;
let users = [];
let questions = "For 10 points, name the inspirational youtuber that posts youtube skits with deep meanings.";
let answer = "Dhar Mann";

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    users.push({
        id: socket.id,
        score: 0,
        name: `User ${socket.id}`
    });

    console.log(users);
    io.emit("leaderboard-update", users);

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);

        users = users.filter((obj) => obj.id !== socket.id);
        console.log(users);

        io.sockets.emit("leaderboard-update", users);
    });

    socket.on('buzz', () => {
        buzzed = socket.id;
        console.log(buzzed);
        socket.broadcast.emit('lock-buzzer');
    });

    socket.on('answer', (answer) => {
        console.log(answer)
        console.log(socket.id)
        socket.broadcast.emit('unlock-buzzer')
    });
});

server.listen(8080, () => {console.log('Server is running on port 8080')});