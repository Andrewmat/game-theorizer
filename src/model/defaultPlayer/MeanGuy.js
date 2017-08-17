'use strict';
const Player = require('../Player');

class MeanGuy extends Player {
  static get ID() {
    return 'MeanGuy';
  }
  algorithm() {
    return false;
  }
}

module.exports = MeanGuy;