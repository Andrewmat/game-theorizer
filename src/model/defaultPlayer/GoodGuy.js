const Player = require('../Player');

class GoodGuy extends Player {
  static get ID() {
    return 'GoodGuy';
  }
  algorithm(history) {
    return true;
  }
}

module.exports = GoodGuy;