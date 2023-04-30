const gamePage = (req, res) => res.render('game');

// Needs:
// gameboard data
// all users playing

// Planning to use socket.io
// const gameBoard = [];

/* const addPlayer = () => {

}

const movePlayer = () => {

}

const removePlayer = () => {

} */

module.exports = {
  gamePage,
};
