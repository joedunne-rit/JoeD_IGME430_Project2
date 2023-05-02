const http = require('http');
const { Server } = require('socket.io');
const game = require('./controllers/Game.js');

let io;

const setupSocket = (app) => {
  const server = http.createServer(app);
  io = new Server(server);

  const update = (playerList) => {
    io.emit('update', playerList);
  };

  // When an instance of a client connects, a 'socket' is made for them here
  // When made, you can assign event listeners for any emits the socket does
  io.on('connection', (socket) => {
    console.log('User connected');
    let playerID;
    // When client is added, gets id/info and sends it to game.js
    socket.on('add', (info) => {
      game.addPlayer(info.id, info.image, update);
      playerID = info.id;
    });

    // When client moves, gets id/direction and sends to game.js
    socket.on('move', (info) => {
      game.movePlayer(info.id, info.direction, update);
    });

    // When client disconnects, gets id to remove and sends to game.js for removal
    socket.on('disconnect', () => {
      game.removePlayer(playerID, update);
      console.log('User disconnected');
    });
  });

  return server;
};

module.exports = setupSocket;
