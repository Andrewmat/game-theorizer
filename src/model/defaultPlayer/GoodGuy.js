'use strict';
const Player = require('../Player');

class GoodGuy extends Player {
  static get ID() {
    return 'GoodGuy';
  }
  algorithm() {
    return true;
  }
}

module.exports = GoodGuy;