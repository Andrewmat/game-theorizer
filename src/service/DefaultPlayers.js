const CautiousGuy = require('../model/playerImpl/CautiousGuy');
const GoodGuy = require('../model/playerImpl/GoodGuy');
const MeanGuy = require('../model/playerImpl/MeanGuy');
const Monkey = require('../model/playerImpl/Monkey');
const ReasonableGuy = require('../model/playerImpl/ReasonableGuy');

var defaultPlayers = {
  CautiousGuy,
  GoodGuy,
  MeanGuy,
  Monkey,
  ReasonableGuy
};

module.exports = defaultPlayers;