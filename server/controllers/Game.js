const gamePage = (req, res) => res.render('game');
const models = require('../models')

const {Account} = models;

// Needs:
// gameboard data
// all users playing

// Planning to use socket.io
/*const gameBoard = [
  [0,1,0,1],
  [1,0,1,0],
  [0,1,0,1],
  [1,0,1,0]
];*/

let playerList = [];


const addPlayer = (id, image, callback) => {
  console.log('player added');
  playerList.push({id, image, x: 0, y: 0});
  callback(playerList);
}

const movePlayer = (id, direction, callback) => {
  const player = playerList.find(player => player.id === id);
  console.log(player);
  console.log(direction);
  switch (direction) {
    case 0: //up
      if (player.y === 3) {
        console.log('player cannot be moved');
        return;
      }
      player.y++;
      console.log('player moved');
      break;
    case 1: //left
    if (player.x === 0) {
        console.log('player cannot be moved');
        return;
      }
      player.x--;
      console.log('player moved');
      break;
    case 2: //right
      if (player.x === 3) {
        console.log('player cannot be moved');
        return;
      }
      player.x++;
      console.log('player moved'); 
      break;
    case 3: //down
      if (player.y === 0) {
        console.log('player cannot be moved');
        return;
      }
      player.y--;
      console.log('player moved'); 
      break;
  }

  callback(playerList);
}

const removePlayer = (id, callback) => {
  console.log('player removed');
  //remove id from playerList
  
  callback(playerList);
} 

module.exports = {
  gamePage,
  addPlayer,
  movePlayer,
  removePlayer,
};
