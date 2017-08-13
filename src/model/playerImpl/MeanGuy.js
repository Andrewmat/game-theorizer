const Player = require('../Player');

class MeanGuy extends Player {
  static get ID() {
    return 'MeanGuy';
  }
  algorithm(history) {
    return false;
  }
}

module.exports = MeanGuy;