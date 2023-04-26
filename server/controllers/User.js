const models = require('../models');

const { Account } = models;

const userPage = (req, res) => res.render('user');

const getInventory = async (req, res) => {
  try {
    const query = { username: req.session.account.username };
    const docs = await Account.find(query).select('inventory').exec();

    return res.json({ items: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving data from server' });
  }
};

const getEquipped = async (req, res) => {
  try {
    const query = {username: req.session.account.username };
    const docs = await Account.find(query).select('equipped').exec();

    return res.json({ item: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving data from server' });
  }
}

const purchase = async (req, res) => {
  try {
    const query = {username: req.session.account.username};
    const docs = await Account.find(query);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error purchasing new item'});
  }
}

const equip = async (req, res) => {
  let doc
  try {
    doc = await Account.findOne({ username: req.session.account.username}).exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error equipping item'});
  }

  if (!doc) {
    return res.json({error: 'Account data not found'});
  }

  console.log(doc);
  console.log(req.body);
  doc.equipped = req.body.itemName;

  try {
    await doc.save();
    return res.status(200)//.json({message: 'item equipped'});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error equipping item'});
  }
}

module.exports = {
  userPage,
  getInventory,
  getEquipped,
  purchase,
  equip,
};
