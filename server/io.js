const http = require('http');
const {Server} = require('socket.io');
const game = require('./controllers/Game.js');

let io;

const setupSocket = (app) => {
    const server = http.createServer(app);
    io = new Server(server);

    //When an instance of a client connects, a 'socket' is made for them here
    //When made, you can assign event listeners for any emits the socket does
    io.on('connection', (socket) => {
        console.log('User connected');

        socket.on('add', (info) => {
            game.addPlayer(info.id, info.image);
        })

        socket.on('move', (info) => {
            game.movePlayer(info.id, info.direction);
        })

        socket.on('disconnect', () => {
            game.removePlayer();
            console.log('User disconnected');
        });
    });

    return server;
}

module.exports = setupSocket;