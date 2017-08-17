'use strict';
const GoodGuy = require('../model/defaultPlayer/GoodGuy');
const MeanGuy = require('../model/defaultPlayer/MeanGuy');
const ReasonableGuy = require('../model/defaultPlayer/ReasonableGuy');
const SpitefulGuy = require('../model/defaultPlayer/SpitefulGuy');
const Cientist = require('../model/defaultPlayer/Cientist');
const Monkey = require('../model/defaultPlayer/Monkey');

const defaultPlayers = {
  GoodGuy,
  MeanGuy,
  ReasonableGuy,
  SpitefulGuy,
  Cientist,
  Monkey
};

module.exports = defaultPlayers;