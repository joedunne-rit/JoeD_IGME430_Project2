const gamePage = (req, res) => res.render('game');

// Needs:
// gameboard data
// all users playing

// Planning to use socket.io
const gameBoard = [];

module.exports = {
  gamePage,
};
