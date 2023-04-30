const models = require('../models');

const { Account } = models;

const userPage = (req, res) => res.render('user');

// Gets Account's inventory array and returns it
// Main use is for displaying inventory on user page
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

// Gets Account's currently equipped item and returns it
// Main use is to get correct image file for character displays
const getEquipped = async (req, res) => {
  try {
    const query = { username: req.session.account.username };
    const docs = await Account.find(query).select('equipped').exec();

    return res.status(200).json({ item: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving data from server' });
  }
};

// Takes in an item file name and a price
// Then uses that info to process a transaction for the account for said item
const purchase = async (req, res) => {
  let doc;
  try {
    doc = await Account.findOne({ username: req.session.account.username }).exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error purchasing new item' });
  }

  if (!doc) {
    return res.status(400).json({ error: 'Account data not found' });
  }

  // If account already owns item, cancels purchase
  if (doc.inventory.includes(req.body.itemName)) {
    console.log('purchase denied, item already owned');
    return res.status(200).json({ message: 'Item already owned!' });
  }

  // If account does not have enough money, cancels purchase
  if (doc.currency < req.body.price) {
    console.log('purchase denied');
    return res.status(200).json({ message: 'Not enough currency!' });
  }

  // Deducts necessary amount, then adds item to inventory
  doc.currency -= req.body.price;
  doc.inventory.push(req.body.itemName);

  try {
    await doc.save();
    return res.status(200).json({ message: 'item purchased' });
  } catch (err) {
    return res.status(500).json({ error: 'Error purchasing new item' });
  }
};

// Adds an amount of currency to account
const addCurrency = async (req, res) => {
  let doc;
  try {
    doc = await Account.findOne({ username: req.session.account.username }).exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding currency' });
  }

  if (!doc) {
    return res.status(400).json({ error: 'Account data not found' });
  }

  doc.currency += req.body.money;

  try {
    await doc.save();
    return res.status(200).json({ message: 'Currency added' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding currency' });
  }
};

// Gets Account info and changes what is currently equipped
const equip = async (req, res) => {
  let doc;
  try {
    doc = await Account.findOne({ username: req.session.account.username }).exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error equipping item' });
  }

  if (!doc) {
    return res.status(400).json({ error: 'Account data not found' });
  }

  doc.equipped = req.body.itemName;

  try {
    await doc.save();
    return res.status(200).json({ message: 'item equipped' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error equipping item' });
  }
};

module.exports = {
  userPage,
  getInventory,
  getEquipped,
  purchase,
  addCurrency,
  equip,
};
