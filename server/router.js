const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/user', mid.requiresLogin, controllers.User.userPage);

  app.get('/game', mid.requiresLogin, controllers.Game.gamePage);

  app.get('/getInventory', mid.requiresLogin, controllers.User.getInventory);
  app.get('/getEquipped', mid.requiresLogin, controllers.User.getEquipped);
  app.post('/purchase', mid.requiresLogin, controllers.User.purchase);
  app.post('/equip', mid.requiresLogin, controllers.User.equip)

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
