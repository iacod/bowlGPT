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
let wordsArray = questions.split(" ")
let answer = "Dhar Mann";
let question_text = "";
let currentIndex = 0;
let flag = true;
let timeouts = [];

function printNextWord() {
    if (currentIndex < wordsArray.length) {
      const timeoutId = setTimeout(() => {
        question_text += wordsArray[currentIndex] + ' ';
        io.sockets.emit('updated-text', question_text);
        currentIndex++;
        printNextWord();
      }, 500);
      timeouts.push(timeoutId);
    } else {
        io.sockets.emit('unlock-next');
    }
}

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
        flag = false;
        socket.broadcast.emit('lock-buzzer');
        timeouts.forEach((id) => clearTimeout(id));
    });

    socket.on('answer', (answer) => {
        console.log(answer)
        console.log(socket.id)
        timeouts = [];
        printNextWord();
        socket.broadcast.emit('unlock-buzzer')
        console.log(flag);
    });

    socket.on('start-question', () => {
        io.sockets.emit('lock-next');
        question_text = '';
        flag = true;
        currentIndex = 0
        // for (let i = 0; i < wordsArray.length && flag; i++) {
        //     const timeoutId = setTimeout(() => {
        //         console.log(flag);
        //         question_text += wordsArray[i] += ' '
        //         io.sockets.emit('updated-text', question_text);
        //         if (i === wordsArray.length - 1) {
        //             io.sockets.emit('unlock-next');
        //         }
        //     }, i * 500);
        //     timeouts.push(timeoutId);
        // }
        printNextWord();
    }); 
});

server.listen(8080, () => {console.log('Server is running on port 8080')});