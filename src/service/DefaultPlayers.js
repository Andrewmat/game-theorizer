const GoodGuy = require('../model/defaultPlayer/GoodGuy');
const MeanGuy = require('../model/defaultPlayer/MeanGuy');
const ReasonableGuy = require('../model/defaultPlayer/ReasonableGuy');
const Monkey = require('../model/defaultPlayer/Monkey');

var defaultPlayers = {
  CautiousGuy,
  GoodGuy,
  MeanGuy,
  Monkey,
  ReasonableGuy
};

module.exports = defaultPlayers;