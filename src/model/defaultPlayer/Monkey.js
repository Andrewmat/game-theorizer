'use strict';
const Player = require('../Player');

class Monkey extends Player {
  static get ID() {
    return 'Monkey';
  }
  algorithm() {
    return Math.random() > 0.5;
  }
}

module.exports = Monkey;