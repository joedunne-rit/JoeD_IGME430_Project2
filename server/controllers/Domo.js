const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => {
  return res.render('app');
};

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    special: req.body.special,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, special: newDomo.special});
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};

const getDomos = async (req, res) => {
  try {
    const query = {owner: req.session.account._id};
    const docs = await Domo.find(query).select('name age special').lean().exec();

    return res.json({domos: docs});
  } catch (err){
    console.log(err);
    return res.status(500).json({error: 'Error retrieving domos!'});
  }
};

const deleteDomo = async (req, res) => {
  try {
    await Domo.findByIdAndDelete(req.body.id);
    return res.status(200).json({message: 'Domo deleted'});
  } catch (err){
    console.log(err);
    return res.status(500).json({error: 'Error deleting domo!'});
  }
}

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  deleteDomo,
};
