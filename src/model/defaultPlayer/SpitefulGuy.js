'use strict';
const Player = require('../Player');

class SpitefulGuy extends Player {
  static get ID() {
    return 'Spiteful';
  }
  algorithm(history) {
    if (history.isEmpty) {
      return true;
    }
    if (history.allRounds.map(r => r.plays(this).its).includes(false)) {
      return false;
    }
    return true;
  }
}

module.exports = SpitefulGuy;