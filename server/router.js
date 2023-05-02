const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // GET/POST requests for login/signup page
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  // GET requests for app pages
  app.get('/user', mid.requiresLogin, controllers.User.userPage);

  app.get('/game', mid.requiresLogin, controllers.Game.gamePage);

  // GET/POST requests for user page, mainly for accessing user data
  app.get('/getInventory', mid.requiresLogin, controllers.User.getInventory);
  app.get('/getEquipped', mid.requiresLogin, controllers.User.getEquipped);
  app.post('/purchase', mid.requiresLogin, controllers.User.purchase);
  app.post('/addCurrency', mid.requiresLogin, controllers.User.addCurrency);
  app.get('/getCurrency', mid.requiresLogin, controllers.User.getCurrency);
  app.post('/equip', mid.requiresLogin, controllers.User.equip);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);

  // GET request for retrieving session information
  app.get('/getID', mid.requiresLogin, controllers.User.getData);

  // app.post('/movePlayer', mid.requiresLogin, controllers.Game.movePlayer);
  // app.post('/removePlayer', mid.requiresLogin, controller.Game.removePlayer);
  // app.post('/addPlayer', mid.requiresLogin, controller.Game.addPlayer);

  // GET request for logging user out
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // default GET requests, returns login page
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
