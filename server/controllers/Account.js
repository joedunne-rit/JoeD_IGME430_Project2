const models = require('../models');

const { Account } = models;

// Returns login page
const loginPage = (req, res) => res.render('login');

// Logs out the user
const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

// Takes a username and password
// If username exists & password matches it, logs user in under that account
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/user' });
  });
};

// Takes a username and 2 password values
// Uses username and password values to create new account
// Immediately logs in new account
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const inventory = ['red.png', 'green.png'];
    const newAccount = new Account({ username, password: hash, inventory });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/user' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username is already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

// Takes in 2 password values
// Changes the password of the current user using new password
const changePassword = async (req, res) => {
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const doc = await Account.findOne({ username: req.session.account.username }).exec();
    doc.password = hash;
    await doc.save();
    return res.status(200).json({ message: 'Password changed' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error changing password' });
  }
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  changePassword,
};
