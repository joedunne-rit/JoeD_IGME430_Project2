const gamePage = (req, res) => res.render('game');

const playerList = [];

// All functions have callback functions that will cause io to update client displays
// Whenever playerList updates

// When a new client connects, adds them to the player list
// Includes an id & their appearance currently in use
const addPlayer = (id, image, callback) => {
  playerList.push({
    id, image, x: 0, y: 0,
  });
  callback(playerList);
};

// Moves a client's character along the board
// Takes in id and direction, uses them to identify correct player character
// If player cannot move, ends funciton early w/out calling update callback
const movePlayer = (id, direction, callback) => {
  const player = playerList.find((tempPlayer) => tempPlayer.id === id);
  switch (direction) {
    case 0: // up
      if (player.y === 0) {
        return;
      }
      player.y--;
      break;
    case 1: // left
      if (player.x === 0) {
        return;
      }
      player.x--;
      break;
    case 2: // right
      if (player.x === 3) {
        return;
      }
      player.x++;
      break;
    case 3: // down
      if (player.y === 3) {
        return;
      }
      player.y++;
      break;
    default: break;
  }

  callback(playerList);
};

// When player disconnects, removes them from playerlist
const removePlayer = (id, callback) => {
  playerList.splice(playerList.map((p) => p.id).indexOf(id), 1);
  callback(playerList);
};

module.exports = {
  gamePage,
  addPlayer,
  movePlayer,
  removePlayer,
};
