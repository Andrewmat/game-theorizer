const Player = require('../Player');

class Monkey extends Player {
  static get ID() {
    return 'Monkey';
  }
  algorithm(history) {
    return Math.random() > 0.5;
  }
}

module.exports = Monkey;