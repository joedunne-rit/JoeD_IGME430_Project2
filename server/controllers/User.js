const models = require('../models');

const { Account } = models;

const userPage = (req, res) => res.render('user');

const getInventory = async (req, res) => {
  try {
    const query = { owner: req.session.account.username }
    const docs = await Account.find(query).select('inventory').exec();
    //Why is this not returning proper data?
    console.log(docs);

    return res.json({ items: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving data from server' });
  }
};

module.exports = {
  userPage,
  getInventory,
};
