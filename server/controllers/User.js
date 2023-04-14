const models = require('../models');

const { Account } = models;

const userPage = (req, res) => res.render('user');

module.exports = {
    userPage,
}