const gamePage = (req, res) => res.render('game');
// const models = require('../models');

// const { Account } = models;

// Planning to use socket.io

const playerList = [];

//All functions have callback functions that will cause io to update client displays
//Whenever playerList updates

//When a new client connects, adds them to the player list
//Includes an id & their appearance currently in use
const addPlayer = (id, image, callback) => {
  console.log('player added');
  playerList.push({
    id, image, x: 0, y: 0,
  });
  console.log(playerList);
  callback(playerList);
};

//Moves a client's character along the board
//Takes in id and direction, uses them to identify correct player character
//If player cannot move, ends funciton early w/out calling update callback
const movePlayer = (id, direction, callback) => {
  const player = playerList.find((tempPlayer) => tempPlayer.id === id);
  console.log(player);
  console.log(direction);
  switch (direction) {
    case 0: // up
      if (player.y === 3) {
        console.log('player cannot be moved');
        return;
      }
      player.y++;
      console.log('player moved');
      break;
    case 1: // left
      if (player.x === 0) {
        console.log('player cannot be moved');
        return;
      }
      player.x--;
      console.log('player moved');
      break;
    case 2: // right
      if (player.x === 3) {
        console.log('player cannot be moved');
        return;
      }
      player.x++;
      console.log('player moved');
      break;
    case 3: // down
      if (player.y === 0) {
        console.log('player cannot be moved');
        return;
      }
      player.y--;
      console.log('player moved');
      break;
    default: break;
  }

  callback(playerList);
};

//When player disconnects, removes them from playerlist
const removePlayer = (id, callback) => {
  console.log('player removed');
  playerList.splice(playerList.map(p => p.id).indexOf(id), 1);
  console.log(playerList)
  callback(playerList);
};

module.exports = {
  gamePage,
  addPlayer,
  movePlayer,
  removePlayer,
};
